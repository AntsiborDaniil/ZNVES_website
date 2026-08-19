import { test, expect } from "@playwright/test";

const COOKIE_CONSENT_KEY = "znves:cookie_consent";
const AUTH_MODAL_DISMISS_KEY = "znves:catalog_auth_modal_dismissed";

async function prepareHomePage(page: import("@playwright/test").Page) {
  await page.addInitScript(
    ({ cookieKey, authModalKey }) => {
      localStorage.setItem(cookieKey, "1");
      localStorage.setItem(authModalKey, "1");
    },
    { cookieKey: COOKIE_CONSENT_KEY, authModalKey: AUTH_MODAL_DISMISS_KEY }
  );

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
}

test.describe("Footer links", () => {
  test("renders service, catalog and legal links", async ({ page }) => {
    await prepareHomePage(page);

    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();

    await expect(footer.getByRole("link", { name: "Каталог", exact: true })).toHaveAttribute(
      "href",
      "/catalog"
    );
    await expect(footer.getByRole("link", { name: "Корзина", exact: true })).toHaveAttribute(
      "href",
      "/cart"
    );
    await expect(
      footer.getByRole("link", { name: "Личный кабинет", exact: true })
    ).toHaveAttribute("href", "/account");
    await expect(
      footer.getByRole("link", { name: "Доставка и оплата", exact: true })
    ).toHaveAttribute("href", "/delivery-payment");
    await expect(
      footer.getByRole("link", { name: "Обмен и возврат", exact: true })
    ).toHaveAttribute("href", "/returns");
    await expect(
      footer.getByRole("link", { name: "Политика конфиденциальности" }).first()
    ).toHaveAttribute("href", "/privacy");
    await expect(
      footer.getByRole("link", { name: "Публичная оферта", exact: true })
    ).toHaveAttribute("href", "/public-offer");
  });

  test("navigates to catalog from footer", async ({ page }) => {
    await prepareHomePage(page);
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await footer.getByRole("link", { name: "Каталог", exact: true }).click();
    await expect(page).toHaveURL(/\/catalog/);
  });
});
