// API для авторизации через Telegram
// В BotFather → бот → Domain должен быть: znves-website.vercel.app (домен фронта с виджетом)

import { API_BASE_URL } from "../../lib/apiConfig";

/** Временно отключить ручку telegram-login (не вызывать бэкенд и не показывать вход через Telegram). */
const TELEGRAM_LOGIN_DISABLED = true;

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

/**
 * Проверяет авторизацию пользователя через Telegram
 * GET запрос, не требует параметров
 * После регистрации в боте возвращает заполненные данные
 */
/** URL, на который Telegram редиректит после успешного входа (ручка бэкенда). */
export const getTelegramLoginCallbackUrl = (): string => TELEGRAM_LOGIN_URL;

/**
 * URL страницы на бэкенде для входа через Telegram (виджет там работает, CORS с продом настроен).
 * После входа пользователь может вернуться на фронт — куки уйдут с запросами на бэк.
 * @param returnTo — опционально URL для редиректа после входа (бэк может поддерживать return_url)
 */
export const getTelegramLoginRedirectUrl = (returnTo?: string): string => {
  const base = API_BASE_URL.replace(/\/$/, "");
  if (returnTo) {
    return `${base}?return_url=${encodeURIComponent(returnTo)}`;
  }
  return base;
};

export const checkTelegramAuth = async (): Promise<TelegramAuthData | null> => {
  if (TELEGRAM_LOGIN_DISABLED) {
    return null;
  }
  try {
    console.log("Checking Telegram auth, URL:", TELEGRAM_LOGIN_URL);
    
    const response = await fetch(TELEGRAM_LOGIN_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      // Если пользователь не авторизован или неверный запрос — возвращаем null
      if (response.status === 400 || response.status === 401 || response.status === 403) {
        console.log("User not authenticated or bad request:", response.status);
        return null;
      }
      const errorText = await response.text();
      console.error(`Telegram auth API error: ${response.status}`, errorText);
      return null;
    }

    const data: TelegramAuthData = await response.json();
    
    // Выводим данные в консоль как требуется
    console.log("Telegram auth data:", data);
    
    return data;
  } catch (error) {
    // Обрабатываем разные типы ошибок
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.warn(
        "Failed to fetch Telegram auth. Possible causes:",
        "- CORS issue (server needs to allow requests from this origin)",
        "- Network error (server might be down)",
        "- URL might be incorrect"
      );
      console.warn("Auth check failed, user will be redirected to bot on next action");
    } else {
      console.error("Error checking Telegram auth:", error);
    }
    // Возвращаем null при любой ошибке - это означает, что пользователь не авторизован
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

