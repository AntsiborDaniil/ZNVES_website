import { test, expect } from "@playwright/test";
import {
  mockCartItem,
  openCartModal,
  preparePage,
} from "../../../test-utils/e2e/fixtures";

test.describe("Cart modal", () => {
  test("shows empty cart state", async ({ page }) => {
    await preparePage(page, { cartItems: [] });
    await openCartModal(page);

    await expect(page.getByText("Корзина пуста")).toBeVisible();
    await expect(page.getByRole("link", { name: "Перейти в каталог" })).toBeVisible();
  });

  test("updates quantity and clears cart via quantity controls", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);

    const dialog = page.getByRole("dialog", { name: /Ваш заказ/i });
    await expect(dialog.getByText("T-SHIRT VOYAGE").first()).toBeVisible();

    await dialog.getByRole("button", { name: "Увеличить количество" }).click();
    await expect(dialog.locator("[class*='quantityValue']").first()).toHaveText("2");

    await dialog.getByRole("button", { name: "Уменьшить количество" }).click();
    await dialog.getByRole("button", { name: "Уменьшить количество" }).click();
    await expect(page.getByText("Корзина пуста")).toBeVisible();
  });

  test("removes single item when quantity reaches zero", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);

    await page.getByRole("button", { name: "Уменьшить количество" }).click();
    await expect(page.getByText("Корзина пуста")).toBeVisible();
  });

  test("shows inline checkout form in cart modal", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);

    await expect(page.locator("#firstName")).toBeVisible();
    await expect(page.getByText("СДЭК до пункта выдачи")).toBeVisible();
    await expect(page.getByRole("button", { name: "Оформить заказ" })).toBeVisible();
  });

  test("applies valid promo code", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);
    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();

    await page.locator("#checkout-modal-promo").fill("SALE10");
    await page.getByRole("button", { name: "Активировать" }).click();

    await expect(page.locator("[class*='summaryTotalOld']")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("shows error for unknown promo", async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);

    await page.locator("#checkout-modal-promo").fill("NOPE");
    await page.getByRole("button", { name: "Активировать" }).click();

    await expect(page.getByText("Промокод не найден")).toBeVisible({ timeout: 10_000 });
  });

  test("shows payment success return screen", async ({ page }) => {
    await preparePage(page);
    await page.goto("/cart?payment=success");

    await expect(page.getByText("Оплата прошла успешно")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("shows payment error return screen", async ({ page }) => {
    await preparePage(page);
    await page.goto("/cart?payment=error");

    await expect(page.getByText("Оплата не выполнена")).toBeVisible({
      timeout: 15_000,
    });
  });
});
