// API для авторизации через Telegram
// В BotFather → бот → Domain: домен фронта, где отображается виджет (например znves-website.vercel.app)

import { API_BASE_URL } from "../../lib/apiConfig";

const TELEGRAM_LOGIN_URL = `${API_BASE_URL}/api/auth/telegram-login/`;
/** Имя бота без @ — для виджета Telegram Login */
export const TELEGRAM_BOT_USERNAME = "my_znves_bot";

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

/**
 * Проверяет авторизацию: GET на ручку с credentials (куки).
 * После входа через виджет бэк выставляет куки — этот запрос их подхватывает.
 */
const AUTH_LOG_PREFIX = "[Auth/telegram-login]";

export const checkTelegramAuth = async (): Promise<TelegramAuthData | null> => {
  try {
    console.log(`${AUTH_LOG_PREFIX} Запрос: GET ${TELEGRAM_LOGIN_URL} (credentials: include, куки уйдут на бэк)`);

    const response = await fetch(TELEGRAM_LOGIN_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    console.log(
      `${AUTH_LOG_PREFIX} Ответ: status=${response.status}, ok=${response.ok}, statusText=${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 400 || response.status === 401 || response.status === 403) {
        console.log(
          `${AUTH_LOG_PREFIX} Нет JWT или бэк отклонил: ${response.status}. Тело:`,
          errorText || "(пусто)"
        );
        return null;
      }
      console.error(
        `${AUTH_LOG_PREFIX} Ошибка бэка ${response.status}:`,
        errorText || "(пусто)"
      );
      return null;
    }

    const data: TelegramAuthData = await response.json();
    console.log(
      `${AUTH_LOG_PREFIX} Всё ок (response.ok=true). Данные пользователя:`,
      data
    );
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.warn(
        `${AUTH_LOG_PREFIX} Запрос не прошёл (Failed to fetch). Возможные причины: CORS, сеть, бэк недоступен.`,
        error
      );
    } else {
      console.error(`${AUTH_LOG_PREFIX} Исключение при проверке авторизации:`, error);
    }
    return null;
  }
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

