import { describe, expect, it } from "vitest";
import { getFallbackPvzForCity } from "../../api/delivery/cdekApi";
import { resolveApiImageUrl } from "../../lib/imageUrl";
import { getMockApiBase } from "../config";

describe("resolveApiImageUrl", () => {
  it("keeps local public images relative", () => {
    expect(resolveApiImageUrl("/images/catalogs/voyage.png", "https://api.znves.ru")).toBe(
      "/images/catalogs/voyage.png"
    );
  });

  it("prepends API base for backend media paths", () => {
    expect(resolveApiImageUrl("/media/product.jpg", "https://api.znves.ru")).toBe(
      "https://api.znves.ru/media/product.jpg"
    );
  });
});

describe("delivery mock handlers", () => {
  it("returns fallback PVZ for Moscow", async () => {
    const res = await fetch("/api/cdek/pvz?city=Москва");
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns mock delivery config", async () => {
    const res = await fetch("/api/delivery/config");
    expect(res.ok).toBe(true);
    const data = (await res.json()) as { cdekConfigured?: boolean };
    expect(data.cdekConfigured).toBe(true);
  });

  it("returns mock CDEK calculate response", async () => {
    const res = await fetch("/api/cdek/calculate?city=Москва&weight_grams=250");
    expect(res.ok).toBe(true);
    const data = (await res.json()) as { price?: number };
    expect(data.price).toBeGreaterThan(0);
  });

  it("uses same fallback data as cdekApi helper", () => {
    const fallback = getFallbackPvzForCity("Москва");
    expect(fallback[0]?.code).toBeTruthy();
    expect(getMockApiBase()).toContain("api.znves.ru");
  });
});
