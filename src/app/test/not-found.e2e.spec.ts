import { test, expect } from "@playwright/test";

const COOKIE_CONSENT_KEY = "znves:cookie_consent";
const AUTH_MODAL_DISMISS_KEY = "znves:catalog_auth_modal_dismissed";

test.describe("Not found page", () => {
  test("shows custom 404 with navigation links", async ({ page }) => {
    await page.addInitScript(
      ({ cookieKey, authModalKey }) => {
        localStorage.setItem(cookieKey, "1");
        localStorage.setItem(authModalKey, "1");
      },
      {
        cookieKey: COOKIE_CONSENT_KEY,
        authModalKey: AUTH_MODAL_DISMISS_KEY,
      }
    );

    await page.goto("/this-page-does-not-exist");

    await expect(
      page.getByRole("heading", { name: "Страница не найдена" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "В каталог" })).toHaveAttribute(
      "href",
      "/catalog"
    );
    await expect(page.getByRole("link", { name: "На главную" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
