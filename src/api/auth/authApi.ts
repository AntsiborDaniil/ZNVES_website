// API для авторизации через Telegram

/** Временно отключить запросы к ручке telegram-login (вернёт null без вызова бэкенда) */
const TELEGRAM_LOGIN_DISABLED = true;

import { API_BASE_URL } from "../../lib/apiConfig";

const TELEGRAM_LOGIN_URL = `${API_BASE_URL}/api/auth/telegram-login/`;
const TELEGRAM_BOT_USERNAME = "@my_znves_bot";

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
  const botUsername = TELEGRAM_BOT_USERNAME.replace("@", "").trim();
  // Используем простой URL без параметров - Telegram автоматически откроет бота
  return `https://t.me/${botUsername}`;
};

/**
 * Перенаправляет пользователя на Telegram бота
 */
export const redirectToTelegramBot = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  const botUsername = TELEGRAM_BOT_USERNAME.replace("@", "").trim();
  
  // Определяем, мобильное устройство или нет
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  let url: string;
  
  if (isMobile) {
    // Для мобильных устройств используем tg:// протокол
    url = `tg://resolve?domain=${botUsername}`;
  } else {
    // Для десктопа используем https://t.me/ без параметров
    url = `https://t.me/${botUsername}`;
  }

  console.log("Redirecting to Telegram bot:", url, "Bot username:", botUsername);
  
  try {
    window.location.href = url;
  } catch (error) {
    console.error("Error redirecting to Telegram bot:", error);
    // Fallback на обычный URL
    window.location.href = `https://t.me/${botUsername}`;
  }
};

