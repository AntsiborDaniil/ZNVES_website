import { afterEach, expect, it, vi } from "vitest";
vi.mock("../../../lib/useMocks", () => ({ shouldUseMocks: () => false }));
import { loginUser, changePasswordWithResetToken } from "../authApi";

afterEach(() => vi.unstubAllGlobals());

it("bootstraps API CSRF before login and fetches a fresh token before password reset", async () => {
  let generation = 0;
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input).endsWith("/api/order/csrf/")) {
      generation++;
      expect(init?.credentials).toBe("include");
      expect(init?.cache).toBe("no-store");
      return new Response(JSON.stringify({ csrfToken: `token-${generation}` }));
    }
    expect(init?.headers).toMatchObject({ "X-CSRFToken": `token-${generation}` });
    expect(init?.credentials).toBe("include");
    return new Response("{}");
  });
  vi.stubGlobal("fetch", fetchMock);
  await loginUser({ email: "test@example.com", password: "password" });
  await changePasswordWithResetToken("new-password");
  expect(fetchMock.mock.calls.map(([url]) => String(url).split("/api/")[1])).toEqual([
    "order/csrf/", "auth/login/", "order/csrf/", "auth/password-reset/change/",
  ]);
});

it("does not submit credentials when CSRF bootstrap fails", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 503 }));
  vi.stubGlobal("fetch", fetchMock);
  await expect(loginUser({ email: "test@example.com", password: "password" })).rejects.toThrow();
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
