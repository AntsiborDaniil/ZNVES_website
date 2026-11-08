import { afterEach, expect, it, vi } from "vitest";
vi.mock("../../../lib/useMocks", () => ({ shouldUseMocks: () => false }));
import { loginUser, changePasswordWithResetToken } from "../authApi";

afterEach(() => vi.unstubAllGlobals());

it("sends login and reset to the same-origin BFF without exposing CSRF bootstrap", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response("{}"));
  vi.stubGlobal("fetch", fetchMock);
  await loginUser({ email: "test@example.com", password: "password" });
  await changePasswordWithResetToken("new-password");
  expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
    "/api/shop/auth/login/", "/api/shop/auth/password-reset/change/",
  ]);
  for (const [, init] of fetchMock.mock.calls) {
    expect(init.credentials).toBe("include");
    expect(init.headers).not.toHaveProperty("X-CSRFToken");
  }
});

it("preserves BFF CSRF errors for the form", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ detail: "CSRF Failed" }), { status: 403 }));
  vi.stubGlobal("fetch", fetchMock);
  await expect(loginUser({ email: "test@example.com", password: "password" })).rejects.toThrow("CSRF Failed");
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
