/**
 * Список ПВЗ СДЭК по городу.
 * Использует учётные данные из env (документация: https://apidoc.cdek.ru/).
 * OAuth: client_id = CDEK_ACCOUNT, client_secret = CDEK_SECURE_PASSWORD.
 */

import { NextRequest, NextResponse } from "next/server";

const CDEK_API = "https://api.cdek.ru/v2";

function getCdekCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = (process.env.CDEK_ACCOUNT ?? process.env.CDEK_CLIENT_ID)?.trim();
  const clientSecret = (process.env.CDEK_SECURE_PASSWORD ?? process.env.CDEK_CLIENT_SECRET)?.trim();
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

async function getCdekToken(): Promise<string> {
  const creds = getCdekCredentials();
  if (!creds) throw new Error("CDEK_ACCOUNT and CDEK_SECURE_PASSWORD must be set");
  const { clientId, clientSecret } = creds;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(`${CDEK_API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CDEK token failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("CDEK token missing access_token");
  return data.access_token;
}

async function getCityCode(token: string, cityName: string): Promise<number | null> {
  const url = new URL(`${CDEK_API}/location/cities`);
  url.searchParams.set("city", cityName.trim());
  url.searchParams.set("country_codes", "RU");
  url.searchParams.set("size", "5");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { code?: number }[] | { items?: { code?: number }[] };
  const items = Array.isArray(data) ? data : (data as { items?: { code?: number }[] }).items ?? [];
  const first = items[0] as { code?: number } | undefined;
  return first?.code != null ? first.code : null;
}

async function getDeliveryPoints(token: string, cityCode: number): Promise<unknown[]> {
  const url = new URL(`${CDEK_API}/deliverypoints`);
  url.searchParams.set("city_code", String(cityCode));
  url.searchParams.set("size", "100");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CDEK deliverypoints failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as unknown[] | { items?: unknown[] };
  return Array.isArray(data) ? data : (data as { items?: unknown[] }).items ?? [];
}

function mapCdekPointToPvz(raw: any): {
  code: string;
  name: string;
  address: string;
  location: { lat: number; lon: number };
  work_time: string;
  address_comment?: string;
} | null {
  if (!raw || typeof raw !== "object") return null;

  const lat = raw.latitude ?? raw.location?.latitude ?? raw.lat;
  const lon = raw.longitude ?? raw.location?.longitude ?? raw.lon ?? raw.lng;
  if (typeof lat !== "number" || typeof lon !== "number") return null;

  const address =
    raw.address_full ??
    raw.address ??
    [raw.location?.city, raw.location?.address].filter(Boolean).join(", ") ??
    "";

  return {
    code: String(raw.code ?? raw.code_s ?? raw.sale_point_code ?? ""),
    name: String(raw.name ?? raw.title ?? ""),
    address: String(address).trim() || String(raw.name ?? ""),
    location: { lat, lon },
    work_time: String(raw.work_time ?? raw.work_time_list ?? ""),
    address_comment: raw.address_comment ?? raw.comment,
  };
}

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");
  if (!city || !city.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'city' is required" },
      { status: 400 }
    );
  }

  if (!getCdekCredentials()) {
    return NextResponse.json(
      { error: "CDEK_NOT_CONFIGURED", items: [] },
      { status: 503 }
    );
  }

  try {
    const token = await getCdekToken();
    const cityCode = await getCityCode(token, city);
    if (cityCode == null) {
      return NextResponse.json([], { status: 200 });
    }

    const points = await getDeliveryPoints(token, cityCode);
    const list = points.map(mapCdekPointToPvz).filter(Boolean);

    return NextResponse.json(list);
  } catch (e) {
    const message = e instanceof Error ? e.message : "CDEK PVZ error";
    console.error("[api/cdek/pvz]", message, e);
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
