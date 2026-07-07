import { API_BASE_URL } from "../lib/apiConfig";

/** Фиксированный код подтверждения в mock-режиме */
export const MOCK_AUTH_CODE = "123456";

/** Тестовый пользователь, доступный сразу после включения моков */
export const MOCK_DEV_USER = {
  email: "dev@znves.ru",
  password: "password123",
  first_name: "Dev",
  last_name: "User",
  phone_number: "+79991234567",
} as const;

/** В dev моки включены по умолчанию. Отключить: NEXT_PUBLIC_USE_MOCKS=false */
export const shouldUseMocks = (): boolean => {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "false") return false;
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") return true;
  return process.env.NODE_ENV === "development";
};

export const getMockApiBase = (): string => API_BASE_URL.replace(/\/$/, "");
