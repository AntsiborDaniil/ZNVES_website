/**
 * Список ПВЗ СДЭК по городу.
 * Использует учётные данные из env (документация: https://apidoc.cdek.ru/).
 * OAuth: client_id = CDEK_ACCOUNT, client_secret = CDEK_SECURE_PASSWORD.
 */

import { NextRequest, NextResponse } from "next/server";
import { asRecord, parseLatLonFromUnknown, readString } from "../../../../lib/recordUtils";

const CDEK_API = "https://api.cdek.ru/v2";

function withTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

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

  const { signal: tokenSignal, clear: tokenClear } = withTimeout(8000);
  const res = await fetch(`${CDEK_API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: tokenSignal,
    next: { revalidate: 0 },
  });
  tokenClear();

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

  const { signal: citySignal, clear: cityClear } = withTimeout(8000);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    signal: citySignal,
    next: { revalidate: 0 },
  });
  cityClear();

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

  const { signal: dpSignal, clear: dpClear } = withTimeout(10000);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    signal: dpSignal,
    next: { revalidate: 0 },
  });
  dpClear();

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CDEK deliverypoints failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as unknown[] | { items?: unknown[] };
  return Array.isArray(data) ? data : (data as { items?: unknown[] }).items ?? [];
}

function mapCdekPointToPvz(raw: unknown): {
  code: string;
  name: string;
  address: string;
  location: { lat: number; lon: number };
  work_time: string;
  address_comment?: string;
} | null {
  const record = asRecord(raw);
  if (!record) return null;

  const locationRecord = asRecord(record.location);
  const coords =
    parseLatLonFromUnknown(record.location) ??
    parseLatLonFromUnknown({
      lat: record.latitude ?? record.lat,
      lon: record.longitude ?? record.lon ?? record.lng,
    });
  if (!coords) return null;

  const address =
    readString(record, "address_full", "address") ??
    [readString(locationRecord ?? {}, "city"), readString(locationRecord ?? {}, "address")]
      .filter(Boolean)
      .join(", ") ??
    "";

  return {
    code: String(readString(record, "code", "code_s", "sale_point_code") ?? ""),
    name: String(readString(record, "name", "title") ?? ""),
    address: String(address).trim() || String(readString(record, "name") ?? ""),
    location: coords,
    work_time: String(readString(record, "work_time", "work_time_list") ?? ""),
    address_comment: readString(record, "address_comment", "comment"),
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
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
