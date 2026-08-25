import { expect, type Page } from "@playwright/test";
import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "../../mocks/config";
import { mockWarehouseUuid } from "../../mocks/data/catalog";

export const COOKIE_CONSENT_KEY = "znves:cookie_consent";
export const AUTH_MODAL_DISMISS_KEY = "znves:catalog_auth_modal_dismissed";
export const CART_STORAGE_KEY = "znves:cart";
export const AUTH_STORAGE_KEY = "znves:auth";

export const MOCK_CART_WAREHOUSE_ID = mockWarehouseUuid("t-shirt-voyage-green-m");

export const mockCartItem = {
  productId: MOCK_CART_WAREHOUSE_ID,
  size: "m",
  color: "green",
  colorLabel: "Зеленый",
  quantity: 1,
  product: {
    id: MOCK_CART_WAREHOUSE_ID,
    title: "T-SHIRT VOYAGE",
    price: "4990 ₽",
    priceValue: 4990,
    images: ["/images/catalogs/mock/tshirt-green.svg"],
    isNew: true,
    category: "t-shirt",
    color: "green",
    size: "M",
    sortOrder: 1,
    slug: "t-shirt-voyage",
  },
};

type PrepareOptions = {
  cookieConsent?: boolean;
  dismissAuthModal?: boolean;
  cartItems?: unknown[];
  authenticatedDevUser?: boolean;
  viewport?: { width: number; height: number };
};

export async function preparePage(page: Page, options: PrepareOptions = {}) {
  const {
    cookieConsent = true,
    dismissAuthModal = true,
    cartItems,
    authenticatedDevUser = false,
    viewport = { width: 1440, height: 900 },
  } = options;

  await page.setViewportSize(viewport);

  await page.addInitScript(
    ({
      cookieKey,
      authModalKey,
      cartKey,
      authKey,
      cookieConsent: withCookie,
      dismissAuthModal: withAuthDismiss,
      cartItems: items,
      authenticatedDevUser: asUser,
      user,
    }) => {
      if (withCookie) localStorage.setItem(cookieKey, "1");
      else localStorage.removeItem(cookieKey);

      if (withAuthDismiss) localStorage.setItem(authModalKey, "1");
      else localStorage.removeItem(authModalKey);

      if (typeof items !== "undefined") {
        if (items && Array.isArray(items)) {
          localStorage.setItem(cartKey, JSON.stringify(items));
        } else {
          localStorage.removeItem(cartKey);
        }
      }

      if (asUser) {
        sessionStorage.setItem(
          authKey,
          JSON.stringify({
            user: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              phone_number: user.phone_number,
              username: "dev",
              delivery_data: {},
            },
            savedAt: Date.now(),
          })
        );
      }
    },
    {
      cookieKey: COOKIE_CONSENT_KEY,
      authModalKey: AUTH_MODAL_DISMISS_KEY,
      cartKey: CART_STORAGE_KEY,
      authKey: AUTH_STORAGE_KEY,
      cookieConsent,
      dismissAuthModal,
      cartItems: typeof cartItems === "undefined" ? undefined : cartItems,
      authenticatedDevUser,
      user: MOCK_DEV_USER,
    }
  );
}

export async function fillOtp(page: Page, code = MOCK_AUTH_CODE) {
  await page.getByLabel("Цифра 1 из 6").fill(code);
}

export async function loginAsDevUser(page: Page) {
  await page.goto("/account");
  await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
  await page.locator("#login-password").fill(MOCK_DEV_USER.password);
  await page.getByRole("button", { name: "Войти" }).click();
  await page.getByRole("button", { name: "Подтвердить" }).waitFor({ state: "visible" });
  await fillOtp(page);
  await page.getByRole("button", { name: "Подтвердить" }).click();
  await expectAccountHub(page);
}

export async function expectAccountHub(page: Page) {
  await expect(
    page.getByRole("navigation", { name: "Разделы кабинета" })
  ).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("heading", { name: "Профиль", level: 1 })).toBeVisible();
}

/** /cart и /checkout открывают CartModal и редиректят на /catalog */
export async function openCartModal(page: Page) {
  await page.goto("/cart");
  await expect(page.getByRole("dialog", { name: /Ваш заказ/i })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page).toHaveURL(/\/catalog/);
}

export async function fillCheckoutPersonalData(page: Page) {
  await page.locator("#firstName").fill("Иван");
  await page.locator("#lastName").fill("Иванов");
  await page.locator("#phone").fill("9991234567");
  await page.locator("#email").fill("ivan@example.ru");
}

export async function acceptCheckoutAgreements(page: Page) {
  const offer = page.locator('input[name="agreeToOffer"]');
  const privacy = page.locator('input[name="agreeToPrivacy"]');
  if (await offer.count()) await offer.check();
  if (await privacy.count()) await privacy.check();
}

export { MOCK_AUTH_CODE, MOCK_DEV_USER };
