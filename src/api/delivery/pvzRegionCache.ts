/**
 * Кэш ПВЗ региона в sessionStorage.
 * Один раз получаем все ПВЗ города через прокси-бэкенд и храним в браузере —
 * карта работает мгновенно при движении/зуме без повторных запросов к API.
 */

import { getCdekPvzByCity, type CdekPvzPoint } from "./cdekApi";
import { getYandexPvzByCity, type YandexPvzPoint } from "./yandexApi";

const STORAGE_PREFIX_CDEK = "znves_pvz_cdek_";
const STORAGE_PREFIX_YANDEX = "znves_pvz_yandex_";

function normalizeCityKey(city: string): string {
  return city.trim().toLowerCase().replace(/\s+/g, "_") || "default";
}

function getStorageKey(city: string, type: "cdek" | "yandex"): string {
  const key = normalizeCityKey(city);
  return type === "cdek" ? `${STORAGE_PREFIX_CDEK}${key}` : `${STORAGE_PREFIX_YANDEX}${key}`;
}

/** Получить все ПВЗ региона (города): из кэша или через прокси, с сохранением в sessionStorage */
export async function getRegionPvzCdek(
  city: string,
  signal?: AbortSignal
): Promise<CdekPvzPoint[]> {
  if (typeof sessionStorage === "undefined") {
    return getCdekPvzByCity(city, signal);
  }
  const key = getStorageKey(city, "cdek");
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { points } = JSON.parse(raw) as { points: CdekPvzPoint[] };
      if (Array.isArray(points) && points.length >= 0) return points;
    }
  } catch {
    // ignore parse error, fetch again
  }
  const points = await getCdekPvzByCity(city, signal);
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        city: normalizeCityKey(city),
        points,
        timestamp: Date.now(),
      })
    );
  } catch {
    // quota or disabled storage
  }
  return points;
}

/** Получить все ПВЗ региона (города) Яндекс: из кэша или через прокси */
export async function getRegionPvzYandex(
  city: string,
  signal?: AbortSignal
): Promise<YandexPvzPoint[]> {
  if (typeof sessionStorage === "undefined") {
    return getYandexPvzByCity(city, signal);
  }
  const key = getStorageKey(city, "yandex");
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { points } = JSON.parse(raw) as { points: YandexPvzPoint[] };
      if (Array.isArray(points) && points.length >= 0) return points;
    }
  } catch {
    // ignore
  }
  const points = await getYandexPvzByCity(city, signal);
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        city: normalizeCityKey(city),
        points,
        timestamp: Date.now(),
      })
    );
  } catch {
    // ignore
  }
  return points;
}
