import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearCdekTokenCache,
  getCachedCdekToken,
  getCdekCredentials,
} from "../cdekAuth";

describe("cdekAuth", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    clearCdekTokenCache();
    process.env = {
      ...originalEnv,
      CDEK_ACCOUNT: "test-account",
      CDEK_SECURE_PASSWORD: "test-secret",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ access_token: "tok-1", expires_in: 3600 }),
        text: async () => "",
      })
    );
  });

  afterEach(() => {
    process.env = originalEnv;
    clearCdekTokenCache();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("reads credentials from env", () => {
    expect(getCdekCredentials()).toEqual({
      clientId: "test-account",
      clientSecret: "test-secret",
    });
  });

  it("caches OAuth token across calls", async () => {
    const token1 = await getCachedCdekToken();
    const token2 = await getCachedCdekToken();
    expect(token1).toBe("tok-1");
    expect(token2).toBe("tok-1");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("dedupes concurrent token requests", async () => {
    const [a, b] = await Promise.all([getCachedCdekToken(), getCachedCdekToken()]);
    expect(a).toBe("tok-1");
    expect(b).toBe("tok-1");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
