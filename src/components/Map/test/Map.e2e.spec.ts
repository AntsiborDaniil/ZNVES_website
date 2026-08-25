import { test, expect } from "@playwright/test";
import { mockCartItem, openCartModal, preparePage } from "../../../test-utils/e2e/fixtures";

test.describe("Checkout delivery widgets (cart modal)", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page, { cartItems: [mockCartItem] });
    await openCartModal(page);
  });

  test("shows CDEK PVZ list by default", async ({ page }) => {
    await expect(page.getByText("СДЭК · Пункты выдачи")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByLabel("Город", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Город для пунктов выдачи СДЭК")).toHaveCount(0);
    await expect(page.getByLabel("Поиск по адресу ПВЗ")).toBeVisible();
    await expect(page.getByRole("button", { name: /Тверская/ })).toBeVisible();
  });

  test("switches to Yandex PVZ widget", async ({ page }) => {
    await page.getByText("ЯНДЕКС до пункта выдачи", { exact: true }).click();

    await expect(page.locator("#delivery-widget")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("Загрузка пунктов выдачи…")).toBeHidden({
      timeout: 15_000,
    });
  });

  test("filters CDEK PVZ list by search query", async ({ page }) => {
    const search = page.getByLabel("Поиск по адресу ПВЗ");
    await expect(search).toBeVisible({ timeout: 15_000 });

    await search.fill("арбат");
    await expect(page.getByRole("button", { name: /Арбат/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Тверская/ })).toHaveCount(0);
  });

  test("selects PVZ point from list", async ({ page }) => {
    const pvz = page.getByRole("button", { name: /Тверская/ });
    await expect(pvz).toBeVisible({ timeout: 15_000 });
    await pvz.click();
    await expect(pvz).toBeVisible();
  });
});
