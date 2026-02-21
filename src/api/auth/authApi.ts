// API для авторизации через Telegram
// В BotFather → бот → Domain: домен фронта, где отображается виджет (например znves-website.vercel.app)

import { API_BASE_URL } from "../../lib/apiConfig";

/** Только для callback виджета: сюда редиректит Telegram с параметрами. Прямой GET с фронта даёт 400. */
const TELEGRAM_LOGIN_URL = `${API_BASE_URL}/api/auth/telegram-login/`;

/** Имя бота без @ — для виджета Telegram Login */
export const TELEGRAM_BOT_USERNAME = "my_znves_bot";

/** Ответ ручки GET /api/auth/user/ — данные авторизованного пользователя (куки) */
export interface AuthUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
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
    console.error("Error redirecting to Telegram bot:", error);
    window.location.href = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
  }
};

