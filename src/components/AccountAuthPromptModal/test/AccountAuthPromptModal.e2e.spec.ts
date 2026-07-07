import { test, expect } from "@playwright/test";

test.describe("Account auth prompt modal", () => {
  test("opens on first catalog visit for guests", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.removeItem("znves:catalog_auth_modal_shown");
    });

    await page.goto("/catalog");

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("Войдите в личный кабинет")).toBeVisible();
    await expect(page.getByRole("link", { name: "Перейти ко входу" })).toBeVisible();
  });

  test("can be dismissed", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.removeItem("znves:catalog_auth_modal_shown");
    });

    await page.goto("/catalog");
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Продолжить без входа" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
