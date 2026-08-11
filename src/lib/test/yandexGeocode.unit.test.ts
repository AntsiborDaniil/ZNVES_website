import { describe, expect, it, vi } from "vitest";
import { logUpstreamError, logUpstreamHttpError } from "../upstreamLog";
import { parseYandexPointPos } from "../yandexGeocode";

describe("parseYandexPointPos", () => {
  it("parses lon lat order from Yandex Point.pos", () => {
    expect(parseYandexPointPos("37.6173 55.7558")).toEqual({
      lon: 37.6173,
      lat: 55.7558,
    });
  });

  it("returns null for invalid input", () => {
    expect(parseYandexPointPos("")).toBeNull();
    expect(parseYandexPointPos("37.6")).toBeNull();
    expect(parseYandexPointPos("a b")).toBeNull();
  });
});

describe("upstreamLog", () => {
  it("logs structured upstream errors", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    logUpstreamError("test/scope", new Error("boom"), { city: "Москва" });
    expect(spy).toHaveBeenCalledWith(
      "[upstream:test/scope]",
      expect.objectContaining({ scope: "test/scope", message: "boom", city: "Москва" })
    );
    spy.mockRestore();
  });

  it("logs http status errors", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    logUpstreamHttpError("test/http", 502, "bad gateway");
    expect(spy).toHaveBeenCalledWith(
      "[upstream:test/http]",
      expect.objectContaining({ status: 502, body: "bad gateway" })
    );
    spy.mockRestore();
  });
});
