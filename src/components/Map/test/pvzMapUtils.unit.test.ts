import { describe, expect, it } from "vitest";
import {
  buildClusters,
  filterPointsByBounds,
  getZoomKind,
  pickOnePerGridCell,
  scheduleScore,
  type PvzLike,
} from "../pvzMapUtils";

const bounds: [[number, number], [number, number]] = [
  [55.7, 37.5],
  [55.8, 37.7],
];

const points: PvzLike[] = [
  {
    code: "A",
    type: "pickup",
    work_time: "Пн-Вс 9:00–21:00",
    address: "A",
    location: { lat: 55.75, lon: 37.6 },
  },
  {
    code: "B",
    type: "postamat",
    work_time: "Пн-Пт 9:00–18:00",
    address: "B",
    location: { lat: 55.751, lon: 37.601 },
  },
  {
    code: "C",
    type: "courier",
    work_time: "Пн-Вс 10:00–20:00",
    address: "C",
    location: { lat: 55.79, lon: 37.69 },
  },
];

describe("getZoomKind", () => {
  it("maps zoom levels to far, medium and close", () => {
    expect(getZoomKind(8)).toBe("far");
    expect(getZoomKind(12)).toBe("medium");
    expect(getZoomKind(15)).toBe("close");
  });
});

describe("scheduleScore", () => {
  it("scores convenient schedules higher", () => {
    expect(scheduleScore("Пн-Вс 9:00–21:00")).toBeGreaterThan(
      scheduleScore("Пн-Пт 9:00–18:00")
    );
    expect(scheduleScore(undefined)).toBe(0);
  });
});

describe("buildClusters", () => {
  it("groups nearby points into clusters", () => {
    const clusters = buildClusters(points, bounds, 10);
    expect(clusters.length).toBeGreaterThan(0);
    expect(clusters.some((cluster) => cluster.points.length >= 2)).toBe(true);
  });

  it("ignores points outside bounds", () => {
    const outside: PvzLike = {
      code: "OUT",
      location: { lat: 56.5, lon: 38.0 },
    };
    const clusters = buildClusters([outside], bounds, 10);
    expect(clusters).toHaveLength(0);
  });
});

describe("pickOnePerGridCell", () => {
  it("returns one point per grid cell", () => {
    const picked = pickOnePerGridCell(points, bounds, 500, 500, 50);
    expect(picked.length).toBeGreaterThan(0);
    expect(picked.length).toBeLessThanOrEqual(points.length);
  });
});

describe("filterPointsByBounds", () => {
  it("keeps only points inside visible bounds", () => {
    const filtered = filterPointsByBounds(points, bounds);
    expect(filtered.map((point) => point.code)).toEqual(["A", "B", "C"]);
  });
});
