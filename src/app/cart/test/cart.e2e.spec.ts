import { test, expect } from "@playwright/test";
import { mockCartItem, preparePage } from "../../../test-utils/e2e/fixtures";

test.describe("Cart page", () => {
  test("shows empty cart state", async ({ page }) => {
    await preparePage(page, { cartItems: [] });
    await page.goto("/cart");

    await expect(page.getByText("Корзина пуста")).toBeVisible();
    await expect(page.getByRole("link", { name: "Перейти в каталог" })).toBeVisible();
  });

  test("updates quantity and clears cart", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/cart");

    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();

    await page.getByRole("button", { name: "Увеличить количество" }).first().click();
    await expect(page.locator("[class*='quantityValue']").first()).toHaveText("2");

    await page.getByRole("button", { name: "Очистить корзину" }).click();
    await expect(page.getByText("Корзина пуста")).toBeVisible();
  });

  test("removes single item", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/cart");

    await page.getByRole("button", { name: "Удалить товар" }).click();
    await expect(page.getByText("Корзина пуста")).toBeVisible();
  });

  test("goes to checkout on desktop", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/cart");

    await page.getByRole("button", { name: "Перейти к оформлению" }).click();
    await expect(page).toHaveURL(/\/checkout/);
  });

  test("applies valid promo code and proceeds to checkout", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/cart");
    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();

    await page.locator("#promo-code").fill("SALE10");
    await page.getByRole("button", { name: "Перейти к оформлению" }).click();

    await expect
      .poll(async () => page.url().includes("/checkout") || (await page.locator("#checkout-form").isVisible()), {
        timeout: 20_000,
      })
      .toBe(true);
  });

  test("shows error for unknown promo", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.goto("/cart");

    await page.locator("#promo-code").fill("NOPE");
    await page.getByRole("button", { name: "Перейти к оформлению" }).click();

    await expect(page.getByText("Промокод не найден")).toBeVisible({ timeout: 10_000 });
  });

  test("shows payment success return screen", async ({ page }) => {
    await preparePage(page);
    await page.goto("/cart?payment=success");

    await expect(page.getByText("Оплата прошла успешно")).toBeVisible();
  });

  test("shows payment error return screen", async ({ page }) => {
    await preparePage(page);
    await page.goto("/cart?payment=error");

    await expect(page.getByText("Оплата не выполнена")).toBeVisible();
  });
});
