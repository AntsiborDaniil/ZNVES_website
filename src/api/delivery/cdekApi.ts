/**
 * API для получения пунктов выдачи СДЭК.
 * Бэкенд: GET /api/delivery/cdek/pvz (см. DELIVERY_INTEGRATION_REQUIREMENTS.md)
 */

import { API_BASE_URL } from "../../lib/apiConfig";

const API_BASE = `${API_BASE_URL}/api/delivery`;

export type CdekPvzPoint = {
  code: string;
  name: string;
  address: string;
  location: { lat: number; lon: number };
  work_time: string;
  address_comment?: string;
};

function parseLocation(loc: any): { lat: number; lon: number } | null {
  if (!loc || typeof loc !== "object") return null;
  const lat =
    loc.lat ?? loc.latitude ?? loc.coordinates?.lat ?? loc.coordinates?.latitude;
  const lon =
    loc.lon ??
    loc.lng ??
    loc.longitude ??
    loc.coordinates?.lon ??
    loc.coordinates?.lng ??
    loc.coordinates?.longitude;
  if (typeof lat !== "number" || typeof lon !== "number") return null;
  return { lat, lon };
}

/** Нормализация одного пункта из ответа API */
function normalizePvzItem(raw: any): CdekPvzPoint | null {
  if (!raw || typeof raw !== "object") return null;
  const address =
    raw.address ??
    raw.full_address ??
    raw.fullAddress ??
    [raw.city, raw.street, raw.house].filter(Boolean).join(", ") ??
    "";
  const code =
    raw.code ?? raw.pvz_code ?? raw.id ?? raw.uuid ?? String(raw.code || "");
  const location = parseLocation(raw.location ?? raw.coordinates ?? raw.coords);
  if (!location) return null;
  return {
    code: String(code),
    name: raw.name ?? raw.title ?? "",
    address: String(address).trim() || String(raw.name || raw.title || ""),
    location,
    work_time: raw.work_time ?? raw.workTime ?? raw.schedule ?? "",
    address_comment: raw.address_comment ?? raw.addressComment,
  };
}

/** Извлечь массив пунктов из ответа (массив или объект с полем data/results/items) */
function extractPvzList(data: any): CdekPvzPoint[] {
  if (Array.isArray(data)) {
    return data.map(normalizePvzItem).filter((p): p is CdekPvzPoint => p !== null);
  }
  if (data && typeof data === "object") {
    const arr =
      data.data ?? data.results ?? data.items ?? data.pvz ?? data.points ?? [];
    if (Array.isArray(arr)) {
      return arr.map(normalizePvzItem).filter((p): p is CdekPvzPoint => p !== null);
    }
  }
  return [];
}

/**
 * Получить список ПВЗ СДЭК по городу.
 * @param signal — при отмене запрос прерывается, результат не используется
 */
export const getCdekPvzByCity = async (
  city: string,
  signal?: AbortSignal
): Promise<CdekPvzPoint[]> => {
  const url = `${API_BASE}/cdek/pvz?city=${encodeURIComponent(city)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal,
    });
    if (!res.ok) {
      if (res.status === 404) return getFallbackPvzForCity(city);
      throw new Error(`СДЭК ПВЗ: ${res.status}`);
    }
    const data = await res.json();
    console.log("[cdekApi] getCdekPvzByCity response:", data);
    const list = extractPvzList(data);
    if (list.length === 0) {
      return getFallbackPvzForCity(city);
    }
    return list;
  } catch (e) {
    console.warn(
      "[cdekApi] getCdekPvzByCity failed for city:",
      city,
      "url:",
      url,
      "error:",
      e
    );
    return getFallbackPvzForCity(city);
  }
};

/**
 * Получить список ПВЗ СДЭК по координатам (ближайшие к пользователю).
 * Если бэкенд поддерживает lat/lon, использует их; иначе вернёт пустой массив или по умолчанию по городу.
 */
export const getCdekPvzByCoords = async (
  lat: number,
  lon: number,
  fallbackCity?: string,
  signal?: AbortSignal
): Promise<CdekPvzPoint[]> => {
  const byCoordsUrl = `${API_BASE}/cdek/pvz?lat=${lat}&lon=${lon}`;
  try {
    const res = await fetch(byCoordsUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("[cdekApi] getCdekPvzByCoords response:", data);
      const list = extractPvzList(data);
      if (list.length > 0) {
        return sortPvzByDistance(list, lat, lon);
      }
    }
  } catch {
    // ignore
  }
  if (fallbackCity) {
    const byCity = await getCdekPvzByCity(fallbackCity, signal);
    return sortPvzByDistance(byCity, lat, lon);
  }
  return [];
};

function getPvzCoords(p: CdekPvzPoint): { lat: number; lon: number } | null {
  const loc = p.location;
  if (!loc) return null;
  const lat = (loc as any).lat ?? (loc as any).latitude;
  const lon = (loc as any).lon ?? (loc as any).longitude;
  if (typeof lat !== "number" || typeof lon !== "number") return null;
  return { lat, lon };
}

export function sortPvzByDistance(
  points: CdekPvzPoint[],
  lat: number,
  lon: number
): CdekPvzPoint[] {
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

/** Границы видимой области карты [south, west], [north, east] */
export type MapBounds = [[number, number], [number, number]];

/** Оставить только ПВЗ, попадающие в видимую область */
export function filterPvzByBounds(
  points: CdekPvzPoint[],
  bounds: MapBounds
): CdekPvzPoint[] {
  const [[south, west], [north, east]] = bounds;
  return points.filter((p) => {
    const c = getPvzCoords(p);
    if (!c) return false;
    return c.lat >= south && c.lat <= north && c.lon >= west && c.lon <= east;
  });
}

/** Тестовые ПВЗ для Москвы (разные районы), если бэкенд ещё не отдаёт список */
const FALLBACK_CDEK_POINTS_MOSCOW: CdekPvzPoint[] = [
  { code: "MSK001", name: "ПВЗ СДЭК (Тверская)", address: "г. Москва, ул. Тверская, д. 1", location: { lat: 55.7657, lon: 37.6056 }, work_time: "Пн-Пт 9:00–21:00, Сб-Вс 10:00–18:00" },
  { code: "MSK002", name: "ПВЗ СДЭК (Арбат)", address: "г. Москва, ул. Арбат, д. 10", location: { lat: 55.7522, lon: 37.5932 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "MSK003", name: "ПВЗ СДЭК (Лубянка)", address: "г. Москва, Лубянская пл., д. 2", location: { lat: 55.7604, lon: 37.6256 }, work_time: "Пн-Пт 9:00–20:00" },
  { code: "MSK004", name: "ПВЗ СДЭК (Курская)", address: "г. Москва, ул. Земляной Вал, д. 33", location: { lat: 55.7584, lon: 37.6597 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "MSK005", name: "ПВЗ СДЭК (Павелецкая)", address: "г. Москва, ул. Кожевническая, д. 7", location: { lat: 55.7312, lon: 37.6404 }, work_time: "Пн-Пт 10:00–19:00" },
  { code: "MSK006", name: "ПВЗ СДЭК (Киевская)", address: "г. Москва, Киевская ул., д. 2", location: { lat: 55.7444, lon: 37.5654 }, work_time: "Пн-Вс 8:00–22:00" },
  { code: "MSK007", name: "ПВЗ СДЭК (Сокол)", address: "г. Москва, Ленинградский пр-т, д. 74", location: { lat: 55.8066, lon: 37.5162 }, work_time: "Пн-Пт 9:00–21:00" },
  { code: "MSK008", name: "ПВЗ СДЭК (ВДНХ)", address: "г. Москва, пр-т Мира, д. 119", location: { lat: 55.8304, lon: 37.6250 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "MSK009", name: "ПВЗ СДЭК (Сокольники)", address: "г. Москва, ул. Сокольнический Вал, д. 1", location: { lat: 55.7922, lon: 37.6756 }, work_time: "Пн-Пт 9:00–19:00" },
  { code: "MSK010", name: "ПВЗ СДЭК (Преображенская)", address: "г. Москва, ул. Преображенская, д. 12", location: { lat: 55.7964, lon: 37.7142 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "MSK011", name: "ПВЗ СДЭК (Измайлово)", address: "г. Москва, Измайловский пр-д, д. 4", location: { lat: 55.7878, lon: 37.7912 }, work_time: "Пн-Пт 10:00–20:00" },
  { code: "MSK012", name: "ПВЗ СДЭК (Перово)", address: "г. Москва, ул. Перовская, д. 44", location: { lat: 55.7512, lon: 37.7842 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "MSK013", name: "ПВЗ СДЭК (Новогиреево)", address: "г. Москва, Свободный пр-т, д. 19", location: { lat: 55.7524, lon: 37.8178 }, work_time: "Пн-Пт 9:00–20:00" },
  { code: "MSK014", name: "ПВЗ СДЭК (Тушино)", address: "г. Москва, ул. Тушинская, д. 17", location: { lat: 55.8278, lon: 37.4368 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "MSK015", name: "ПВЗ СДЭК (Щукинская)", address: "г. Москва, ул. Маршала Василевского, д. 13", location: { lat: 55.8082, lon: 37.4624 }, work_time: "Пн-Пт 9:00–19:00" },
  { code: "MSK016", name: "ПВЗ СДЭК (Кунцево)", address: "г. Москва, Рублёвское ш., д. 52", location: { lat: 55.7312, lon: 37.4124 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "MSK017", name: "ПВЗ СДЭК (Юго-Западная)", address: "г. Москва, пр-т Вернадского, д. 86", location: { lat: 55.6424, lon: 37.5324 }, work_time: "Пн-Пт 9:00–20:00" },
  { code: "MSK018", name: "ПВЗ СДЭК (Теплый Стан)", address: "г. Москва, ул. Теплый Стан, д. 4", location: { lat: 55.6192, lon: 37.5078 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "MSK019", name: "ПВЗ СДЭК (Царицыно)", address: "г. Москва, ул. Луганская, д. 5", location: { lat: 55.6212, lon: 37.6692 }, work_time: "Пн-Пт 9:00–19:00" },
  { code: "MSK020", name: "ПВЗ СДЭК (Люблино)", address: "г. Москва, ул. Люблинская, д. 72", location: { lat: 55.6778, lon: 37.7612 }, work_time: "Пн-Вс 9:00–21:00" },
];

/** ПВЗ в Апрелевке и окрестностях (чтобы маркеры были в кадре при просмотре карты в этом городе) */
const FALLBACK_CDEK_POINTS_APRELEVKA: CdekPvzPoint[] = [
  { code: "APR001", name: "ПВЗ СДЭК (Апрелевка, центр)", address: "Московская обл., г. Апрелевка, ул. Февральская, д. 55", location: { lat: 55.5353, lon: 37.0651 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "APR002", name: "ПВЗ СДЭК (Апрелевка, Победы)", address: "Московская обл., г. Апрелевка, ул. Победы, д. 12", location: { lat: 55.5382, lon: 37.0582 }, work_time: "Пн-Пт 9:00–20:00" },
  { code: "APR003", name: "ПВЗ СДЭК (Апрелевка, Киевское ш.)", address: "Московская обл., Киевское ш., Апрелевка", location: { lat: 55.5282, lon: 37.0724 }, work_time: "Пн-Вс 10:00–20:00" },
];

/** Тестовые ПВЗ для Санкт-Петербурга (fallback, если бэкенд не отдаёт по городу) */
const FALLBACK_CDEK_POINTS_SPB: CdekPvzPoint[] = [
  { code: "SPB001", name: "ПВЗ СДЭК (Невский)", address: "г. Санкт-Петербург, Невский пр., д. 88", location: { lat: 59.9343, lon: 30.3351 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "SPB002", name: "ПВЗ СДЭК (Лиговский)", address: "г. Санкт-Петербург, Лиговский пр., д. 50", location: { lat: 59.9244, lon: 30.3556 }, work_time: "Пн-Пт 9:00–20:00" },
  { code: "SPB003", name: "ПВЗ СДЭК (Московский)", address: "г. Санкт-Петербург, Московский пр., д. 189", location: { lat: 59.8512, lon: 30.3198 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "SPB004", name: "ПВЗ СДЭК (Василеостровская)", address: "г. Санкт-Петербург, Средний пр. В.О., д. 36", location: { lat: 59.9342, lon: 30.2624 }, work_time: "Пн-Пт 9:00–19:00" },
  { code: "SPB005", name: "ПВЗ СДЭК (Петроградская)", address: "г. Санкт-Петербург, ул. Большая Пушкарская, д. 52", location: { lat: 59.9634, lon: 30.3042 }, work_time: "Пн-Вс 10:00–20:00" },
  { code: "SPB006", name: "ПВЗ СДЭК (Выборгская)", address: "г. Санкт-Петербург, пр. Энгельса, д. 124", location: { lat: 60.0312, lon: 30.3245 }, work_time: "Пн-Пт 9:00–21:00" },
  { code: "SPB007", name: "ПВЗ СДЭК (Купчино)", address: "г. Санкт-Петербург, Будапештская ул., д. 94", location: { lat: 59.8298, lon: 30.3756 }, work_time: "Пн-Вс 9:00–21:00" },
  { code: "SPB008", name: "ПВЗ СДЭК (Проспект Просвещения)", address: "г. Санкт-Петербург, пр. Просвещения, д. 33", location: { lat: 60.0512, lon: 30.3312 }, work_time: "Пн-Пт 10:00–19:00" },
  { code: "SPB009", name: "ПВЗ СДЭК (Ладожская)", address: "г. Санкт-Петербург, Заневский пр., д. 71", location: { lat: 59.9312, lon: 30.4412 }, work_time: "Пн-Вс 9:00–20:00" },
  { code: "SPB010", name: "ПВЗ СДЭК (Комендантский)", address: "г. Санкт-Петербург, Комендантский пр., д. 30", location: { lat: 60.0124, lon: 30.2584 }, work_time: "Пн-Пт 9:00–20:00" },
];

/** Fallback ПВЗ для других регионов России (когда бэкенд не отдаёт по городу) */
const FALLBACK_CDEK_BY_REGION: Array<{ keys: string[]; bounds: { latMin: number; latMax: number; lonMin: number; lonMax: number }; points: CdekPvzPoint[] }> = [
  {
    keys: ["казань", "татарстан"],
    bounds: { latMin: 55.6, latMax: 56.0, lonMin: 48.9, lonMax: 49.4 },
    points: [
      { code: "KZN001", name: "ПВЗ СДЭК (Центр)", address: "г. Казань, ул. Баумана, д. 58", location: { lat: 55.7887, lon: 49.1221 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "KZN002", name: "ПВЗ СДЭК (Кремлёвская)", address: "г. Казань, ул. Кремлёвская, д. 35", location: { lat: 55.7910, lon: 49.1210 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "KZN003", name: "ПВЗ СДЭК (Аметьевская)", address: "г. Казань, ул. Аметьевская, д. 8", location: { lat: 55.8152, lon: 49.1582 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "KZN004", name: "ПВЗ СДЭК (Проспект Победы)", address: "г. Казань, пр. Победы, д. 100", location: { lat: 55.7622, lon: 49.2082 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "KZN005", name: "ПВЗ СДЭК (Вахитово)", address: "г. Казань, ул. Декабристов, д. 85", location: { lat: 55.7524, lon: 49.1824 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["нижний новгород", "нижний", "новгород"],
    bounds: { latMin: 56.1, latMax: 56.4, lonMin: 43.8, lonMax: 44.1 },
    points: [
      { code: "NN001", name: "ПВЗ СДЭК (Большая Покровская)", address: "г. Нижний Новгород, ул. Большая Покровская, д. 82", location: { lat: 56.3172, lon: 44.0002 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "NN002", name: "ПВЗ СДЭК (Родионова)", address: "г. Нижний Новгород, ул. Родионова, д. 190", location: { lat: 56.2982, lon: 43.9812 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "NN003", name: "ПВЗ СДЭК (Сормово)", address: "г. Нижний Новгород, ул. Коминтерна, д. 139", location: { lat: 56.3242, lon: 43.8724 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "NN004", name: "ПВЗ СДЭК (Автозавод)", address: "г. Нижний Новгород, пр. Ленина, д. 55", location: { lat: 56.2612, lon: 43.9012 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "NN005", name: "ПВЗ СДЭК (Канавинская)", address: "г. Нижний Новгород, ул. Канавинская, д. 2", location: { lat: 56.3282, lon: 43.9424 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["екатеринбург", "екб", "свердловск"],
    bounds: { latMin: 56.7, latMax: 57.0, lonMin: 60.4, lonMax: 60.7 },
    points: [
      { code: "EKB001", name: "ПВЗ СДЭК (Ленина)", address: "г. Екатеринбург, ул. Ленина, д. 52", location: { lat: 56.8389, lon: 60.6057 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "EKB002", name: "ПВЗ СДЭК (Малышева)", address: "г. Екатеринбург, ул. Малышева, д. 36", location: { lat: 56.8372, lon: 60.6124 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "EKB003", name: "ПВЗ СДЭК (Щорса)", address: "г. Екатеринбург, ул. Щорса, д. 80", location: { lat: 56.8512, lon: 60.5824 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "EKB004", name: "ПВЗ СДЭК (ВИЗ)", address: "г. Екатеринбург, ул. Кирова, д. 28", location: { lat: 56.8242, lon: 60.5924 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "EKB005", name: "ПВЗ СДЭК (Уралмаш)", address: "г. Екатеринбург, ул. 40-летия Октября, д. 15", location: { lat: 56.8892, lon: 60.6124 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["новосибирск", "новосиб"],
    bounds: { latMin: 54.9, latMax: 55.2, lonMin: 82.7, lonMax: 83.2 },
    points: [
      { code: "NSK001", name: "ПВЗ СДЭК (Красный проспект)", address: "г. Новосибирск, Красный пр., д. 77", location: { lat: 55.0302, lon: 82.9204 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "NSK002", name: "ПВЗ СДЭК (Ленина)", address: "г. Новосибирск, ул. Ленина, д. 52", location: { lat: 55.0282, lon: 82.9124 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "NSK003", name: "ПВЗ СДЭК (Гусинобродская)", address: "г. Новосибирск, ул. Гусинобродская, д. 21", location: { lat: 55.0824, lon: 82.9024 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "NSK004", name: "ПВЗ СДЭК (Площадь Маркса)", address: "г. Новосибирск, ул. Станиславского, д. 6", location: { lat: 55.0124, lon: 82.9424 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "NSK005", name: "ПВЗ СДЭК (Заельцовская)", address: "г. Новосибирск, ул. Дуси Ковальчук, д. 272", location: { lat: 55.0624, lon: 82.8724 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["самара", "самарск"],
    bounds: { latMin: 53.1, latMax: 53.3, lonMin: 50.0, lonMax: 50.4 },
    points: [
      { code: "SAM001", name: "ПВЗ СДЭК (Ленинградская)", address: "г. Самара, ул. Ленинградская, д. 75", location: { lat: 53.1952, lon: 50.1502 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "SAM002", name: "ПВЗ СДЭК (Мичурина)", address: "г. Самара, ул. Мичурина, д. 125", location: { lat: 53.2124, lon: 50.1824 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "SAM003", name: "ПВЗ СДЭК (Ново-Садовая)", address: "г. Самара, ул. Ново-Садовая, д. 160", location: { lat: 53.1982, lon: 50.2124 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "SAM004", name: "ПВЗ СДЭК (Победы)", address: "г. Самара, ул. Победы, д. 84", location: { lat: 53.1824, lon: 50.1024 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "SAM005", name: "ПВЗ СДЭК (Московское ш.)", address: "г. Самара, Московское ш., д. 17", location: { lat: 53.2124, lon: 50.2424 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["ростов", "ростов-на-дону", "ростов на дону"],
    bounds: { latMin: 47.1, latMax: 47.3, lonMin: 39.6, lonMax: 39.8 },
    points: [
      { code: "RND001", name: "ПВЗ СДЭК (Большая Садовая)", address: "г. Ростов-на-Дону, ул. Большая Садовая, д. 47", location: { lat: 47.2292, lon: 39.7224 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "RND002", name: "ПВЗ СДЭК (Ворошиловский)", address: "г. Ростов-на-Дону, пр. Ворошиловский, д. 28", location: { lat: 47.2382, lon: 39.7124 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "RND003", name: "ПВЗ СДЭК (Текучева)", address: "г. Ростов-на-Дону, ул. Текучева, д. 139", location: { lat: 47.2482, lon: 39.6824 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "RND004", name: "ПВЗ СДЭК (Западный)", address: "г. Ростов-на-Дону, ул. Малиновского, д. 34", location: { lat: 47.2124, lon: 39.6524 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "RND005", name: "ПВЗ СДЭК (Северный)", address: "г. Ростов-на-Дону, пр. Космонавтов, д. 2", location: { lat: 47.2624, lon: 39.7424 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["краснодар", "кубань"],
    bounds: { latMin: 44.9, latMax: 45.1, lonMin: 38.9, lonMax: 39.2 },
    points: [
      { code: "KRD001", name: "ПВЗ СДЭК (Красная)", address: "г. Краснодар, ул. Красная, д. 176", location: { lat: 45.0182, lon: 39.0024 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "KRD002", name: "ПВЗ СДЭК (Северная)", address: "г. Краснодар, ул. Северная, д. 326", location: { lat: 45.0582, lon: 39.0124 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "KRD003", name: "ПВЗ СДЭК (Уральская)", address: "г. Краснодар, ул. Уральская, д. 79", location: { lat: 45.0124, lon: 38.9624 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "KRD004", name: "ПВЗ СДЭК (Ставропольская)", address: "г. Краснодар, ул. Ставропольская, д. 210", location: { lat: 45.0424, lon: 38.9824 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "KRD005", name: "ПВЗ СДЭК (Пригородная)", address: "г. Краснодар, ул. Пригородная, д. 24", location: { lat: 44.9924, lon: 39.0224 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["воронеж", "воронежск"],
    bounds: { latMin: 51.6, latMax: 51.7, lonMin: 39.1, lonMax: 39.3 },
    points: [
      { code: "VRN001", name: "ПВЗ СДЭК (Плехановская)", address: "г. Воронеж, ул. Плехановская, д. 15", location: { lat: 51.6602, lon: 39.2024 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "VRN002", name: "ПВЗ СДЭК (Ленина)", address: "г. Воронеж, ул. Ленина, д. 73", location: { lat: 51.6682, lon: 39.1924 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "VRN003", name: "ПВЗ СДЭК (Московский пр.)", address: "г. Воронеж, Московский пр., д. 114", location: { lat: 51.6524, lon: 39.2124 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "VRN004", name: "ПВЗ СДЭК (Лизюкова)", address: "г. Воронеж, ул. Лизюкова, д. 24", location: { lat: 51.6724, lon: 39.1824 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "VRN005", name: "ПВЗ СДЭК (Остужева)", address: "г. Воронеж, ул. Остужева, д. 22", location: { lat: 51.6424, lon: 39.2224 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["уфа", "башкортостан", "башкирия"],
    bounds: { latMin: 54.6, latMax: 54.9, lonMin: 55.8, lonMax: 56.1 },
    points: [
      { code: "UFA001", name: "ПВЗ СДЭК (Ленина)", address: "г. Уфа, ул. Ленина, д. 28", location: { lat: 54.7352, lon: 55.9582 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "UFA002", name: "ПВЗ СДЭК (Цюрупы)", address: "г. Уфа, ул. Цюрупы, д. 84", location: { lat: 54.7282, lon: 55.9624 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "UFA003", name: "ПВЗ СДЭК (Менделеева)", address: "г. Уфа, ул. Менделеева, д. 134", location: { lat: 54.7524, lon: 55.9824 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "UFA004", name: "ПВЗ СДЭК (Революционная)", address: "г. Уфа, ул. Революционная, д. 61", location: { lat: 54.7224, lon: 55.9424 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "UFA005", name: "ПВЗ СДЭК (Софьи Перовской)", address: "г. Уфа, ул. Софьи Перовской, д. 42", location: { lat: 54.7424, lon: 55.9724 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["красноярск", "краснояр"],
    bounds: { latMin: 56.0, latMax: 56.1, lonMin: 92.8, lonMax: 93.2 },
    points: [
      { code: "KRS001", name: "ПВЗ СДЭК (Мира)", address: "г. Красноярск, ул. Мира, д. 55", location: { lat: 56.0152, lon: 92.8724 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "KRS002", name: "ПВЗ СДЭК (Ленина)", address: "г. Красноярск, ул. Ленина, д. 74", location: { lat: 56.0124, lon: 92.8624 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "KRS003", name: "ПВЗ СДЭК (Копылова)", address: "г. Красноярск, ул. Копылова, д. 72", location: { lat: 56.0324, lon: 92.9024 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "KRS004", name: "ПВЗ СДЭК (Свободный пр.)", address: "г. Красноярск, пр. Свободный, д. 48", location: { lat: 56.0424, lon: 92.9224 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "KRS005", name: "ПВЗ СДЭК (9 Мая)", address: "г. Красноярск, ул. 9 Мая, д. 58", location: { lat: 55.9924, lon: 92.8824 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["волгоград", "волгоградск"],
    bounds: { latMin: 48.6, latMax: 48.8, lonMin: 44.4, lonMax: 44.6 },
    points: [
      { code: "VOG001", name: "ПВЗ СДЭК (Площадь Ленина)", address: "г. Волгоград, ул. Комсомольская, д. 5", location: { lat: 48.7082, lon: 44.5124 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "VOG002", name: "ПВЗ СДЭК (Волгоградский пр.)", address: "г. Волгоград, Волгоградский пр., д. 42", location: { lat: 48.7124, lon: 44.5324 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "VOG003", name: "ПВЗ СДЭК (Краснооктябрьская)", address: "г. Волгоград, ул. 50 лет Октября, д. 14", location: { lat: 48.7224, lon: 44.5024 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "VOG004", name: "ПВЗ СДЭК (Дзержинский)", address: "г. Волгоград, ул. Ангарская, д. 13", location: { lat: 48.6924, lon: 44.4924 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "VOG005", name: "ПВЗ СДЭК (Ворошиловский)", address: "г. Волгоград, ул. Рабоче-Крестьянская, д. 18", location: { lat: 48.7024, lon: 44.5224 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["пермь", "пермск"],
    bounds: { latMin: 57.9, latMax: 58.1, lonMin: 55.9, lonMax: 56.3 },
    points: [
      { code: "PER001", name: "ПВЗ СДЭК (Ленина)", address: "г. Пермь, ул. Ленина, д. 58", location: { lat: 58.0102, lon: 56.2382 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "PER002", name: "ПВЗ СДЭК (Попова)", address: "г. Пермь, ул. Попова, д. 18", location: { lat: 58.0082, lon: 56.2524 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "PER003", name: "ПВЗ СДЭК (Комсомольский пр.)", address: "г. Пермь, Комсомольский пр., д. 45", location: { lat: 58.0224, lon: 56.2124 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "PER004", name: "ПВЗ СДЭК (Кирова)", address: "г. Пермь, ул. Кирова, д. 72", location: { lat: 57.9924, lon: 56.2424 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "PER005", name: "ПВЗ СДЭК (Уральская)", address: "г. Пермь, ул. Уральская, д. 93", location: { lat: 58.0124, lon: 56.2624 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
  {
    keys: ["саратов", "саратовск"],
    bounds: { latMin: 51.5, latMax: 51.6, lonMin: 45.9, lonMax: 46.1 },
    points: [
      { code: "SRT001", name: "ПВЗ СДЭК (Московская)", address: "г. Саратов, ул. Московская, д. 55", location: { lat: 51.5324, lon: 46.0024 }, work_time: "Пн-Вс 9:00–21:00" },
      { code: "SRT002", name: "ПВЗ СДЭК (Волжская)", address: "г. Саратов, ул. Волжская, д. 32", location: { lat: 51.5282, lon: 45.9924 }, work_time: "Пн-Пт 9:00–20:00" },
      { code: "SRT003", name: "ПВЗ СДЭК (им. Кирова)", address: "г. Саратов, пр. им. Кирова С.М., д. 52", location: { lat: 51.5424, lon: 46.0124 }, work_time: "Пн-Вс 10:00–20:00" },
      { code: "SRT004", name: "ПВЗ СДЭК (Астраханская)", address: "г. Саратов, ул. Астраханская, д. 88", location: { lat: 51.5224, lon: 46.0224 }, work_time: "Пн-Пт 9:00–19:00" },
      { code: "SRT005", name: "ПВЗ СДЭК (Танкистов)", address: "г. Саратов, ул. Танкистов, д. 15", location: { lat: 51.5524, lon: 45.9724 }, work_time: "Пн-Вс 9:00–21:00" },
    ],
  },
];

/** Города/населённые пункты Московской области — показываем московские ПВЗ как ближайшие */
const MOSCOW_REGION_CITY_KEYS = [
  "москва", "московск", "мск",
  "апрелевка", "балашиха", "подольск", "химки", "мытищи", "королёв", "люберцы",
  "серпухов", "ожерелье", "троицк", "щелково", "электросталь", "реутов", "долгопрудный",
  "видное", "домодедово", "раменское", "пушкино", "ивантеевка",
  "фрязино", "красногорск", "одинцово", "руза", "наро-фоминск", "зеленоград",
];

/** Если по городу ничего не пришло — подставляем тестовые точки по известным городам и областям */
export function getFallbackPvzForCity(cityName: string): CdekPvzPoint[] {
  const name = (cityName || "").toLowerCase();
  if (name.includes("апрелевка")) {
    return [...FALLBACK_CDEK_POINTS_APRELEVKA, ...FALLBACK_CDEK_POINTS_MOSCOW];
  }
  const isMoscowRegion = MOSCOW_REGION_CITY_KEYS.some((key) => name.includes(key));
  if (isMoscowRegion) {
    return [...FALLBACK_CDEK_POINTS_MOSCOW];
  }
  if (
    name.includes("санкт-петербург") ||
    name.includes("петербург") ||
    name.includes("спб") ||
    name.includes("ленинград")
  ) {
    return [...FALLBACK_CDEK_POINTS_SPB];
  }
  for (const region of FALLBACK_CDEK_BY_REGION) {
    if (region.keys.some((key) => name.includes(key))) {
      return [...region.points];
    }
  }
  return [];
}

/** Границы Апрелевки (чтобы по координатам отдавать точки именно в городе) */
const APRELEVKA_BOUNDS = {
  latMin: 55.51,
  latMax: 55.56,
  lonMin: 37.02,
  lonMax: 37.12,
};

/** Примерные границы Москвы и Подмосковья */
const MOSCOW_REGION_BOUNDS = {
  latMin: 55.4,
  latMax: 56.1,
  lonMin: 36.8,
  lonMax: 38.2,
};

/** Примерные границы Санкт-Петербурга и области */
const SPB_REGION_BOUNDS = {
  latMin: 59.7,
  latMax: 60.2,
  lonMin: 29.6,
  lonMax: 30.8,
};

/** Fallback по координатам: по границам региона подставляем точки (Апрелевка, Москва, СПб и др.) */
export function getFallbackPvzByCoords(
  lat: number,
  lon: number
): CdekPvzPoint[] {
  const inAprelevka =
    lat >= APRELEVKA_BOUNDS.latMin &&
    lat <= APRELEVKA_BOUNDS.latMax &&
    lon >= APRELEVKA_BOUNDS.lonMin &&
    lon <= APRELEVKA_BOUNDS.lonMax;
  if (inAprelevka) return [...FALLBACK_CDEK_POINTS_APRELEVKA, ...FALLBACK_CDEK_POINTS_MOSCOW];
  const inMoscow =
    lat >= MOSCOW_REGION_BOUNDS.latMin &&
    lat <= MOSCOW_REGION_BOUNDS.latMax &&
    lon >= MOSCOW_REGION_BOUNDS.lonMin &&
    lon <= MOSCOW_REGION_BOUNDS.lonMax;
  if (inMoscow) return [...FALLBACK_CDEK_POINTS_MOSCOW];
  const inSpb =
    lat >= SPB_REGION_BOUNDS.latMin &&
    lat <= SPB_REGION_BOUNDS.latMax &&
    lon >= SPB_REGION_BOUNDS.lonMin &&
    lon <= SPB_REGION_BOUNDS.lonMax;
  if (inSpb) return [...FALLBACK_CDEK_POINTS_SPB];
  for (const region of FALLBACK_CDEK_BY_REGION) {
    const b = region.bounds;
    if (lat >= b.latMin && lat <= b.latMax && lon >= b.lonMin && lon <= b.lonMax) {
      return [...region.points];
    }
  }
  return [];
}
