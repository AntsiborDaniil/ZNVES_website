import { describe, expect, it } from "vitest";
import { filterMockCatalogProducts, getMockProductDetail } from "../data/catalog";
import { MOCK_INITIAL_ORDERS } from "../data/orders";
import { createMockOrder, getMockOrders, resetOrderStore } from "../state/orderStore";

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

describe("account orders mock data", () => {
  it("covers all personal cabinet order statuses", () => {
    const statuses = MOCK_INITIAL_ORDERS.map((o) => o.status);
    expect(statuses).toEqual(
      expect.arrayContaining([
        "Ожидает оплаты",
        "Оплачен",
        "Доставляется",
        "Доставлен",
      ])
    );
    expect(MOCK_INITIAL_ORDERS.every((o) => (o.positions?.length ?? 0) > 0)).toBe(true);
    expect(
      MOCK_INITIAL_ORDERS.every((o) =>
        o.positions?.every((p) => p.product_image?.startsWith("/images/catalogs/mock/"))
      )
    ).toBe(true);
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
