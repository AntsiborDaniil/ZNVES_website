import { test, expect } from "@playwright/test";
import {
  loginAsDevUser,
  preparePage,
} from "../../../test-utils/e2e/fixtures";

test.describe("Account page", () => {
  test("shows personal data and active orders after login", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    await expect(page.getByRole("heading", { name: "Личные данные" })).toBeVisible();
    await expect(page.getByText(/Активные заказы|Нет активных заказов/)).toBeVisible();
  });

  test("opens orders tab with seed order", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    await page.getByRole("listitem").filter({ hasText: "Заказы" }).click();
    await expect(page.getByText(/Оплачен|T-SHIRT VOYAGE|У вас пока нет заказов/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("saves profile changes", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    await page.getByRole("listitem").filter({ hasText: "Личные данные" }).click();

    const firstName = page.locator("#profile-firstName");
    await expect(firstName).toBeVisible({ timeout: 10_000 });
    await firstName.fill("Даниил");

    await page.getByRole("button", { name: "Сохранить изменения" }).first().click();
    await expect(page.getByText("Данные сохранены")).toBeVisible({ timeout: 10_000 });
  });
});
