"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { checkTelegramAuth, hasAccessToken, redirectToTelegramBot, type TelegramAuthData } from "../api/auth/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  user: TelegramAuthData | null;
  isLoading: boolean;
  hasAccessToken: () => boolean;
  checkAuth: () => Promise<void>;
  redirectToBot: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "znves:auth";

const getAuthFromStorage = (): TelegramAuthData | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveAuthToStorage = (user: TelegramAuthData | null) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (user) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TelegramAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Загружаем данные из sessionStorage только после монтирования на клиенте
  useEffect(() => {
    const storedUser = getAuthFromStorage();
    setUser(storedUser);
    setIsHydrated(true);
    setIsLoading(false);
  }, []);

  // Проверяем авторизацию на сервере
  const checkAuth = useCallback(async () => {
    if (!isHydrated) {
      return;
    }

    console.log("[Auth] Проверка авторизации: запрос к бэку…");
    setIsLoading(true);
    try {
      const authData = await checkTelegramAuth();
      setUser(authData);
      saveAuthToStorage(authData);

      if (authData) {
        console.log("[Auth] JWT валиден, пользователь авторизован. Редирект на /account при необходимости.");
        if (typeof window !== "undefined" && window.location.pathname !== "/account") {
          window.location.href = "/account";
        }
      } else {
        console.log("[Auth] Ответ бэка без данных пользователя — показываем виджет входа.");
      }
    } catch (error) {
      console.warn("[Auth] checkAuth завершился с ошибкой, пользователь не авторизован:", error);
      setUser(null);
      saveAuthToStorage(null);
    } finally {
      setIsLoading(false);
      console.log("[Auth] Проверка авторизации завершена, isLoading=false.");
    }
  }, [isHydrated]);

  // Сразу проверяем авторизацию при загрузке (важно после возврата с test-znves.ru)
  useEffect(() => {
    if (!isHydrated) return;
    checkAuth();
  }, [isHydrated, checkAuth]);

  // Перенаправление на бота
  const redirectToBot = useCallback(() => {
    redirectToTelegramBot();
  }, []);

  // Проверяем авторизацию только при возврате из бота (фокус/вкладка), не при каждой перезагрузке
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const handleFocus = () => {
      // Проверяем авторизацию при возврате на страницу
      checkAuth();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isHydrated, checkAuth]);

  // Авторизован, если есть данные пользователя с бэка или есть access_token (куки или Storage)
  const isAuthenticated = !!user || hasAccessToken();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        hasAccessToken,
        checkAuth,
        redirectToBot,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

