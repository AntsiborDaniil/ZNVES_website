"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { checkTelegramAuth, redirectToTelegramBot, type TelegramAuthData } from "../api/auth/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  user: TelegramAuthData | null;
  isLoading: boolean;
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

    setIsLoading(true);
    try {
      const authData = await checkTelegramAuth();
      // Если authData null, это может быть как "не авторизован", так и "ошибка сети"
      // В любом случае считаем пользователя неавторизованным
      setUser(authData);
      saveAuthToStorage(authData);
    } catch (error) {
      // Ошибка уже обработана в checkTelegramAuth, просто устанавливаем null
      console.warn("Auth check completed with error, user considered not authenticated");
      setUser(null);
      saveAuthToStorage(null);
    } finally {
      setIsLoading(false);
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

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
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

