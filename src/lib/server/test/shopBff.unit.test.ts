// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { NextRequest } from "next/server";
import { checkoutShopRequest, isAllowedPaymentUrl, isAllowedShopPath, proxyShopRequest, readGuestAccess, relayCookie, sealGuestAccess } from "../shopBff";
const origin = "https://znves.ru";
const request = (path: string, body = {}, cookie?: string, requestOrigin = origin) => new NextRequest(`${origin}/api/shop/${path}`, { method: "POST", headers: { Origin: requestOrigin, "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) });
const json = (value: unknown, status = 200, cookie?: string) => new Response(JSON.stringify(value), { status, headers: cookie ? { "Set-Cookie": cookie } : {} });
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("shop BFF", () => {
  it.each(["auth/user", "auth/user/"])("canonicalizes slashless browser path before calling Django: %s", async (path) => {
    const fetchMock = vi.fn().mockResolvedValue(json({ detail: "Unauthorized" }, 401));
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(new NextRequest(`${origin}/api/shop/${path}?test=1`), ["auth", "user"]);
    expect(String(fetchMock.mock.calls[0][0])).toMatch(/\/api\/auth\/user\/\?test=1$/);
    expect(response.status).toBe(401);
  });
  it("posts login to the Django slash endpoint instead of returning its redirect", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ csrfToken: "csrf" })).mockResolvedValueOnce(json({ detail: "Code sent" }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("auth/login", { email: "user@outlook.com", password: "test-password" }), ["auth", "login"]);
    expect(response.status).toBe(200);
    expect(String(fetchMock.mock.calls[1][0])).toMatch(/\/api\/auth\/login\/$/);
    expect(fetchMock.mock.calls[1][1].method).toBe("POST");
  });
  it.each(["user@gmail.com", "USER@GOOGLEMAIL.COM"])("rejects Gmail at BFF before sending credentials upstream: %s", async (email) => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("auth/login", { email }), ["auth", "login"]);
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates HTTPS payment hostnames and rejects lookalike hosts", () => {
    expect(isAllowedPaymentUrl("https://yoomoney.ru/checkout/payments/v2/contract?orderId=1")).toBe(true);
    expect(isAllowedPaymentUrl("https://checkout.pay.yandex.ru/pay")).toBe(true);
    expect(isAllowedPaymentUrl("http://yookassa.ru/pay")).toBe(false);
    expect(isAllowedPaymentUrl("https://yookassa.ru.evil.example/pay")).toBe(false);
    expect(isAllowedPaymentUrl("https://user:secret@yookassa.ru/pay")).toBe(false);
  });
  it("preserves reset verification cookie for the next password-change request", async () => {
    const first = vi.fn().mockResolvedValueOnce(json({ csrfToken: "a" })).mockResolvedValueOnce(json({ detail: "verified" }, 200, "access-token=reset-jwt; Domain=api.znves.ru; HttpOnly; Max-Age=300"));
    vi.stubGlobal("fetch", first);
    const verified = await proxyShopRequest(request("auth/password-reset/verify/"), ["auth", "password-reset", "verify"]);
    expect(verified.headers.get("set-cookie")).toContain("access-token=reset-jwt");
    const second = vi.fn().mockResolvedValueOnce(json({ csrfToken: "b" })).mockResolvedValueOnce(json({ detail: "changed" }, 200, "access-token=; Max-Age=0"));
    vi.stubGlobal("fetch", second);
    await proxyShopRequest(request("auth/password-reset/change/", { new_password: "new-password" }, "access-token=reset-jwt"), ["auth", "password-reset", "change"]);
    expect((second.mock.calls[1][1].headers as Headers).get("Cookie")).toContain("access-token=reset-jwt");
  });
  it("normalizes 205 logout while relaying cookie deletion", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ csrfToken: "a" })).mockResolvedValueOnce(new Response(null, { status: 205, headers: { "Set-Cookie": "access-token=; Max-Age=0; Path=/" } }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("auth/logout/"), ["auth", "logout"]);
    expect(response.status).toBe(200); expect(await response.json()).toEqual({});
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
  });
  it("replaces external return destinations before sending payment upstream", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ csrfToken: "a" })).mockResolvedValueOnce(json({ confirmation_url: "https://yookassa.ru/pay" }, 201));
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("order/123/pay/", { return_url: "https://evil.example", cancel_url: "https://evil.example" }), ["order", "123", "pay"]);
    expect(response.status).toBe(201);
    const payload = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(new URL(payload.return_url).origin).toBe(origin);
    expect(new URL(payload.cancel_url).origin).toBe(origin);
  });

  it("requires a stable encryption secret in production before creating any upstream order", async () => {
    vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("BFF_SESSION_SECRET", "");
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("order/"), ["order"]);
    expect(response.status).toBe(502); expect(fetchMock).not.toHaveBeenCalled();
  });
  it("restricts routes and methods", () => {
    expect(isAllowedShopPath("auth/login/", "POST")).toBe(true);
    expect(isAllowedShopPath("order/123/pay/", "POST")).toBe(true);
    expect(isAllowedShopPath("ordering/admin/", "GET")).toBe(false);
    expect(isAllowedShopPath("order/123/refund/", "POST")).toBe(false);
    expect(isAllowedShopPath("auth/login/", "GET")).toBe(false);
  });
  it("authenticates encrypted capabilities and binds them to one order", () => {
    const value = sealGuestAccess("123", "private-token");
    expect(value).not.toContain("private-token");
    expect(readGuestAccess("123", value)).toBe("private-token");
    expect(readGuestAccess("456", value)).toBeNull();
    expect(readGuestAccess("123", `x${value}`)).toBeNull();
  });
  it("rewrites cookie scope, preserves expiry and makes cookie HttpOnly", () => {
    const value = relayCookie("access-token=jwt; Domain=api.znves.ru; Path=/api; Max-Age=60; Secure; SameSite=None", true);
    expect(value).toContain("Max-Age=60");
    expect(value).toContain("Path=/; HttpOnly; SameSite=Lax; Secure");
    expect(value).not.toContain("Domain=");
    expect(relayCookie("access-token=; Max-Age=0", false)).toContain("Max-Age=0");
  });
  it("rejects foreign mutations without contacting upstream", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("auth/login/", {}, undefined, "https://evil.example"), ["auth", "login"]);
    expect(response.status).toBe(403); expect(fetchMock).not.toHaveBeenCalled();
  });
  it("forwards csrf cookie and token, relays auth cookie and redacts JWT response", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ csrfToken: "masked-csrf" }, 200, "csrftoken=secret-csrf; Path=/"))
      .mockResolvedValueOnce(json({ detail: "ok", access_token: "jwt" }, 200, "access-token=jwt; Domain=api.znves.ru; Path=/"));
    vi.stubGlobal("fetch", fetchMock);
    const response = await proxyShopRequest(request("auth/login/"), ["auth", "login"]);
    expect(await response.json()).toEqual({ detail: "ok" });
    const headers = fetchMock.mock.calls[1][1].headers as Headers;
    expect(headers.get("X-CSRFToken")).toBe("masked-csrf");
    expect(headers.get("Cookie")).toContain("csrftoken=secret-csrf");
    expect(response.headers.get("set-cookie")).toContain("access-token=jwt");
    expect(response.headers.get("set-cookie")).not.toContain("Domain=");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });
  it("hides guest capability and injects it from encrypted cookie on subsequent payment", async () => {
    const createFetch = vi.fn().mockResolvedValueOnce(json({ csrfToken: "csrf" })).mockResolvedValueOnce(json({ id: 123, access_token: "capability", status: "success" }, 201));
    vi.stubGlobal("fetch", createFetch);
    const created = await proxyShopRequest(request("order/"), ["order"]);
    expect(await created.json()).toEqual({ id: 123, status: "success" });
    const cookie = created.cookies.get("znves-order-123")!;
    expect(cookie.httpOnly).toBe(true); expect(cookie.secure).toBe(true);
    const payFetch = vi.fn().mockResolvedValueOnce(json({ csrfToken: "csrf" })).mockResolvedValueOnce(json({ confirmation_url: "https://yookassa.ru/pay" }, 201));
    vi.stubGlobal("fetch", payFetch);
    const paid = await proxyShopRequest(request("order/123/pay/", {}, `${cookie.name}=${cookie.value}`), ["order", "123", "pay"]);
    expect(paid.status).toBe(201);
    expect((payFetch.mock.calls[1][1].headers as Headers).get("X-Order-Token")).toBe("capability");
  });
  it("keeps created order recoverable when payment is rejected", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json({ csrfToken: "a" })).mockResolvedValueOnce(json({ id: 123, access_token: "cap" }, 201))
      .mockResolvedValueOnce(json({ csrfToken: "b" })).mockResolvedValueOnce(json({ detail: "failed" }, 400));
    vi.stubGlobal("fetch", fetchMock);
    const response = await checkoutShopRequest(request("checkout", { order: { positions: [] }, paymentProvider: "yookassa" }));
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.order).toEqual({ id: 123 }); expect(body.payment).toBeNull(); expect(body.payment_error).toBeTruthy();
    expect(response.cookies.get("znves-order-123")).toBeTruthy();
  });
});
