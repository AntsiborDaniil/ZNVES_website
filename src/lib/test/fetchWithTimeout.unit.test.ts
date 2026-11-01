import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithTimeout } from "../fetchWithTimeout";

describe("fetchWithTimeout", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("resolves when fetch succeeds before timeout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }))
    );

    const res = await fetchWithTimeout("/api/test", { timeoutMs: 5_000 });
    expect(res.ok).toBe(true);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("aborts when timeout elapses", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: RequestInfo | URL, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new DOMException("Aborted", "AbortError"));
            });
          })
      )
    );

    const promise = fetchWithTimeout("/api/slow", { timeoutMs: 1_000 });
    const assertion = expect(promise).rejects.toMatchObject({ name: "AbortError" });
    await vi.advanceTimersByTimeAsync(1_000);
    await assertion;
  });

  it("does not throw when AbortSignal.timeout is missing", async () => {
    const original = AbortSignal.timeout;
    // @ts-expect-error force missing API like old Safari
    AbortSignal.timeout = undefined;

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("[]", { status: 200 }))
    );

    try {
      const res = await fetchWithTimeout("/api/catalog/", { timeoutMs: 5_000 });
      expect(res.status).toBe(200);
    } finally {
      AbortSignal.timeout = original;
    }
  });
});
