import { NextRequest, NextResponse } from "next/server";
import { logUpstreamError, logUpstreamHttpError } from "../../../lib/upstreamLog";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");
  const latNum = lat ? parseFloat(lat) : NaN;
  const lonNum = lon ? parseFloat(lon) : NaN;

  if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
    return NextResponse.json({ error: "Invalid lat/lon" }, { status: 400 });
  }

  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("lat", String(latNum));
  url.searchParams.set("lon", String(lonNum));
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "ru");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 0 },
      headers: { "User-Agent": "ZNVES-Delivery/1.0" },
    });
    if (!res.ok) {
      logUpstreamHttpError("reverse-geocode/nominatim", res.status, res.statusText, {
        lat: latNum,
        lon: lonNum,
      });
      return NextResponse.json({ error: "Geocoder request failed" }, { status: 502 });
    }
    const data = (await res.json()) as {
      address?: {
        road?: string;
        house_number?: string;
        street?: string;
        city?: string;
        town?: string;
        village?: string;
        municipality?: string;
        state?: string;
        country?: string;
      };
      display_name?: string;
    };

    const addr = data?.address ?? {};
    const city =
      addr.city ?? addr.town ?? addr.village ?? addr.municipality ?? addr.state ?? "Москва";
    const street = addr.road ?? addr.street ?? "";
    const house = addr.house_number ?? "";
    const fullAddress = data?.display_name ?? [street, house, city].filter(Boolean).join(", ");

    return NextResponse.json({
      city,
      street,
      house,
      fullAddress: fullAddress || `${street} ${house}`.trim() || "Москва",
      lat: latNum,
      lon: lonNum,
    });
  } catch (err) {
    logUpstreamError("reverse-geocode/nominatim", err, { lat: latNum, lon: lonNum });
    return NextResponse.json({ error: "Geocoder error" }, { status: 502 });
  }
}
