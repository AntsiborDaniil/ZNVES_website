import { afterEach, describe, expect, it } from "vitest";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  verifyLogin,
  verifyRegistration,
} from "../../api/auth/authApi";
import { fetchCatalogProducts } from "../../api/catalog/catalogApi";
import { createOrder, getMyOrders } from "../../api/order/orderApi";
import { fetchProductBySlug } from "../../api/product/productApi";
import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "../config";
import { resetAllMockStores } from "../reset";

const applySetCookieHeader = (header: string | null): void => {
  if (!header) return;
  header.split(/,(?=\s*[^;]+=)/).forEach((part) => {
    const cookie = part.split(";")[0]?.trim();
    if (cookie) document.cookie = cookie;
  });
};

const clearCookies = (): void => {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

describe("mock API handlers", () => {
  afterEach(() => {
    clearCookies();
    resetAllMockStores();
  });

  it("returns mock catalog products", async () => {
    const products = await fetchCatalogProducts({});
    expect(products.length).toBeGreaterThanOrEqual(12);
    expect(products[0]?.slug).toBeTruthy();
    expect(products[0]?.images[0]).toContain("/images/catalogs/mock/");
  });

  it("returns mock product detail by slug", async () => {
    const product = await fetchProductBySlug("t-shirt-voyage");
    expect(product?.title).toBe("T-SHIRT VOYAGE");
    expect(product?.priceValue).toBe(4990);
  });

  it("completes login flow with mock code", async () => {
    await loginUser({
      email: MOCK_DEV_USER.email,
      password: MOCK_DEV_USER.password,
    });

    const verifyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.znves.ru"}/api/auth/login/verify/`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: MOCK_DEV_USER.email, code: MOCK_AUTH_CODE }),
      }
    );

    applySetCookieHeader(verifyResponse.headers.get("set-cookie"));
    await verifyLogin({ email: MOCK_DEV_USER.email, code: MOCK_AUTH_CODE });

    const user = await getCurrentUser();
    expect(user?.email).toBe(MOCK_DEV_USER.email);
  });

  it("completes registration flow with mock code", async () => {
    await registerUser({
      email: "mock-user@znves.ru",
      password: "secret123",
      first_name: "Mock",
      last_name: "User",
      phone_number: "+79995556677",
    });

    const verifyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.znves.ru"}/api/auth/register/verify/`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "mock-user@znves.ru", code: MOCK_AUTH_CODE }),
      }
    );

    applySetCookieHeader(verifyResponse.headers.get("set-cookie"));
    await verifyRegistration({ email: "mock-user@znves.ru", code: MOCK_AUTH_CODE });

    const user = await getCurrentUser();
    expect(user?.email).toBe("mock-user@znves.ru");
  });

  it("creates mock order and returns it in my orders", async () => {
    const created = await createOrder({
      total_amount: "4990",
      payment_type: "prepayment",
      delivery_service: "cdek",
      customer_data: {
        full_name: "Test User",
        email: "test@znves.ru",
        phone: "+79990000000",
      },
      cdek_delivery_data: {
        pvz_code: "MSK1",
        full_address: "Москва, тест",
      },
      positions: [{ id: "wh-tshirt-green-m", quantity: 1 }],
    });

    expect(created.id).toBeTruthy();

    const activeOrders = await getMyOrders(true);
    expect(activeOrders[0]?.total_amount).toBe("4990");
  });
});
