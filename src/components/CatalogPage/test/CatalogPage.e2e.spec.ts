import { test, expect } from "@playwright/test";
import { preparePage } from "../../../test-utils/e2e/fixtures";

test.describe("Catalog page", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("loads mock products", async ({ page }) => {
    await page.goto("/catalog");

    await expect(
      page.getByRole("link", { name: /Открыть товар T-SHIRT VOYAGE/i })
    ).toBeVisible({ timeout: 15_000 });
  });

  test("filters by category query", async ({ page }) => {
    await page.goto("/catalog?category=hoodies");

    await expect(
      page.getByRole("link", { name: /Открыть товар.*HOODIE/i }).first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("opens product from catalog card", async ({ page }) => {
    await page.goto("/catalog");

    await page.getByRole("link", { name: /Открыть товар T-SHIRT VOYAGE/i }).click();
    await expect(page).toHaveURL(/\/catalog\/t-shirt-voyage/);
    await expect(page.getByRole("button", { name: "Добавить в корзину" })).toBeVisible({
      timeout: 15_000,
    });
  });
});
