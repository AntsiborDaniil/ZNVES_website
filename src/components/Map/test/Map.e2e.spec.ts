import { test, expect } from "@playwright/test";

const cartItem = {
  productId: 1,
  size: "m",
  color: "green",
  quantity: 1,
  product: {
    id: 1,
    title: "T-SHIRT VOYAGE",
    price: "4990 ₽",
    priceValue: 4990,
    images: ["/images/catalogs/mock/tshirt-green.svg"],
    isNew: true,
    category: "t-shirt",
    color: "green",
    size: "M",
    sortOrder: 1,
  },
};

test.describe("Checkout delivery widgets", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((item) => {
      localStorage.setItem("znves:cart", JSON.stringify([item]));
    }, cartItem);
  });

  test("shows CDEK PVZ list on checkout by default", async ({ page }) => {
    await page.goto("/checkout");

    await expect(page.getByText("СДЭК · Пункты выдачи ·")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByLabel("Поиск по адресу ПВЗ")).toBeVisible();
    await expect(page.getByRole("button", { name: /Тверская/ })).toBeVisible();
  });

  test("switches to Yandex PVZ widget", async ({ page }) => {
    await page.goto("/checkout");

    await page.getByRole("radio", { name: /ЯНДЕКС/i }).check();

    await expect(page.locator("#delivery-widget")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("Загрузка пунктов выдачи…")).toBeHidden({
      timeout: 15_000,
    });
  });

  test("filters CDEK PVZ list by search query", async ({ page }) => {
    await page.goto("/checkout");

    const search = page.getByLabel("Поиск по адресу ПВЗ");
    await expect(search).toBeVisible({ timeout: 15_000 });

    await search.fill("арбат");
    await expect(page.getByRole("button", { name: /Арбат/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Тверская/ })).toHaveCount(0);
  });
});
