import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("../useMocks", () => ({ shouldUseMocks: () => false }));
import { publicApiUrl, fetchPublicApi } from "../publicApi";
import { resolveApiImageUrl } from "../imageUrl";
afterEach(() => vi.unstubAllGlobals());
describe("public BFF transport", () => {
  it("routes catalog, filter, product and color reads to Next while preserving queries", () => {
    for (const path of ["catalog/", "catalog/categories/", "catalog/TSHIRTS/", "catalog/TSHIRTS/WHITE/", "home/"]) {
      expect(publicApiUrl(`https://api.znves.ru/api/${path}?page=2`)).toBe(`/api/shop/${path.replace(/\/$/, "")}?page=2`);
    }
  });
  it("keeps public SSR direct and leaves unrelated destinations unchanged", () => {
    expect(publicApiUrl("https://external.example/api/catalog/")).toBe("https://external.example/api/catalog/");
    vi.stubGlobal("window", undefined);
    expect(publicApiUrl("https://api.znves.ru/api/catalog/")).toBe("https://api.znves.ru/api/catalog/");
  });
  it("does not add a JSON Content-Type to public GET requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("[]"));
    vi.stubGlobal("fetch", fetchMock);
    await fetchPublicApi("https://api.znves.ru/api/catalog/", { headers: { "Content-Type": "application/json" } });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/shop/catalog");
    expect((fetchMock.mock.calls[0][1].headers as Headers).has("Content-Type")).toBe(false);
  });
  it("rewrites backend images in both SSR and browser DTOs without proxying arbitrary hosts", () => {
    expect(resolveApiImageUrl("/media/products/photo.JPG", "https://api.znves.ru")).toBe("/api/media/products/photo.JPG");
    expect(resolveApiImageUrl("https://api.znves.ru/media/products/photo.JPG", "https://api.znves.ru")).toBe("/api/media/products/photo.JPG");
    expect(resolveApiImageUrl("/images/mock.jpg", "https://api.znves.ru")).toBe("/images/mock.jpg");
    expect(resolveApiImageUrl("https://other.example/photo.jpg", "https://api.znves.ru")).toBe("https://other.example/photo.jpg");
  });
});
