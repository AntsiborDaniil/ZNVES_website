export type UnknownRecord = Record<string, unknown>;

export function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as UnknownRecord;
}

export function readNumber(record: UnknownRecord, ...keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number") {
      return value;
    }
  }
  return undefined;
}

export function readString(record: UnknownRecord, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return undefined;
}

export function readArray(record: UnknownRecord, ...keys: string[]): unknown[] {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value;
    }
  }
  return [];
}

export function parseLatLonFromUnknown(loc: unknown): { lat: number; lon: number } | null {
  const record = asRecord(loc);
  if (!record) return null;
  const nested = asRecord(record.coordinates) ?? asRecord(record.coords);
  const lat =
    readNumber(record, "lat", "latitude") ??
    (nested ? readNumber(nested, "lat", "latitude") : undefined);
  const lon =
    readNumber(record, "lon", "lng", "longitude") ??
    (nested ? readNumber(nested, "lon", "lng", "longitude") : undefined);
  if (lat === undefined || lon === undefined) return null;
  return { lat, lon };
}
