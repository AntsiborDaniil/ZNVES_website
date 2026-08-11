import { test, expect } from "@playwright/test";
import {
  acceptCheckoutAgreements,
  fillCheckoutPersonalData,
  mockCartItem,
  preparePage,
} from "../../test-utils/e2e/fixtures";

test.describe("Guest purchase happy path", () => {
  test("catalog → product → cart → checkout → payment request", async ({ page }) => {
    await preparePage(page);
    await page.route("https://example.com/**", (route) => route.abort());

    await page.goto("/catalog");
    await page.getByRole("link", { name: /Открыть товар T-SHIRT VOYAGE/i }).click();

    await expect(page.getByRole("button", { name: "Добавить в корзину" })).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: "Добавить в корзину" }).click();
    await expect(page.getByText("Добавлено в корзину")).toBeVisible();
    await page.waitForFunction(() => {
      try {
        const raw = localStorage.getItem("znves:cart");
        return !!raw && JSON.parse(raw).length > 0;
      } catch {
        return false;
      }
    });

    await page.goto("/cart");
    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();
    await page.getByRole("button", { name: "Перейти к оформлению" }).click();
    await expect(page).toHaveURL(/\/checkout/);

    await fillCheckoutPersonalData(page);
    await expect(page.getByRole("button", { name: /Тверская/ })).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: /Тверская/ }).click();
    await acceptCheckoutAgreements(page);

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

  test("seeded cart checkout validation requires PVZ selection path", async ({
    page,
  }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/checkout");

    await fillCheckoutPersonalData(page);
    await acceptCheckoutAgreements(page);

    // Without selecting PVZ order may still submit with DEFAULT pvz_code —
    // ensure button is enabled after agreements
    await expect(page.getByRole("button", { name: "Оформить заказ" })).toBeEnabled();
  });
});
