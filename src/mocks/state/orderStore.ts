import type { ApiMyOrderItem, OrderRequest } from "../../api/order/orderApi";
import { MOCK_INITIAL_ORDERS } from "../data/orders";

let orders: ApiMyOrderItem[] = [...MOCK_INITIAL_ORDERS];
let orderCounter = orders.length;

export const resetOrderStore = (): void => {
  orders = [...MOCK_INITIAL_ORDERS];
  orderCounter = orders.length;
};

export const getMockOrders = (active: boolean): ApiMyOrderItem[] => {
  if (active) {
    return orders.length > 0 ? [orders[0]] : [];
  }
  return orders.slice(1);
};

export const createMockOrder = (payload: OrderRequest): ApiMyOrderItem => {
  orderCounter += 1;
  const id = `mock-order-${orderCounter}`;
  const now = new Date().toISOString();

  const order: ApiMyOrderItem = {
    id,
    total_amount: payload.total_amount,
    status: "Создан",
    payment_type: payload.payment_type,
    delivery_service: payload.delivery_service,
    promocode: payload.promocode_value ?? null,
    created_at: now,
    updated_at: now,
    customer_data: payload.customer_data,
    positions: payload.positions.map((pos) => ({
      id: pos.id,
      product_name: `Товар ${pos.id}`,
      color: "",
      size: "",
      quantity: pos.quantity,
      product_image: "/images/catalogs/mock/tshirt-green.svg",
    })),
    delivery_data: {
      full_address:
        payload.cdek_delivery_data?.full_address ??
        payload.yandex_delivery_data?.full_address ??
        "",
      pvz_code: payload.cdek_delivery_data?.pvz_code,
    },
  };

  orders = [order, ...orders];
  return order;
};
