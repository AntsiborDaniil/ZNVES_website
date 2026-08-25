import { test, expect } from "@playwright/test";
import {
  fillCheckoutPersonalData,
  mockCartItem,
  openCartModal,
  preparePage,
} from "../../../test-utils/e2e/fixtures";

test.describe("Checkout flows (cart modal)", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await page.route("https://example.com/**", (route) => route.abort());
    await openCartModal(page);
  });

  test("completes CDEK PVZ order and requests payment", async ({ page }) => {
    await fillCheckoutPersonalData(page);

    await expect(page.getByText("СДЭК · Пункты выдачи")).toBeVisible({
      timeout: 15_000,
    });
    await page.getByRole("button", { name: /Тверская/ }).click();

    const payResponse = page.waitForResponse(
      (res) =>
        res.url().includes("/api/order/") &&
        res.url().includes("/pay") &&
        res.request().method() === "POST"
    );

    await page.getByRole("button", { name: "Оформить заказ" }).click();
    const response = await payResponse;
    expect(response.ok()).toBeTruthy();
  });

  test("submit is enabled for modal checkout without agreement checkboxes", async ({
    page,
  }) => {
    await fillCheckoutPersonalData(page);
    await expect(page.getByRole("button", { name: "Оформить заказ" })).toBeEnabled();
  });

  test("switches to Yandex courier option", async ({ page }) => {
    await page.getByText("ЯНДЕКС курьером", { exact: true }).click();
    await expect(page.getByText("ЯНДЕКС курьером", { exact: true })).toBeVisible();
  });

  test("filters CDEK PVZ by search", async ({ page }) => {
    const search = page.getByLabel("Поиск по адресу ПВЗ");
    await expect(search).toBeVisible({ timeout: 15_000 });
    await search.fill("арбат");

    await expect(page.getByRole("button", { name: /Арбат/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Тверская/ })).toHaveCount(0);
  });

  test("selects card payment method", async ({ page }) => {
    await page
      .locator("label")
      .filter({ has: page.locator('input[value="card"]') })
      .click();
    await expect(page.locator('input[name="paymentMethod"][value="card"]')).toBeChecked();
  });
});
