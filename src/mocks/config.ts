import { API_BASE_URL } from "../lib/apiConfig";

/** Фиксированный код подтверждения в mock-режиме */
export const MOCK_AUTH_CODE = "123456";

/** Тестовый пользователь ЛК (профиль + адреса доставки). Вход: email / password, код 123456 */
export const MOCK_DEV_USER = {
  email: "dev@znves.ru",
  password: "password123",
  first_name: "Екатерина",
  last_name: "Смирнова",
  phone_number: "+79991234567",
  delivery_data: {
    cdek_full_pvz_address: "Москва, ул. Тверская, 12, ПВЗ СДЭК",
    yandex_full_pvz_address: "Москва, Пятницкая ул., 8, ПВЗ Яндекс",
    city: "Москва",
    street: "Арбат",
    house: "25",
    apartment: "12",
    floor: "3",
    intercom: "12К",
    comment: "Позвонить за 10 минут",
  },
} as const;

/** Включить моки явно: NEXT_PUBLIC_USE_MOCKS=true или `npm run dev:mock` */
export const shouldUseMocks = (): boolean =>
  process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export const getMockApiBase = (): string => API_BASE_URL.replace(/\/$/, "");
