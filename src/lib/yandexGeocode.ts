/**
 * Yandex Geocoder returns Point.pos as "lon lat" (longitude first).
 */

export type LatLon = { lat: number; lon: number };

export function parseYandexPointPos(pos: string): LatLon | null {
  const parts = pos.trim().split(/\s+/);
  if (parts.length < 2) return null;
  const lon = parseFloat(parts[0]);
  const lat = parseFloat(parts[1]);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  return { lat, lon };
}
