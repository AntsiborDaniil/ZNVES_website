import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CdekPvzPoint } from "../cdekApi";

const getCdekPvzByCity = vi.fn();

vi.mock("../cdekApi", async () => {
  const actual = await vi.importActual<typeof import("../cdekApi")>("../cdekApi");
  return {
    ...actual,
    getCdekPvzByCity: (...args: unknown[]) => getCdekPvzByCity(...args),
  };
});

import { getRegionPvzCdek } from "../pvzRegionCache";

const mockPoints: CdekPvzPoint[] = [
  {
    code: "MSK1",
    name: "ПВЗ",
    address: "Москва, Тверская 1",
    location: { lat: 55.75, lon: 37.61 },
    work_time: "10-20",
  },
];

describe("getRegionPvzCdek", () => {
  beforeEach(() => {
    getCdekPvzByCity.mockReset();
    getCdekPvzByCity.mockResolvedValue(mockPoints);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("fetches once and serves from sessionStorage on repeat", async () => {
    const first = await getRegionPvzCdek("Москва");
    const second = await getRegionPvzCdek("Москва");

    expect(first).toEqual(mockPoints);
    expect(second).toEqual(mockPoints);
    expect(getCdekPvzByCity).toHaveBeenCalledTimes(1);
    expect(getCdekPvzByCity).toHaveBeenCalledWith("Москва", undefined);
  });

  it("fetches again for a different city", async () => {
    await getRegionPvzCdek("Москва");
    getCdekPvzByCity.mockResolvedValueOnce([]);
    await getRegionPvzCdek("Санкт-Петербург");
    expect(getCdekPvzByCity).toHaveBeenCalledTimes(2);
  });
});
