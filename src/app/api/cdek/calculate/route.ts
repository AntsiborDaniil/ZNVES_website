/**
 * Расчёт стоимости и срока доставки СДЭК до города.
 * GET /api/cdek/calculate?city=Москва&weight_grams=2000
 * Ответ: { price: number, days_min: number, days_max: number, from_api?: boolean }
 * При ошибке или ненайденном городе возвращаем from_api: false, чтобы не показывать «2–4 дня».
 * Документация: https://apidoc.cdek.ru/
 */

import { NextRequest, NextResponse } from "next/server";
import { CDEK_API, getCachedCdekToken, getCdekCredentials } from "../../../../lib/cdekAuth";
import { logUpstreamError, logUpstreamHttpError } from "../../../../lib/upstreamLog";

function withTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

type CityItem = { code?: number };
function parseCityItems(data: unknown): CityItem[] {
  if (Array.isArray(data)) return data as CityItem[];
  const o = data as Record<string, unknown>;
  if (Array.isArray(o.items)) return o.items as CityItem[];
  const emb = o._embedded as Record<string, unknown> | undefined;
  if (emb && Array.isArray(emb.locations)) return emb.locations as CityItem[];
  return [];
}

async function getCityCode(token: string, cityName: string): Promise<number | null> {
  const url = new URL(`${CDEK_API}/location/cities`);
  url.searchParams.set("city", cityName.trim());
  url.searchParams.set("country_codes", "RU");
  url.searchParams.set("size", "5");
  const { signal: citySignal, clear: cityClear } = withTimeout(8000);
  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      signal: citySignal,
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      const text = await res.text();
      logUpstreamHttpError("cdek/calculate/cities", res.status, text, { city: cityName });
      return null;
    }
    const data = (await res.json()) as unknown;
    const items = parseCityItems(data);
    const first = items[0];
    return first?.code != null ? first.code : null;
  } catch (err) {
    logUpstreamError("cdek/calculate/cities", err, { city: cityName });
    return null;
  } finally {
    cityClear();
  }
}

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");
  const weightGrams = Math.max(100, Math.min(30000, Number(request.nextUrl.searchParams.get("weight_grams")) || 1000));

  if (!city?.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'city' is required" },
      { status: 400 }
    );
  }

  const creds = getCdekCredentials();
  if (!creds) {
    return NextResponse.json(
      { price: 0, days_min: 2, days_max: 4, from_api: false, reason: "CDEK_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  try {
    const token = await getCachedCdekToken();
    const fromCode = await getCityCode(token, "Москва");
    const toCode = await getCityCode(token, city);
    if (fromCode == null || toCode == null) {
      const reason = fromCode == null ? "город «Москва» не найден" : `город «${city}» не найден в СДЭК`;
      return NextResponse.json(
        { price: 0, days_min: 2, days_max: 4, from_api: false, reason },
        { status: 200 }
      );
    }

    // По документации СДЭК: date — yyyy-MM-dd'T'HH:mm:ssZ, location — code (не city_code), country_code
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateStr = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}T${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}+0000`;

    const body = {
      date: dateStr,
      type: 1,
      currency: 1,
      lang: "rus",
      from_location: { code: fromCode, country_code: "RU" },
      to_location: { code: toCode, country_code: "RU" },
      packages: [
        {
          weight: weightGrams,
          length: 30,
          width: 20,
          height: 10,
        },
      ],
    };

    const { signal: calcSignal, clear: calcClear } = withTimeout(10000);
    let calcRes: Response;
    try {
      calcRes = await fetch(`${CDEK_API}/calculator/tarifflist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: calcSignal,
        next: { revalidate: 0 },
      });
    } finally {
      calcClear();
    }

    if (!calcRes.ok) {
      const text = await calcRes.text();
      logUpstreamHttpError("cdek/calculate/tarifflist", calcRes.status, text, { city, weightGrams });
      let reason = `СДЭК API: ${calcRes.status}`;
      try {
        const errBody = JSON.parse(text) as { errors?: Array<{ message?: string }> };
        const msg = errBody.errors?.[0]?.message;
        if (msg) reason += ` — ${msg}`;
      } catch {
        if (text) reason += ` — ${text.slice(0, 200)}`;
      }
      return NextResponse.json(
        { price: 0, days_min: 2, days_max: 4, from_api: false, reason },
        { status: 200 }
      );
    }

    const calcData = (await calcRes.json()) as Record<string, unknown> & {
      tarifflist?: Array<{
        tariff_code?: number | string;
        tariff_name?: string;
        tariff_description?: string;
        delivery_sum?: number;
        period_min?: number;
        period_max?: number;
      }>;
      tariff_codes?: Array<{
        tariff_code?: number | string;
        tariff_name?: string;
        tariff_description?: string;
        delivery_sum?: number;
        period_min?: number;
        period_max?: number;
      }>;
    };

    const list =
      (calcData.tarifflist ?? calcData.tariff_codes ?? []) as Array<{
        tariff_code?: number | string;
        tariff_name?: string;
        tariff_description?: string;
        delivery_sum?: number;
        period_min?: number;
        period_max?: number;
      }>;

    if (!list.length) {
      return NextResponse.json(
        { price: 0, days_min: 2, days_max: 4, from_api: false, reason: "СДЭК не вернул тарифы", tariffs: [] },
        { status: 200 }
      );
    }

    // Выбираем самый дешевый тариф в качестве выбранного по умолчанию
    const best = list.reduce((min, t) => {
      if (min == null) return t;
      const cur = typeof t.delivery_sum === "number" ? t.delivery_sum : Number.POSITIVE_INFINITY;
      const prev = typeof min.delivery_sum === "number" ? min.delivery_sum : Number.POSITIVE_INFINITY;
      return cur < prev ? t : min;
    }, list[0] as {
      tariff_code?: number | string;
      tariff_name?: string;
      tariff_description?: string;
      delivery_sum?: number;
      period_min?: number;
      period_max?: number;
    });

    const tariffs = list.map((t) => ({
      code: t.tariff_code ?? null,
      name: t.tariff_name ?? "",
      description: t.tariff_description ?? "",
      price: t.delivery_sum ?? 0,
      days_min: t.period_min ?? null,
      days_max: t.period_max ?? null,
    }));

    return NextResponse.json({
      price: best.delivery_sum ?? 0,
      days_min: best.period_min ?? 1,
      days_max: best.period_max ?? 2,
      from_api: true,
      tariffs,
      selected_tariff_code: best.tariff_code ?? null,
    });
  } catch (e) {
    logUpstreamError("cdek/calculate", e, { city, weightGrams });
    const message = e instanceof Error ? e.message : "CDEK calculate error";
    return NextResponse.json(
      { price: 0, days_min: 2, days_max: 4, from_api: false, reason: message },
      { status: 200 }
    );
  }
}
