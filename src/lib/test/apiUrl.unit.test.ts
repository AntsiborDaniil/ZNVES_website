import { afterEach, expect, it, vi } from "vitest";
vi.mock("../useMocks", () => ({ shouldUseMocks: () => false }));
import { apiUrl } from "../apiUrl";
afterEach(() => vi.unstubAllGlobals());
it("uses canonical slashless Next URLs in the browser", () => {
  expect(apiUrl("/auth/user/")).toBe("/api/shop/auth/user");
  expect(apiUrl("/order/123/pay/")).toBe("/api/shop/order/123/pay");
});
it("retains Django trailing slash on server-side direct requests", () => {
  vi.stubGlobal("window", undefined);
  expect(apiUrl("/auth/user/")).toMatch(/\/api\/auth\/user\/$/);
});
