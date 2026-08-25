import { test, expect } from "@playwright/test";
import {
  fillCheckoutPersonalData,
  mockCartItem,
  openCartModal,
  preparePage,
} from "../../test-utils/e2e/fixtures";

test.describe("Guest purchase happy path", () => {
  test("catalog → product → cart modal → payment request", async ({ page }) => {
    await preparePage(page);
    await page.route("https://example.com/**", (route) => route.abort());

    await page.goto("/catalog");
    await page.getByRole("link", { name: /Открыть товар T-SHIRT VOYAGE/i }).click();

    await expect(page.getByRole("button", { name: "Добавить в корзину" })).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: "Добавить в корзину" }).click();
    await expect(page.getByText(/добавлено в корзину/i)).toBeVisible();
    await page.waitForFunction(() => {
      try {
        const raw = localStorage.getItem("znves:cart");
        return !!raw && JSON.parse(raw).length > 0;
      } catch {
        return false;
      }
    });

    await openCartModal(page);
    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();

    await fillCheckoutPersonalData(page);
    await expect(page.getByRole("button", { name: /Тверская/ })).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: /Тверская/ }).click();

    const orderCreated = page.waitForResponse(
      (res) =>
        res.url().includes("/api/order/") &&
        res.request().method() === "POST" &&
        !res.url().includes("/pay")
    );
    const paymentStarted = page.waitForResponse(
      (res) => res.url().includes("/pay") && res.request().method() === "POST"
    );

    await page.getByRole("button", { name: "Оформить заказ" }).click();
    await orderCreated;
    await paymentStarted;
  });

  test("seeded cart modal checkout submit is available", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);

    await fillCheckoutPersonalData(page);
    await expect(page.getByRole("button", { name: "Оформить заказ" })).toBeEnabled();
  });
});
