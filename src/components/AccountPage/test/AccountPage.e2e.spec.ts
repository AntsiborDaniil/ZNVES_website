import { test, expect } from "@playwright/test";
import {
  loginAsDevUser,
  preparePage,
} from "../../../test-utils/e2e/fixtures";

test.describe("Account page", () => {
  test("shows profile and delivery sections after login", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    await expect(page.getByRole("heading", { name: "Профиль", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Адреса доставки" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Разделы кабинета" }).getByRole("button", {
        name: "Личный кабинет",
      })
    ).toBeVisible();
  });

  test("opens orders tab", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    await page
      .getByRole("navigation", { name: "Разделы кабинета" })
      .getByRole("button", { name: "Мои заказы" })
      .click();

    await expect(
      page.getByText(/Оплачен|T-SHIRT VOYAGE|У вас пока нет заказов/i).first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("saves profile changes", async ({ page }) => {
    await preparePage(page);
    await loginAsDevUser(page);

    const firstName = page.locator("#profile-firstName");
    await expect(firstName).toBeVisible({ timeout: 10_000 });
    await firstName.fill("Даниил");

    await page.getByRole("button", { name: "Сохранить" }).first().click();
    await expect(page.getByText("Данные сохранены")).toBeVisible({ timeout: 10_000 });
  });
});
