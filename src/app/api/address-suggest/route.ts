import { NextRequest, NextResponse } from "next/server";
import { asRecord, readString } from "../../../lib/recordUtils";
import { logUpstreamError, logUpstreamHttpError } from "../../../lib/upstreamLog";

const SUGGEST_URL = "https://suggest-maps.yandex.ru/v1/suggest";
const GEOCODER_URL = "https://geocode-maps.yandex.ru/v1/";

function normalizeSuggestItem(item: unknown): { displayName: string; value: string } | null {
  const record = asRecord(item);
  if (!record) return null;
  const title = asRecord(record.title);
  const subtitle = asRecord(record.subtitle);
  const address = asRecord(record.address);
  const displayName =
    readString(title ?? {}, "text") ??
    (typeof record.title === "string" ? record.title : undefined) ??
    readString(record, "displayName") ??
    "";
  const value =
    readString(subtitle ?? {}, "text") ??
    (typeof record.subtitle === "string" ? record.subtitle : undefined) ??
    readString(address ?? {}, "formatted_address") ??
    readString(record, "value") ??
    displayName;
  const d = String(displayName || value);
  const v = String(value || displayName);
  return d || v ? { displayName: d || v, value: v || d } : null;
}

function withTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

async function fetchGeocoderSuggestions(apiKey: string, query: string): Promise<{ displayName: string; value: string }[]> {
  const url = new URL(GEOCODER_URL);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("geocode", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("lang", "ru_RU");
  url.searchParams.set("results", "10");

  const { signal, clear } = withTimeout(8000);
  try {
    const res = await fetch(url.toString(), { signal, next: { revalidate: 0 } });
    if (!res.ok) {
      logUpstreamHttpError("address-suggest/geocoder", res.status, undefined, { query });
      return [];
    }

    const data = await res.json();
    const members = data?.response?.GeoObjectCollection?.featureMember ?? [];
    return members
      .map((member: unknown) => {
        const memberRecord = asRecord(member);
        const geo = asRecord(memberRecord?.GeoObject);
        if (!geo) return null;
        const name = readString(geo, "name") ?? "";
        const meta = asRecord(geo.metaDataProperty);
        const geocoderMeta = asRecord(meta?.GeocoderMetaData);
        const text = readString(geocoderMeta ?? {}, "text") ?? name;
        return name || text ? { displayName: String(name), value: String(text || name) } : null;
      })
      .filter(Boolean);
  } finally {
    clear();
  }
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const query = q ? String(q).trim() : "";
  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey =
    process.env.YANDEX_SUGGEST_API_KEY ||
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ||
    "";
  if (!apiKey) {
    return NextResponse.json({ suggestions: [] });
  }

  let suggestions: { displayName: string; value: string }[] = [];

  try {
    const suggestUrl = new URL(SUGGEST_URL);
    suggestUrl.searchParams.set("apikey", apiKey);
    suggestUrl.searchParams.set("text", query);
    suggestUrl.searchParams.set("results", "10");
    suggestUrl.searchParams.set("lang", "ru_RU");
    suggestUrl.searchParams.set("types", "geo,street,locality,area,house");
    suggestUrl.searchParams.set("highlight", "0");

    const { signal: sugSignal, clear: sugClear } = withTimeout(8000);
    try {
      const res = await fetch(suggestUrl.toString(), { signal: sugSignal, next: { revalidate: 0 } });
      if (res.ok) {
        const data = await res.json();
        const rawList = data?.results ?? data?.suggestions ?? Array.isArray(data) ? data : [];
        const parsed = rawList.map(normalizeSuggestItem).filter(Boolean) as { displayName: string; value: string }[];
        if (parsed.length > 0) suggestions = parsed;
      } else {
        logUpstreamHttpError("address-suggest/yandex", res.status, undefined, { query });
      }
    } finally {
      sugClear();
    }
  } catch (err) {
    logUpstreamError("address-suggest/yandex", err, { query });
  }

  if (suggestions.length === 0) {
    try {
      suggestions = await fetchGeocoderSuggestions(apiKey, query);
    } catch (err) {
      logUpstreamError("address-suggest/geocoder-fallback", err, { query });
    }
  }

  return NextResponse.json({ suggestions });
}
