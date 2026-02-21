"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { checkTelegramAuth, hasAccessToken, redirectToTelegramBot, type AuthUser } from "../api/auth/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  hasAccessToken: () => boolean;
  checkAuth: () => Promise<void>;
  redirectToBot: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "znves:auth";

const getAuthFromStorage = (): AuthUser | null => {
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

const saveAuthToStorage = (user: AuthUser | null) => {
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Кеш: при гидрации подставляем данные из sessionStorage, чтобы не мигать «не авторизован»
  useEffect(() => {
    const storedUser = getAuthFromStorage();
    setUser(storedUser);
    setIsHydrated(true);
    setIsLoading(false);
  }, []);

  // Проверка авторизации: GET /api/auth/user/ с credentials (куки). При response.ok — доступ к кабинету.
  const checkAuth = useCallback(async () => {
    if (!isHydrated) {
      return;
    }

    setIsLoading(true);
    try {
      const authData = await checkTelegramAuth();
      setUser(authData);
      saveAuthToStorage(authData);

      if (authData) {
        if (typeof window !== "undefined" && window.location.pathname !== "/account") {
          window.location.href = "/account";
        }
      }
    } catch (error) {
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

