import { test, expect } from "@playwright/test";

const DISMISS_KEY = "znves:catalog_auth_modal_dismissed";

test.describe("Account auth prompt modal", () => {
  test("opens on first catalog visit for guests", async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key);
    }, DISMISS_KEY);

    await page.goto("/catalog");

    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("Войдите в личный кабинет")).toBeVisible();
    await expect(page.getByRole("link", { name: "Перейти ко входу" })).toBeVisible();
  });

  test("can be dismissed temporarily with close button", async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key);
    }, DISMISS_KEY);

    await page.goto("/catalog");
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Закрыть" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();

    await page.reload();
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });
  });

  test("does not reopen after continue without login", async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.removeItem(key);
    }, DISMISS_KEY);

    await page.goto("/catalog");
    await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Продолжить без входа" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();

    await page.reload();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
