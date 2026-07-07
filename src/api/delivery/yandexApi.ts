/**
 * API для получения пунктов выдачи Яндекса (Яндекс.Доставка ПВЗ).
 * Бэкенд: GET /api/delivery/yandex/pvz (см. DELIVERY_INTEGRATION_REQUIREMENTS.md)
 */

import type { MapBounds } from "./cdekApi";

import { API_BASE_URL } from "../../lib/apiConfig";
import {
  asRecord,
  parseLatLonFromUnknown,
  readArray,
  readString,
} from "../../lib/recordUtils";

const API_BASE = `${API_BASE_URL}/api/delivery`;

export type YandexPvzPoint = {
  id: string;
  name: string;
  address: string;
  location: { lat: number; lon: number };
  work_time: string;
  phones?: string[];
};

function parseLocation(loc: unknown): { lat: number; lon: number } | null {
  return parseLatLonFromUnknown(loc);
}

function normalizePvzItem(raw: unknown): YandexPvzPoint | null {
  const record = asRecord(raw);
  if (!record) return null;
  const address =
    readString(record, "address", "full_address", "fullAddress") ??
    [readString(record, "city"), readString(record, "street"), readString(record, "house")]
      .filter(Boolean)
      .join(", ");
  const id = readString(record, "id", "pvz_id", "code", "uuid") ?? String(record.id ?? "");
  const location = parseLocation(record.location ?? record.coordinates ?? record.coords);
  if (!location) return null;
  const phone = readString(record, "phone");
  return {
    id: String(id),
    name: readString(record, "name", "title") ?? "",
    address: String(address).trim() || String(readString(record, "name", "title") ?? ""),
    location,
    work_time: readString(record, "work_time", "workTime", "schedule") ?? "",
    phones: Array.isArray(record.phones)
      ? record.phones.filter((item): item is string => typeof item === "string")
      : phone
        ? [phone]
        : undefined,
  };
}

function extractPvzList(data: unknown): YandexPvzPoint[] {
  if (Array.isArray(data)) {
    return data.map(normalizePvzItem).filter((p): p is YandexPvzPoint => p !== null);
  }
  const record = asRecord(data);
  if (!record) return [];
  const arr = readArray(record, "data", "results", "items", "pvz", "points");
  return arr.map(normalizePvzItem).filter((p): p is YandexPvzPoint => p !== null);
}

function getPvzCoords(p: YandexPvzPoint): { lat: number; lon: number } | null {
  const { lat, lon } = p.location;
  if (typeof lat !== "number" || typeof lon !== "number") return null;
  return { lat, lon };
}

export function sortYandexPvzByDistance(
  points: YandexPvzPoint[],
  lat: number,
  lon: number
): YandexPvzPoint[] {
  return [...points]
    .filter((p) => getPvzCoords(p) !== null)
    .sort((a, b) => {
      const c1 = getPvzCoords(a)!;
      const c2 = getPvzCoords(b)!;
      const d1 = Math.hypot(c1.lat - lat, c1.lon - lon);
      const d2 = Math.hypot(c2.lat - lat, c2.lon - lon);
      return d1 - d2;
    });
}

export function filterYandexPvzByBounds(
  points: YandexPvzPoint[],
  bounds: MapBounds
): YandexPvzPoint[] {
  const [[south, west], [north, east]] = bounds;
  return points.filter((p) => {
    const c = getPvzCoords(p);
    if (!c) return false;
    return c.lat >= south && c.lat <= north && c.lon >= west && c.lon <= east;
  });
}

export const getYandexPvzByCity = async (
  city: string,
  signal?: AbortSignal
): Promise<YandexPvzPoint[]> => {
  const url = `${API_BASE}/yandex/pvz?city=${encodeURIComponent(city)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal,
    });
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Яндекс ПВЗ: ${res.status}`);
    }
    const data = await res.json();
    const list = extractPvzList(data);
    if (list.length === 0) return getFallbackYandexPvzForCity(city);
    return list;
  } catch (e) {
    return getFallbackYandexPvzForCity(city);
  }
};

export const getYandexPvzByCoords = async (
  lat: number,
  lon: number,
  fallbackCity?: string,
  signal?: AbortSignal
): Promise<YandexPvzPoint[]> => {
  const url = `${API_BASE}/yandex/pvz?lat=${lat}&lon=${lon}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal,
    });
    if (res.ok) {
      const data = await res.json();
      const list = extractPvzList(data);
      if (list.length > 0) return sortYandexPvzByDistance(list, lat, lon);
    }
  } catch {
    // ignore
  }
  if (fallbackCity) {
    const byCity = await getYandexPvzByCity(fallbackCity, signal);
    return sortYandexPvzByDistance(byCity, lat, lon);
  }
  return [];
};

/** Fallback ПВЗ Яндекс по городам (если бэкенд не отдаёт) */
const FALLBACK_YANDEX_MOSCOW: YandexPvzPoint[] = [
  { id: "ynd_msk_1", name: "ПВЗ Яндекс (Тверская)", address: "г. Москва, ул. Тверская, д. 1", location: { lat: 55.7657, lon: 37.6056 }, work_time: "Пн-Вс 9:00–21:00" },
  { id: "ynd_msk_2", name: "ПВЗ Яндекс (Арбат)", address: "г. Москва, ул. Арбат, д. 10", location: { lat: 55.7522, lon: 37.5932 }, work_time: "Пн-Вс 10:00–20:00" },
  { id: "ynd_msk_3", name: "ПВЗ Яндекс (Курская)", address: "г. Москва, ул. Земляной Вал, д. 33", location: { lat: 55.7584, lon: 37.6597 }, work_time: "Пн-Вс 9:00–21:00" },
  { id: "ynd_msk_4", name: "ПВЗ Яндекс (Киевская)", address: "г. Москва, Киевская ул., д. 2", location: { lat: 55.7444, lon: 37.5654 }, work_time: "Пн-Вс 8:00–22:00" },
  { id: "ynd_msk_5", name: "ПВЗ Яндекс (ВДНХ)", address: "г. Москва, пр-т Мира, д. 119", location: { lat: 55.8304, lon: 37.625 }, work_time: "Пн-Вс 10:00–20:00" },
];

const FALLBACK_YANDEX_SPB: YandexPvzPoint[] = [
  { id: "ynd_spb_1", name: "ПВЗ Яндекс (Невский)", address: "г. Санкт-Петербург, Невский пр., д. 88", location: { lat: 59.9343, lon: 30.3351 }, work_time: "Пн-Вс 9:00–21:00" },
  { id: "ynd_spb_2", name: "ПВЗ Яндекс (Лиговский)", address: "г. Санкт-Петербург, Лиговский пр., д. 50", location: { lat: 59.9244, lon: 30.3556 }, work_time: "Пн-Пт 9:00–20:00" },
  { id: "ynd_spb_3", name: "ПВЗ Яндекс (Московский)", address: "г. Санкт-Петербург, Московский пр., д. 189", location: { lat: 59.8512, lon: 30.3198 }, work_time: "Пн-Вс 10:00–20:00" },
];

const YANDEX_CITY_KEYS: Record<string, YandexPvzPoint[]> = {
  москва: FALLBACK_YANDEX_MOSCOW,
  мск: FALLBACK_YANDEX_MOSCOW,
  московск: FALLBACK_YANDEX_MOSCOW,
  "санкт-петербург": FALLBACK_YANDEX_SPB,
  петербург: FALLBACK_YANDEX_SPB,
  спб: FALLBACK_YANDEX_SPB,
  ленинград: FALLBACK_YANDEX_SPB,
};

export function getFallbackYandexPvzForCity(cityName: string): YandexPvzPoint[] {
  const name = (cityName || "").toLowerCase();
  for (const [key, points] of Object.entries(YANDEX_CITY_KEYS)) {
    if (name.includes(key)) return [...points];
  }
  return [];
}

const MOSCOW_BOUNDS = { latMin: 55.4, latMax: 56.1, lonMin: 36.8, lonMax: 38.2 };
const SPB_BOUNDS = { latMin: 59.7, latMax: 60.2, lonMin: 29.6, lonMax: 30.8 };

export function getFallbackYandexPvzByCoords(
  lat: number,
  lon: number
): YandexPvzPoint[] {
  if (lat >= MOSCOW_BOUNDS.latMin && lat <= MOSCOW_BOUNDS.latMax && lon >= MOSCOW_BOUNDS.lonMin && lon <= MOSCOW_BOUNDS.lonMax) {
    return [...FALLBACK_YANDEX_MOSCOW];
  }
  if (lat >= SPB_BOUNDS.latMin && lat <= SPB_BOUNDS.latMax && lon >= SPB_BOUNDS.lonMin && lon <= SPB_BOUNDS.lonMax) {
    return [...FALLBACK_YANDEX_SPB];
  }
  return [];
}
