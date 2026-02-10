/**
 * Утилиты для отображения ПВЗ на карте:
 * - уровни зума (Далеко / Средне / Близко)
 * - кластеризация по зумам
 * - сетка 50×50 px: одна точка на ячейку с приоритетом непопулярные / типы / график
 */

export type MapBounds = [[number, number], [number, number]];

export type PvzLike = {
  location: { lat: number; lon: number };
  work_time?: string;
  code?: string;
  id?: string;
  name?: string;
  address?: string;
  type?: "postamat" | "pickup" | "courier";
};

/** Варианты зума: Далеко (1–9), Средне (10–13), Близко (14+) */
export function getZoomKind(zoom: number): "far" | "medium" | "close" {
  if (zoom <= 9) return "far";
  if (zoom <= 13) return "medium";
  return "close";
}

/** Оценка удобства графика: выше = удобнее (ежедневно, длинные часы) */
export function scheduleScore(workTime: string | undefined): number {
  if (!workTime || !workTime.trim()) return 0;
  const w = workTime.toLowerCase();
  let score = 0;
  if (w.includes("вс") || w.includes("воскрес") || w.includes("ежедневно") || w.includes("пн-вс")) score += 2;
  if (w.includes("пн-пт") || w.includes("будни")) score += 1;
  if (w.includes("9:00") || w.includes("8:00")) score += 1;
  if (w.includes("21:00") || w.includes("22:00") || w.includes("20:00")) score += 1;
  return score;
}

/** Индекс типа для чередования (постаматы, пункты выдачи, курьерские) */
function typeIndex(p: PvzLike): number {
  const t = (p as any).type;
  if (t === "postamat") return 0;
  if (t === "pickup") return 1;
  if (t === "courier") return 2;
  return 1; // default pickup
}

/** Координаты точки */
function getCoords(p: PvzLike): { lat: number; lon: number } | null {
  const loc = p.location;
  if (!loc) return null;
  const lat = (loc as any).lat ?? (loc as any).latitude;
  const lon = (loc as any).lon ?? (loc as any).longitude;
  if (typeof lat !== "number" || typeof lon !== "number") return null;
  return { lat, lon };
}

/** Кластер: центр и список точек */
export type Cluster = {
  id: string;
  centerLat: number;
  centerLon: number;
  points: PvzLike[];
};

/**
 * Строит кластеры по видимой области: сетка в градусах в зависимости от зума.
 * Far: крупная сетка, Medium: средняя, Close: мелкая (для логики «показать все по клику»).
 */
export function buildClusters(
  points: PvzLike[],
  bounds: MapBounds,
  zoom: number
): Cluster[] {
  const [[south, west], [north, east]] = bounds;
  const zoomKind = getZoomKind(zoom);
  // размер ячейки в градусах: при малом зуме — крупные ячейки
  const latSpan = north - south;
  const lonSpan = east - west;
  const gridCells = zoomKind === "far" ? 8 : zoomKind === "medium" ? 16 : 32;
  const cellLat = latSpan / gridCells;
  const cellLon = lonSpan / gridCells;

  const cellMap = new Map<string, PvzLike[]>();
  for (const p of points) {
    const c = getCoords(p);
    if (!c) continue;
    if (c.lat < south || c.lat > north || c.lon < west || c.lon > east) continue;
    const gx = Math.min(Math.floor((c.lon - west) / cellLon), gridCells - 1);
    const gy = Math.min(Math.floor((c.lat - south) / cellLat), gridCells - 1);
    const key = `${gy}_${gx}`;
    if (!cellMap.has(key)) cellMap.set(key, []);
    cellMap.get(key)!.push(p);
  }

  const clusters: Cluster[] = [];
  cellMap.forEach((pts, key) => {
    if (pts.length === 0) return;
    const [gy, gx] = key.split("_").map(Number);
    const centerLat = south + (gy + 0.5) * cellLat;
    const centerLon = west + (gx + 0.5) * cellLon;
    clusters.push({
      id: `cluster_${key}`,
      centerLat,
      centerLon,
      points: pts,
    });
  });
  return clusters;
}

/**
 * Делит видимую область на сетку 50×50 пикселей.
 * В каждой ячейке оставляет одну точку: приоритет — непопулярные (по индексу), чередование типов, удобный график.
 */
export function pickOnePerGridCell(
  points: PvzLike[],
  bounds: MapBounds,
  mapWidthPx: number,
  mapHeightPx: number,
  cellSizePx: number = 50
): PvzLike[] {
  const [[south, west], [north, east]] = bounds;
  const latSpan = north - south;
  const lonSpan = east - west;
  const numCellsX = Math.max(1, Math.ceil(mapWidthPx / cellSizePx));
  const numCellsY = Math.max(1, Math.ceil(mapHeightPx / cellSizePx));
  const cellLat = latSpan / numCellsY;
  const cellLon = lonSpan / numCellsX;

  const cellToPoints = new Map<string, PvzLike[]>();
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const c = getCoords(p);
    if (!c) continue;
    if (c.lat < south || c.lat > north || c.lon < west || c.lon > east) continue;
    const gx = Math.min(Math.floor((c.lon - west) / cellLon), numCellsX - 1);
    const gy = Math.min(Math.floor((c.lat - south) / cellLat), numCellsY - 1);
    const key = `${gy}_${gx}`;
    if (!cellToPoints.has(key)) cellToPoints.set(key, []);
    cellToPoints.get(key)!.push(p);
  }

  const result: PvzLike[] = [];
  cellToPoints.forEach((pts) => {
    if (pts.length === 0) return;
    // Сортируем: сначала по удобству графика (выше score — выше), затем по типу (чередуем), затем по id/code (непопулярные — позже в списке даём шанс)
    const sorted = [...pts].sort((a, b) => {
      const scoreA = scheduleScore(a.work_time);
      const scoreB = scheduleScore(b.work_time);
      if (scoreB !== scoreA) return scoreB - scoreA; // удобный график первым
      const typeA = typeIndex(a);
      const typeB = typeIndex(b);
      if (typeA !== typeB) return typeA - typeB;
      const idA = (a as any).code ?? (a as any).id ?? "";
      const idB = (b as any).code ?? (b as any).id ?? "";
      return idA.localeCompare(idB);
    });
    result.push(sorted[0]);
  });
  return result;
}

/** Фильтр точек по bounds */
export function filterPointsByBounds<T extends PvzLike>(points: T[], bounds: MapBounds): T[] {
  const [[south, west], [north, east]] = bounds;
  return points.filter((p) => {
    const c = getCoords(p);
    if (!c) return false;
    return c.lat >= south && c.lat <= north && c.lon >= west && c.lon <= east;
  });
}
