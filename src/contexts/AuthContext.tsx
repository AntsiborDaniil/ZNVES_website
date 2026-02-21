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
/** Кеш при загрузке: если данные сохранены не более N минут назад — не дергаем API. */
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 мин
/** При focus/visibility не делаем запрос, если последняя проверка была не более N минут назад. */
const RECHECK_INTERVAL_MS = 15 * 60 * 1000; // 15 мин

type StoredAuth = { user: AuthUser | null; savedAt: number };

const getAuthFromStorage = (): StoredAuth => {
  if (typeof window === "undefined") {
    return { user: null, savedAt: 0 };
  }
  try {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return { user: null, savedAt: 0 };
    const parsed = JSON.parse(stored) as StoredAuth;
    const user = parsed?.user ?? null;
    const savedAt = typeof parsed?.savedAt === "number" ? parsed.savedAt : 0;
    return { user, savedAt };
  } catch {
    return { user: null, savedAt: 0 };
  }
};

const saveAuthToStorage = (user: AuthUser | null) => {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredAuth = { user, savedAt: Date.now() };
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  /** При загрузке был свежий кеш — не дергаем API при mount. */
  const [cacheFreshOnLoad, setCacheFreshOnLoad] = useState(false);

  // Кеш с TTL: при гидрации читаем sessionStorage; если данные свежие (< 10 мин) — API не вызываем.
  useEffect(() => {
    const { user: storedUser, savedAt } = getAuthFromStorage();
    setUser(storedUser);
    setIsHydrated(true);
    setIsLoading(false);
    const fresh = !!(storedUser && savedAt && Date.now() - savedAt <= CACHE_TTL_MS);
    setCacheFreshOnLoad(fresh);
  }, []);

  // Проверка авторизации только на клиенте. Редкий re-check: не дергаем API, если недавно уже проверяли.
  const checkAuth = useCallback(async () => {
    if (typeof window === "undefined" || !isHydrated) return;

    const { savedAt } = getAuthFromStorage();
    if (savedAt && Date.now() - savedAt < RECHECK_INTERVAL_MS) {
      return; // уже проверяли недавно
    }

    setIsLoading(true);
    try {
      const authData = await checkTelegramAuth();
      setUser(authData);
      saveAuthToStorage(authData);

      if (authData && typeof window !== "undefined" && window.location.pathname !== "/account") {
        window.location.href = "/account";
      }
    } catch {
      setUser(null);
      saveAuthToStorage(null);
    } finally {
      setIsLoading(false);
    }
  }, [isHydrated]);

  // При загрузке вызываем API только если кеш пустой или протух (иначе уже подставили из кеша).
  useEffect(() => {
    if (!isHydrated || cacheFreshOnLoad) return;
    checkAuth();
  }, [isHydrated, cacheFreshOnLoad, checkAuth]);

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

