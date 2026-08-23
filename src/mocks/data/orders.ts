import type { ApiMyOrderItem } from "../../api/order/orderApi";
import { MOCK_DEV_USER } from "../config";

const buyer = {
  full_name: `${MOCK_DEV_USER.first_name} ${MOCK_DEV_USER.last_name}`,
  email: MOCK_DEV_USER.email,
  phone: MOCK_DEV_USER.phone_number,
} as const;

/**
 * Заказы для ЛК: покрывают статусы
 * «Ожидает оплаты» / «Оплачен» / «Доставляется» / «Доставлен».
 */
export const MOCK_INITIAL_ORDERS: ApiMyOrderItem[] = [
  {
    id: "467474",
    total_amount: "20 000 ₽",
    status: "Ожидает оплаты",
    payment_type: "sberbank",
    delivery_service: "cdek",
    created_at: "2026-08-17T10:00:00.000Z",
    updated_at: "2026-08-17T10:00:00.000Z",
    customer_data: { ...buyer },
    positions: [
      {
        id: "a1b2c3d4-e5f6-4789-a012-3456789abc01",
        product_name: "ZNVES SKI SUIT",
        color: "black",
        size: "m",
        quantity: 1,
        product_image: "/images/catalogs/mock/ski-suit-1.png",
      },
      {
        id: "a1b2c3d4-e5f6-4789-a012-3456789abc02",
        product_name: "ZIP HOODIE",
        color: "green",
        size: "m",
        quantity: 1,
        product_image: "/images/catalogs/mock/zip-hoodie-green.svg",
      },
    ],
    delivery_data: {
      pvz_code: "MSK1",
      full_address: MOCK_DEV_USER.delivery_data.cdek_full_pvz_address,
    },
  },
  {
    id: "467475",
    total_amount: "20 000 ₽",
    status: "Оплачен",
    payment_type: "card",
    delivery_service: "yandex",
    created_at: "2026-08-17T14:30:00.000Z",
    updated_at: "2026-08-17T15:00:00.000Z",
    customer_data: { ...buyer },
    positions: [
      {
        id: "b1b2c3d4-e5f6-4789-a012-3456789abc03",
        product_name: "T-SHIRT VOYAGE",
        color: "green",
        size: "s",
        quantity: 2,
        product_image: "/images/catalogs/mock/tshirt-green.svg",
      },
      {
        id: "b1b2c3d4-e5f6-4789-a012-3456789abc04",
        product_name: "BAG",
        color: "black",
        size: "os",
        quantity: 1,
        product_image: "/images/catalogs/mock/bag-1.png",
      },
    ],
    delivery_data: {
      full_address: "г Москва, ул Голубинская",
    },
  },
  {
    id: "467476",
    total_amount: "18 500 ₽",
    status: "Доставляется",
    payment_type: "yandexpay",
    delivery_service: "yandex",
    created_at: "2026-08-10T11:15:00.000Z",
    updated_at: "2026-08-12T16:40:00.000Z",
    customer_data: { ...buyer },
    positions: [
      {
        id: "c1b2c3d4-e5f6-4789-a012-3456789abc05",
        product_name: "ZNVES SKI SUIT",
        color: "navy",
        size: "l",
        quantity: 1,
        product_image: "/images/catalogs/mock/ski-suit-2.png",
      },
      {
        id: "c1b2c3d4-e5f6-4789-a012-3456789abc06",
        product_name: "ZIP HOODIE",
        color: "blue",
        size: "l",
        quantity: 1,
        product_image: "/images/catalogs/mock/zip-hoodie-blue.svg",
      },
    ],
    delivery_data: {
      pvz_code: "MSK2",
      full_address: MOCK_DEV_USER.delivery_data.yandex_full_pvz_address,
    },
  },
  {
    id: "467477",
    total_amount: "12 990 ₽",
    status: "Доставлен",
    payment_type: "prepayment",
    delivery_service: "cdek",
    created_at: "2026-08-05T09:00:00.000Z",
    updated_at: "2026-08-05T18:00:00.000Z",
    customer_data: { ...buyer },
    positions: [
      {
        id: "d1b2c3d4-e5f6-4789-a012-3456789abc07",
        product_name: "HOODIE",
        color: "grey",
        size: "m",
        quantity: 1,
        product_image: "/images/catalogs/mock/hoodie-gray.svg",
      },
      {
        id: "d1b2c3d4-e5f6-4789-a012-3456789abc08",
        product_name: "BAG LOW",
        color: "beige",
        size: "os",
        quantity: 1,
        product_image: "/images/catalogs/mock/bag-low-1.png",
      },
    ],
    delivery_data: {
      pvz_code: "MSK3",
      full_address: `${MOCK_DEV_USER.delivery_data.city}, ул. ${MOCK_DEV_USER.delivery_data.street}, ${MOCK_DEV_USER.delivery_data.house}, кв. ${MOCK_DEV_USER.delivery_data.apartment}`,
    },
  },
];
