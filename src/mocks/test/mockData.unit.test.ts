import { describe, expect, it } from "vitest";
import { applyPromoCode } from "../../api/discounts/discountsApi";
import { MOCK_CHECKOUT_AUTOFILL, MOCK_DEV_USER } from "../data/account";
import { filterMockCatalogProducts, getMockProductDetail } from "../data/catalog";
import { MOCK_INITIAL_ORDERS, MOCK_ORDER_STATUSES } from "../data/orders";
import { MOCK_PROMO_CODES, getMockPromoDiscount } from "../data/promos";
import {
  createMockOrder,
  getAllMockOrders,
  getMockOrders,
  resetOrderStore,
} from "../state/orderStore";

describe("catalog mock data", () => {
  it("filters new products", () => {
    const onlyNew = filterMockCatalogProducts({ is_new: true });
    expect(onlyNew.length).toBeGreaterThanOrEqual(5);
    expect(onlyNew.every((p) => p.is_new)).toBe(true);
  });

  it("returns product detail with warehouse items", () => {
    const detail = getMockProductDetail("t-shirt-voyage");
    expect(detail?.warehouse_items.length).toBeGreaterThan(0);
  });
});

describe("promo mock data", () => {
  it("exposes known promo codes", () => {
    expect(getMockPromoDiscount("sale10")).toBe(MOCK_PROMO_CODES.SALE10.discount);
    expect(getMockPromoDiscount("NOPE")).toBeNull();
  });

  it("applies SALE10 through discount API handler", async () => {
    const result = await applyPromoCode("SALE10", {
      cartItems: [
        { warehouse_id: "a1b2c3d4-e5f6-4789-a012-3456789abcde", quantity: 1 },
      ],
      orderTotal: "10000.00",
    });
    expect(result).toEqual({
      success: true,
      promo_code: "SALE10",
      discount: "499.00",
    });
  });

  it("rejects unknown promo codes", async () => {
    const result = await applyPromoCode("UNKNOWN", {
      cartItems: [
        { warehouse_id: "a1b2c3d4-e5f6-4789-a012-3456789abcde", quantity: 1 },
      ],
      orderTotal: "10000.00",
    });
    expect(result.success).toBe(false);
  });
});

describe("account autofill mock data", () => {
  it("has login credentials and checkout autofill fields", () => {
    expect(MOCK_DEV_USER.email).toContain("@");
    expect(MOCK_DEV_USER.delivery_data.cdek_full_pvz_address.length).toBeGreaterThan(5);
    expect(MOCK_CHECKOUT_AUTOFILL.firstName).toBe(MOCK_DEV_USER.first_name);
    expect(MOCK_CHECKOUT_AUTOFILL.pvzAddress).toBe(
      MOCK_DEV_USER.delivery_data.cdek_full_pvz_address
    );
  });
});

describe("account orders mock data", () => {
  it("covers all personal cabinet order statuses", () => {
    const statuses = MOCK_INITIAL_ORDERS.map((o) => o.status);
    expect(statuses).toEqual(expect.arrayContaining([...MOCK_ORDER_STATUSES]));
    expect(new Set(statuses).size).toBe(MOCK_ORDER_STATUSES.length);
    expect(MOCK_INITIAL_ORDERS.every((o) => (o.positions?.length ?? 0) > 0)).toBe(true);
    expect(
      MOCK_INITIAL_ORDERS.every((o) =>
        o.positions?.every((p) => p.product_image?.startsWith("/images/catalogs/mock/"))
      )
    ).toBe(true);
  });

  it("exposes every seeded order in getAllMockOrders", () => {
    resetOrderStore();
    expect(getAllMockOrders()).toHaveLength(MOCK_INITIAL_ORDERS.length);
  });
});

describe("orderStore", () => {
  it("creates order and exposes it as active", () => {
    resetOrderStore();

    createMockOrder({
      total_amount: "6590",
      payment_type: "prepayment",
      delivery_service: "yandex",
      customer_data: {
        full_name: "Order Test",
        email: "order@znves.ru",
        phone: "+79998887766",
      },
      positions: [{ id: "a1b2c3d4-e5f6-4789-a012-3456789abcde", quantity: 2 }],
      yandex_delivery_data: { full_address: "СПб, тест" },
    });

    const active = getMockOrders(true);
    expect(active[0]?.total_amount).toBe("6590");
    expect(active[0]?.positions?.[0]?.quantity).toBe(2);
  });

  it("returns seeded account orders for inactive list", () => {
    resetOrderStore();
    const rest = getMockOrders(false);
    expect(rest.length).toBe(MOCK_INITIAL_ORDERS.length - 1);
  });
});
