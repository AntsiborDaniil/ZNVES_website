import { afterEach, describe, expect, it, vi } from "vitest";
import { getAddressSuggestions } from "../addressSuggestApi";

describe("getAddressSuggestions", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns empty for short query without fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await getAddressSuggestions("а")).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("passes AbortSignal to fetch", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        suggestions: [{ displayName: "Москва", value: "Москва" }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const ac = new AbortController();
    const list = await getAddressSuggestions("Москва Твер", ac.signal);

    expect(list).toEqual([{ displayName: "Москва", value: "Москва" }]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/address-suggest?"),
      expect.objectContaining({ signal: ac.signal })
    );
  });

  it("propagates abort", async () => {
    const ac = new AbortController();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            const err = new Error("Aborted");
            err.name = "AbortError";
            reject(err);
          });
        });
      })
    );

    const pending = getAddressSuggestions("Москва", ac.signal);
    ac.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  });
});
