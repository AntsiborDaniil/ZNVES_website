// API для авторизации через Telegram
// В BotFather → бот → Domain: домен фронта, где отображается виджет (например znves-website.vercel.app)

import { API_BASE_URL } from "../../lib/apiConfig";

/** Только для callback виджета: сюда редиректит Telegram с параметрами. Прямой GET с фронта даёт 400. */
const TELEGRAM_LOGIN_URL = `${API_BASE_URL}/api/auth/telegram-login/`;

/** Имя бота без @ — для виджета Telegram Login */
export const TELEGRAM_BOT_USERNAME = "my_znves_bot";

/** Данные о последних адресах доставки пользователя (для CDEK / Яндекс ПВЗ / курьер) */
export interface AuthUserDeliveryData {
  cdek_full_pvz_address?: string | null;
  yandex_full_pvz_address?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  floor?: string | null;
  intercom?: string | null;
  comment?: string | null;
}

/** Ответ ручки GET /api/auth/user/ — данные авторизованного пользователя (куки) */
export interface AuthUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  /** Последние использованные адреса доставки (может отсутствовать на старых аккаунтах) */
  delivery_data?: AuthUserDeliveryData;
}

export interface TelegramAuthData {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date?: number;
  hash?: string;
  [key: string]: any;
}

const ACCESS_TOKEN_KEY = "access-token";

/**
 * Проверяет наличие access-token (JWT) в куках или в Storage (localStorage/sessionStorage).
 */
export const hasAccessToken = (): boolean => {
  if (typeof window === "undefined") return false;
  if (/(?:^|;\s*)access-token\s*=\s*[^;]+/.test(document.cookie)) return true;
  try {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) return true;
    if (sessionStorage.getItem(ACCESS_TOKEN_KEY)) return true;
  } catch {
    // Доступ к Storage может быть запрещён
  }
  return false;
};

/** @deprecated Используйте hasAccessToken() — проверяет и куки, и Storage */
export const hasAccessTokenCookie = (): boolean => hasAccessToken();

/**
 * URL ручки бэкенда для виджета Telegram.
 * Нужен не для фронта, а для сервиса Telegram: после успешного входа Telegram
 * редиректит пользователя на этот URL с данными (id, first_name, hash и т.д.);
 * бэкенд проверяет hash, выставляет куки и редиректит на бота с start.
 */
export const getTelegramLoginCallbackUrl = (): string => TELEGRAM_LOGIN_URL;

const AUTH_USER_URL = `${API_BASE_URL}/api/auth/user/`;
const AUTH_USER_DELIVERY_URL = `${API_BASE_URL}/api/auth/user/delivery-data/`;

const REGISTER_URL = `${API_BASE_URL}/register/`;
const REGISTER_VERIFY_URL = `${API_BASE_URL}/register/verify/`;
const LOGIN_URL = `${API_BASE_URL}/login/`;
const LOGIN_VERIFY_URL = `${API_BASE_URL}/login/verify/`;
const RESEND_CODE_URL = `${API_BASE_URL}/api/auth/register/resend-code/`;

export type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type VerifyPayload = {
  email: string;
  code: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const parseApiError = async (response: Response, fallback: string): Promise<string> => {
  const text = await response.text();
  try {
    const json = JSON.parse(text) as Record<string, unknown>;
    if (typeof json.detail === "string") return json.detail;
    if (typeof json.message === "string") return json.message;
    if (typeof json.email === "string") return json.email;
    if (Array.isArray(json.email) && typeof json.email[0] === "string") {
      return json.email[0];
    }
    if (typeof json.non_field_errors === "object" && Array.isArray(json.non_field_errors)) {
      const first = json.non_field_errors[0];
      if (typeof first === "string") return first;
    }
  } catch {
    if (text) return text;
  }
  return fallback;
};

const authPost = async (url: string, payload: object): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Не удалось выполнить запрос"));
  }
};

/** Шаг 1 регистрации — отправляет код на почту */
export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  await authPost(REGISTER_URL, payload);
};

/** Шаг 2 регистрации — подтверждение кода, создание пользователя и токены */
export const verifyRegistration = async (payload: VerifyPayload): Promise<void> => {
  await authPost(REGISTER_VERIFY_URL, payload);
};

/** Шаг 1 входа — отправляет код на почту */
export const loginUser = async (payload: LoginPayload): Promise<void> => {
  await authPost(LOGIN_URL, payload);
};

/** Шаг 2 входа — подтверждение кода и получение токенов */
export const verifyLogin = async (payload: VerifyPayload): Promise<void> => {
  await authPost(LOGIN_VERIFY_URL, payload);
};

/** Повторная отправка кода на почту */
export const resendAuthCode = async (email: string): Promise<void> => {
  await authPost(RESEND_CODE_URL, { email });
};

/**
 * Проверка авторизации: GET /api/auth/user/ с credentials (куки).
 * Вызывать только на клиенте — на сервере кук нет, запрос всегда даст 403.
 * Если response.ok — возвращаем данные пользователя, иначе null.
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const response = await fetch(AUTH_USER_URL, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as AuthUser;
    return data && typeof data.username === "string" ? data : null;
  } catch {
    return null;
  }
};

/**
 * Проверка авторизации через ручку GET /api/auth/user/ (куки).
 * Возвращает данные пользователя при успешной авторизации, иначе null.
 */
export const checkTelegramAuth = async (): Promise<AuthUser | null> => {
  return getCurrentUser();
};

/** Тело запроса PATCH /api/auth/user/ — изменение личных данных */
export type UpdateUserPayload = {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
};

/** Тело запроса PATCH /api/auth/user/delivery-data/ — обновление адресов доставки */
export type UpdateUserDeliveryPayload = Partial<{
  cdek_full_pvz_address: string;
  yandex_full_pvz_address: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  intercom: string;
  comment: string;
}>;

/**
 * Изменение личных данных: PATCH /api/auth/user/ с credentials (куки).
 * Тело — поля для обновления (username, first_name, last_name, email, phone_number).
 * Возвращает обновлённые данные пользователя.
 */
export const updateCurrentUser = async (
  payload: UpdateUserPayload
): Promise<AuthUser> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }
  const response = await fetch(AUTH_USER_URL, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    let message = "Не удалось сохранить изменения";
    try {
      const json = JSON.parse(text);
      if (typeof json.detail === "string") message = json.detail;
      else if (typeof json.message === "string") message = json.message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
  const data = (await response.json()) as AuthUser;
  return data;
};

/**
 * Обновление адресов доставки пользователя:
 * PATCH /api/auth/user/delivery-data/ с credentials (куки).
 * Тело — частичное обновление полей доставки (ПВЗ и курьер).
 * Возвращает обновлённый объект delivery_data.
 */
export const updateUserDeliveryData = async (
  payload: UpdateUserDeliveryPayload
): Promise<AuthUserDeliveryData> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }
  const response = await fetch(AUTH_USER_DELIVERY_URL, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    let message = "Не удалось сохранить адрес доставки";
    try {
      const json = JSON.parse(text) as { detail?: string; message?: string };
      if (typeof json.detail === "string") message = json.detail;
      else if (typeof json.message === "string") message = json.message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
  const data = (await response.json()) as AuthUserDeliveryData;
  return data;
};

/**
 * Получает URL для перенаправления на Telegram бота
 */
export const getTelegramBotUrl = (): string => {
  return `https://t.me/${TELEGRAM_BOT_USERNAME}`;
};

/**
 * Перенаправляет пользователя на Telegram бота
 */
export const redirectToTelegramBot = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const url = isMobile
    ? `tg://resolve?domain=${TELEGRAM_BOT_USERNAME}`
    : `https://t.me/${TELEGRAM_BOT_USERNAME}`;

  try {
    window.location.href = url;
  } catch (error) {
    window.location.href = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
  }
};

