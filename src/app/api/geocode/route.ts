import { NextRequest, NextResponse } from "next/server";

const YANDEX_GEOCODER_URL = "https://geocode-maps.yandex.ru/v1/";
const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";

/**
 * Прямое геокодирование (адрес → координаты).
 * Сначала пробуем Yandex Geocoder API; при ошибке или отсутствии ключа — Nominatim (OpenStreetMap).
 */
export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();
  if (!address || address.length < 3) {
    return NextResponse.json({ error: "Missing or too short address" }, { status: 400 });
  }

  // 1) Пробуем Yandex
  const apiKey =
    process.env.YANDEX_SUGGEST_API_KEY ||
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ||
    "";

  if (apiKey) {
    try {
      const url = new URL(YANDEX_GEOCODER_URL);
      url.searchParams.set("apikey", apiKey);
      url.searchParams.set("geocode", address);
      url.searchParams.set("format", "json");
      url.searchParams.set("lang", "ru_RU");
      url.searchParams.set("results", "1");

      const res = await fetch(url.toString(), { next: { revalidate: 0 } });
      const body = await res.text();

      if (!res.ok) {
        // Продолжим к Nominatim ниже
      } else {
        const data = JSON.parse(body) as {
          response?: {
            GeoObjectCollection?: {
              featureMember?: Array<{
                GeoObject?: {
                  Point?: { pos?: string };
                  metaDataProperty?: {
                    GeocoderMetaData?: {
                      text?: string;
                      Address?: { Components?: Array<{ kind?: string; name?: string }> };
                    };
                  };
                };
              }>;
            };
          };
        };

        const members = data?.response?.GeoObjectCollection?.featureMember ?? [];
        const first = members[0]?.GeoObject;
        if (first?.Point?.pos) {
          const parts = first.Point.pos.trim().split(/\s+/);
          const lat = parseFloat(parts[0]);
          const lon = parseFloat(parts[1] ?? parts[0]);
          if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
            const meta = first.metaDataProperty?.GeocoderMetaData;
            const fullAddress = meta?.text ?? "";
            const components = meta?.Address?.Components ?? [];
            let city = "Москва";
            let street = "";
            let house = "";
            for (const c of components) {
              const k = (c.kind || "").toLowerCase();
              const n = c.name || "";
              if (k === "locality" || k === "area") city = n || city;
              if (k === "street" || k === "thoroughfare") street = n || street;
              if (k === "house") house = n || house;
            }
            return NextResponse.json({
              lat,
              lon,
              fullAddress: fullAddress || [city, street, house].filter(Boolean).join(", "),
              city,
              street,
              house,
            });
          }
        }
      }
    } catch (err) {
    }
  }

  // 2) Запасной вариант: Nominatim (OpenStreetMap)
  try {
    const url = new URL(NOMINATIM_SEARCH_URL);
    url.searchParams.set("q", address);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");

    const res = await fetch(url.toString(), {
      next: { revalidate: 0 },
      headers: { "User-Agent": "ZNVES-Delivery/1.0" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Geocoder request failed", details: res.statusText },
        { status: 502 }
      );
    }

    const list = (await res.json()) as Array<{
      lat?: string;
      lon?: string;
      display_name?: string;
      address?: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        road?: string;
        house_number?: string;
      };
    }>;

    const item = list?.[0];
    if (!item?.lat || !item?.lon) {
      return NextResponse.json({ error: "No result" });
    }

    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json({ error: "Invalid coordinates" });
    }

    const addr = item.address ?? {};
    const city = addr.city ?? addr.town ?? addr.village ?? addr.state ?? "Москва";
    const street = addr.road ?? "";
    const house = addr.house_number ?? "";
    const fullAddress = item.display_name ?? [street, house, city].filter(Boolean).join(", ");

    return NextResponse.json({
      lat,
      lon,
      fullAddress: fullAddress || [city, street, house].filter(Boolean).join(", "),
      city,
      street,
      house,
    });
  } catch (err) {
    return NextResponse.json({ error: "Geocoder error" }, { status: 502 });
  }
}
