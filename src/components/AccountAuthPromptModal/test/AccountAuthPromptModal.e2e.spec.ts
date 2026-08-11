import { test, expect } from "@playwright/test";
import { preparePage } from "../../../test-utils/e2e/fixtures";

test.describe("Account auth prompt modal", () => {
  test("opens on first catalog visit for guests", async ({ page }) => {
    await preparePage(page, { cookieConsent: true, dismissAuthModal: false });
    await page.goto("/catalog");

    await expect(
      page.getByRole("dialog", { name: "Войдите в личный кабинет" })
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("link", { name: "Перейти ко входу" })).toBeVisible();
  });

  test("can be dismissed temporarily with close button", async ({ page }) => {
    await preparePage(page, { cookieConsent: true, dismissAuthModal: false });
    await page.goto("/catalog");

    const dialog = page.getByRole("dialog", { name: "Войдите в личный кабинет" });
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Закрыть" }).click();
    await expect(dialog).toBeHidden();

    await page.reload();
    await expect(dialog).toBeVisible({ timeout: 15_000 });
  });

  test("does not reopen after continue without login", async ({ page }) => {
    await preparePage(page, { cookieConsent: true, dismissAuthModal: false });
    await page.goto("/catalog");

    const dialog = page.getByRole("dialog", { name: "Войдите в личный кабинет" });
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    await page.getByRole("button", { name: "Продолжить без входа" }).click();
    await expect(dialog).toBeHidden();

    await page.reload();
    await expect(
      page.getByRole("dialog", { name: "Войдите в личный кабинет" })
    ).toHaveCount(0);
  });
});
