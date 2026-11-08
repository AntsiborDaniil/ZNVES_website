import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("../../../lib/useMocks", () => ({ shouldUseMocks: () => false }));
import { getPaymentUrl, getYandexPaymentUrl, openPaymentTab, redirectToPaymentUrl } from "../orderApi";

afterEach(() => vi.restoreAllMocks());

describe("payment access", () => {
  it.each([getPaymentUrl, getYandexPaymentUrl])("uses the BFF without putting guest capabilities into browser headers", async (pay) => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ confirmation_url: "https://example.com/pay" }), { status: 201 }));
    await pay(123);
    expect(String(fetch.mock.calls[0][0])).toMatch(/^\/api\/shop\/order\/123\/pay\//);
    expect(fetch.mock.calls[0][1]?.headers).not.toHaveProperty("X-Order-Token");
    expect(fetch.mock.calls[0][1]?.credentials).toBe("include");
  });

  it("keeps cookie-based payment available without a guest token", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 201 }));
    await getPaymentUrl(123);
    expect(fetch.mock.calls[0][1]?.headers).not.toHaveProperty("X-Order-Token");
  });

  it("opens a detached blank tab and navigates that tab to payment", () => {
    const replace = vi.fn();
    const tab = { opener: window, closed: false, location: { replace } } as unknown as Window;
    const open = vi.spyOn(window, "open").mockReturnValue(tab);
    expect(openPaymentTab()).toBe(tab);
    expect(open).toHaveBeenCalledWith("about:blank", "_blank");
    expect(tab.opener).toBeNull();
    redirectToPaymentUrl("https://example.com/pay", tab);
    expect(replace).toHaveBeenCalledWith("https://example.com/pay");
  });
});
