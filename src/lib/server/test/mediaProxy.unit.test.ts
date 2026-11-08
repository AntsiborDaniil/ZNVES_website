// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { NextRequest } from "next/server";
import { proxyMedia } from "../mediaProxy";
afterEach(() => vi.unstubAllGlobals());
const request = () => new NextRequest("https://znves.ru/api/media/products/photo.jpg", { headers: { Cookie: "access-token=private", Authorization: "Bearer private" } });
it("streams a public image without forwarding session cookies or authorization", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(new Uint8Array([1, 2, 3]), { headers: { "Content-Type": "image/jpeg", ETag: '"photo"' } }));
  vi.stubGlobal("fetch", fetchMock);
  const response = await proxyMedia(request(), ["products", "photo.jpg"]);
  expect(response.status).toBe(200);
  expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1, 2, 3]));
  expect(String(fetchMock.mock.calls[0][0])).toBe("https://api.znves.ru/media/products/photo.jpg");
  expect(fetchMock.mock.calls[0][1].headers.get("Cookie")).toBeNull();
  expect(fetchMock.mock.calls[0][1].headers.get("Authorization")).toBeNull();
  expect(response.headers.get("Cache-Control")).toContain("public");
});
it.each([["..", "photo.jpg"], ["https:", "evil.example", "photo.jpg"], ["x%2f..", "photo.jpg"], ["file.svg"]])("rejects unapproved paths before any upstream call: %j", async (...path) => {
  const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
  const response = await proxyMedia(request(), path);
  expect(response.status).toBe(404); expect(fetchMock).not.toHaveBeenCalled();
});
it("rejects HTML errors disguised as image responses", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<html>error</html>", { headers: { "Content-Type": "text/html" } })));
  expect((await proxyMedia(request(), ["photo.jpg"])).status).toBe(502);
});
it("does not follow upstream redirects", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 302, headers: { Location: "https://evil.example/photo.jpg" } })));
  expect((await proxyMedia(request(), ["photo.jpg"])).status).toBe(502);
});
