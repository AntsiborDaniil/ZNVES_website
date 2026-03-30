/**
 * Расчёт стоимости курьерской доставки Яндекс.Доставка (B2B API).
 * Документация: https://yandex.com/support/delivery-profile/en/api/express/openapi/IntegrationV2OfferCalculate
 *
 * GET /api/yandex/courier/calculate
 *   ?dest_address=...   — адрес получателя (строка)
 *   &dest_lat=...       — широта точки назначения (опционально, если известна)
 *   &dest_lon=...       — долгота точки назначения (опционально, если известна)
 *   &weight_grams=...   — вес посылки в граммах (опционально, по умолчанию 1000)
 */

import { NextRequest, NextResponse } from "next/server";

const YA_B2B_CALCULATE_URL =
  "https://b2b.taxi.yandex.net/b2b/cargo/integration/v2/offers/calculate";

const DEFAULT_SOURCE_ADDRESS = "Москва, Промышленная улица, 12А, 115516";

/**
 * Координаты адреса по умолчанию (Москва, Промышленная, 12А).
 * Используются как финальный fallback, если геокодер недоступен.
 * [lon, lat] — формат Яндекс B2B API.
 */
const DEFAULT_SOURCE_COORDS: [number, number] = [37.617, 55.653];

/** Кэш координат исходного адреса — вычисляется один раз на время жизни serverless-инстанса */
let cachedSourceCoords: [number, number] | null = null;
let cachedSourceAddress = "";

/** Геокодирование через Яндекс Geocoder API (если есть ключ) */
async function geocodeYandex(address: string): Promise<[number, number] | null> {
  const apiKey =
    process.env.YANDEX_SUGGEST_API_KEY ||
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ||
    "";
  if (!apiKey) return null;

  try {
    const url = new URL("https://geocode-maps.yandex.ru/v1/");
    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("geocode", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("lang", "ru_RU");
    url.searchParams.set("results", "1");

    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      response?: {
        GeoObjectCollection?: {
          featureMember?: Array<{ GeoObject?: { Point?: { pos?: string } } }>;
        };
      };
    };

    const pos = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos;
    if (!pos) return null;

    const parts = pos.trim().split(/\s+/);
    // Яндекс возвращает "lon lat" в pos
    const lon = parseFloat(parts[0]);
    const lat = parseFloat(parts[1] ?? parts[0]);
    if (isNaN(lon) || isNaN(lat)) return null;

    return [lon, lat]; // Яндекс B2B ожидает [lon, lat]
  } catch (err) {
    return null;
  }
}

/** Геокодирование через Nominatim (OpenStreetMap) — запасной вариант */
async function geocodeNominatim(address: string): Promise<[number, number] | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "0");

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "ZNVES-Delivery/1.0 (znves.ru)" },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return null;

    const list = (await res.json()) as Array<{ lat?: string; lon?: string }>;
    if (!list?.[0]?.lat || !list?.[0]?.lon) return null;

    const lon = parseFloat(list[0].lon);
    const lat = parseFloat(list[0].lat);
    if (isNaN(lon) || isNaN(lat)) return null;

    return [lon, lat];
  } catch (err) {
    return null;
  }
}

async function geocode(address: string): Promise<[number, number] | null> {
  // Сначала Яндекс (точнее для кириллических адресов), затем Nominatim
  return (await geocodeYandex(address)) ?? (await geocodeNominatim(address));
}

async function getSourceCoords(sourceAddress: string): Promise<[number, number]> {
  // 1. Явно заданные координаты склада в env — самый надёжный вариант
  const envLat = parseFloat(process.env.YA_DELIVERY_SOURCE_LAT ?? "");
  const envLon = parseFloat(process.env.YA_DELIVERY_SOURCE_LON ?? "");
  if (!isNaN(envLat) && !isNaN(envLon)) {
    return [envLon, envLat]; // [lon, lat]
  }

  // 2. Кэш в памяти
  if (cachedSourceCoords && cachedSourceAddress === sourceAddress) {
    return cachedSourceCoords;
  }

  // 3. Геокодируем адрес
  const coords = await geocode(sourceAddress);
  if (coords) {
    cachedSourceCoords = coords;
    cachedSourceAddress = sourceAddress;
    return coords;
  }

  // 4. Hardcode-координаты для адреса по умолчанию — не ломаем расчёт при недоступном геокодере
  cachedSourceCoords = DEFAULT_SOURCE_COORDS;
  cachedSourceAddress = sourceAddress;
  return DEFAULT_SOURCE_COORDS;
}

export async function GET(request: NextRequest) {
  const token = process.env.YA_DELIVERY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "YA_DELIVERY_TOKEN not configured", from_api: false },
      { status: 503 }
    );
  }

  const sp = request.nextUrl.searchParams;
  const destAddress = sp.get("dest_address")?.trim() ?? "";
  const destLatStr = sp.get("dest_lat");
  const destLonStr = sp.get("dest_lon");
  const weightGrams = Math.max(100, parseInt(sp.get("weight_grams") ?? "1000") || 1000);

  if (!destAddress) {
    return NextResponse.json(
      { error: "dest_address is required" },
      { status: 400 }
    );
  }

  const sourceAddress = (
    process.env.YA_DELIVERY_SOURCE_ADDRESS ??
    process.env.NEXT_PUBLIC_YA_DELIVERY_SOURCE_ADDRESS ??
    DEFAULT_SOURCE_ADDRESS
  ).trim();

  // Координаты источника (всегда возвращает значение — с fallback к hardcode)
  const sourceCoords = await getSourceCoords(sourceAddress);

  // Координаты назначения
  let destCoords: [number, number] | null = null;
  if (destLatStr && destLonStr) {
    const lat = parseFloat(destLatStr);
    const lon = parseFloat(destLonStr);
    if (!isNaN(lat) && !isNaN(lon)) {
      destCoords = [lon, lat]; // [lon, lat]
    }
  }
  if (!destCoords) {
    destCoords = await geocode(destAddress);
  }
  if (!destCoords) {
    return NextResponse.json(
      { error: "Failed to geocode destination address", from_api: false },
      { status: 502 }
    );
  }

  const weightKg = Math.max(0.1, weightGrams / 1000);

  const requestBody = {
    items: [
      {
        size: { length: 0.3, width: 0.2, height: 0.1 },
        weight: weightKg,
        quantity: 1,
        pickup_point: 1,
        dropoff_point: 2,
      },
    ],
    route_points: [
      {
        id: 1,
        coordinates: sourceCoords,
        fullname: sourceAddress,
      },
      {
        id: 2,
        coordinates: destCoords,
        fullname: destAddress,
      },
    ],
    requirements: {
      // Пробуем все основные классы — API вернёт доступные для данного маршрута
      taxi_classes: ["courier", "express"],
      skip_door_to_door: false,
    },
  };

  try {
    const res = await fetch(YA_B2B_CALCULATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept-Language": "ru",
      },
      body: JSON.stringify(requestBody),
      next: { revalidate: 0 },
    });

    const rawText = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: `Яндекс B2B API: ${res.status}`,
          details: rawText.slice(0, 400),
          from_api: false,
        },
        { status: res.status >= 500 ? 502 : 400 }
      );
    }

    const data = (await JSON.parse(rawText)) as {
      offers?: Array<{
        price?: { total_price?: string; currency?: string };
        taxi_class?: string;
        description?: string;
        pickup_interval?: { from?: string; to?: string };
        delivery_interval?: { from?: string; to?: string };
      }>;
    };

    const offers = data.offers ?? [];

    if (!offers.length) {
      return NextResponse.json({
        price: 0,
        from_api: true,
        no_offers: true,
        raw: rawText.slice(0, 400),
        debug: { sourceCoords, destCoords, weightKg },
      });
    }

    // Список тарифов для фронта
    const mappedOffers = offers.map((o, idx) => {
      const totalPrice = o.price?.total_price ? Math.round(parseFloat(o.price.total_price)) : 0;
      return {
        id: String(idx),
        taxi_class: o.taxi_class ?? null,
        description: o.description ?? null,
        price: totalPrice,
        delivery_from: o.delivery_interval?.from ?? null,
        delivery_to: o.delivery_interval?.to ?? null,
      };
    });

    // Выбираем самый дешёвый оффер
    let bestIndex = 0;
    let bestPrice = Number.POSITIVE_INFINITY;
    mappedOffers.forEach((o, idx) => {
      const p = typeof o.price === "number" && !Number.isNaN(o.price) ? o.price : Number.POSITIVE_INFINITY;
      if (p < bestPrice) {
        bestPrice = p;
        bestIndex = idx;
      }
    });
    const best = mappedOffers[bestIndex] ?? mappedOffers[0];

    const price = best.price;
    const description = best.description ?? best.taxi_class ?? "courier";
    const deliveryFrom = best.delivery_from;
    const deliveryTo = best.delivery_to;

    return NextResponse.json({
      // Сводка по «лучшему» тарифу — для обратной совместимости
      price,
      description,
      delivery_from: deliveryFrom,
      delivery_to: deliveryTo,
      from_api: true,
      // Полный список доступных тарифов
      offers: mappedOffers,
      best_index: bestIndex,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Request failed", from_api: false },
      { status: 502 }
    );
  }
}
