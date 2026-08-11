import { test, expect } from "@playwright/test";
import { preparePage } from "../../../test-utils/e2e/fixtures";

test.describe("Product page add to cart", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("adds selected variant to cart", async ({ page }) => {
    await page.goto("/catalog/t-shirt-voyage");

    await expect(page.getByRole("button", { name: "Добавить в корзину" })).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole("button", { name: "Добавить в корзину" }).click();
    await expect(page.getByText("Добавлено в корзину")).toBeVisible();

    await page.waitForFunction(() => {
      try {
        const raw = localStorage.getItem("znves:cart");
        return !!raw && JSON.parse(raw).length > 0;
      } catch {
        return false;
      }
    });

    await page.goto("/cart");
    await expect(page.getByText("T-SHIRT VOYAGE").first()).toBeVisible();
    await expect(page.getByText("Итого").first()).toBeVisible();
  });
});
