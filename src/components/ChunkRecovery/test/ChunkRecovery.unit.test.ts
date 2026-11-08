import { describe, expect, it, vi } from "vitest";
import { CHUNK_RECOVERY_SCRIPT } from "../ChunkRecovery";

function fixture(stored: string | null = null) {
  const listeners: Record<string, (event: unknown) => void> = {};
  const window = {
    sessionStorage: { getItem: vi.fn(() => stored), setItem: vi.fn() },
    location: { href: "https://znves.ru/catalog?category=shirts#item", replace: vi.fn() },
    addEventListener: vi.fn((name: string, cb: (event: unknown) => void) => { listeners[name] = cb; }),
  };
  new Function("window", CHUNK_RECOVERY_SCRIPT)(window);
  return { window, listeners };
}

describe("stale chunk recovery", () => {
  it("reloads fresh HTML once while preserving route and existing query", () => {
    const { window, listeners } = fixture();
    listeners.error({ target: { tagName: "SCRIPT", src: "https://znves.ru/_next/static/chunks/old.js" } });
    listeners.unhandledrejection({ reason: new Error("Loading chunk 9278 failed") });
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    const target = new URL(window.location.replace.mock.calls[0][0]);
    expect(target.pathname).toBe("/catalog");
    expect(target.searchParams.get("category")).toBe("shirts");
    expect(target.searchParams.has("__znves_reload")).toBe(true);
    expect(target.hash).toBe("#item");
  });
  it("does not create a refresh loop if fresh HTML also cannot load", () => {
    const { window, listeners } = fixture(String(Date.now()));
    listeners.unhandledrejection({ reason: new Error("ChunkLoadError") });
    expect(window.location.replace).not.toHaveBeenCalled();
  });
  it("ignores ordinary application errors and image load failures", () => {
    const { window, listeners } = fixture();
    listeners.error({ target: { tagName: "IMG", src: "https://znves.ru/image.png" } });
    listeners.unhandledrejection({ reason: new Error("Validation failed") });
    expect(window.location.replace).not.toHaveBeenCalled();
  });
});
