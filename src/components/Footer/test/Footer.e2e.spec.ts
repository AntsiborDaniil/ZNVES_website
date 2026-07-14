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

async function openFooterCatalog(page: import("@playwright/test").Page) {
  const footer = page.getByRole("contentinfo");
  await footer.scrollIntoViewIfNeeded();

  const catalogToggle = footer.getByRole("button", { name: "CATALOG" });
  if (await catalogToggle.isVisible()) {
    const expanded = await catalogToggle.getAttribute("aria-expanded");
    if (expanded === "false") {
      await catalogToggle.click();
    }
  }
}

test.describe("Footer catalog links", () => {
  test("renders categories from API with correct hrefs", async ({ page }) => {
    await prepareHomePage(page);
    await openFooterCatalog(page);

    const catalog = page.getByTestId("footer-catalog");
    await expect(catalog).toBeVisible();

    await expect(catalog.getByRole("link", { name: "New in", exact: true })).toHaveAttribute(
      "href",
      "/new-in"
    );
    await expect(catalog.getByRole("link", { name: "Hoodies", exact: true })).toHaveAttribute(
      "href",
      "/catalog?category=hoodies"
    );
    await expect(catalog.getByRole("link", { name: "Jeans", exact: true })).toHaveAttribute(
      "href",
      "/catalog?category=jeans"
    );
    await expect(catalog.getByRole("link", { name: "Shorts", exact: true })).toHaveAttribute(
      "href",
      "/catalog?category=shorts"
    );
  });

  test("navigates to catalog category from footer link", async ({ page }) => {
    await prepareHomePage(page);
    await openFooterCatalog(page);

    await page.getByTestId("footer-catalog").getByRole("link", { name: "Jackets", exact: true }).click();
    await expect(page).toHaveURL(/\/catalog\?category=jackets/);
  });

  test("shows all mock categories in footer catalog", async ({ page }) => {
    await prepareHomePage(page);
    await openFooterCatalog(page);

    const expectedLabels = [
      "New in",
      "T-shirts",
      "Hoodies",
      "Zip hoodies",
      "Jeans",
      "Jackets",
      "Pants",
      "Shorts",
    ];

    for (const label of expectedLabels) {
      await expect(
        page.getByTestId("footer-catalog").getByRole("link", { name: label, exact: true })
      ).toBeVisible();
    }
  });
});
