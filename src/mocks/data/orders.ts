import type { ApiMyOrderItem } from "../../api/order/orderApi";

export const MOCK_INITIAL_ORDERS: ApiMyOrderItem[] = [
  {
    id: "mock-order-1",
    total_amount: "4990",
    status: "Оплачен",
    payment_type: "prepayment",
    delivery_service: "cdek",
    created_at: "2026-06-01T10:00:00.000Z",
    updated_at: "2026-06-02T12:00:00.000Z",
    customer_data: {
      full_name: "Dev User",
      email: "dev@znves.ru",
      phone: "+79991234567",
    },
    positions: [
      {
        id: "wh-tshirt-green-m",
        product_name: "T-SHIRT VOYAGE",
        color: "green",
        size: "m",
        quantity: 1,
        product_image: "/images/catalogs/mock/tshirt-green.svg",
      },
    ],
    delivery_data: {
      pvz_code: "MSK1",
      full_address: "Москва, ул. Примерная, 1",
    },
  },
];
