"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { getCurrentUser, type AuthUser } from "../api/auth/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  isAuthReady: boolean;
  isAuthOpen: boolean;
  authModalMode: "login" | "register";
  checkAuth: (forceRefresh?: boolean) => Promise<void>;
  updateUser: (user: AuthUser | null) => void;
  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "znves:auth";
const CACHE_TTL_MS = 10 * 60 * 1000;
const RECHECK_INTERVAL_MS = 15 * 60 * 1000;

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
    return;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cacheFreshOnLoad, setCacheFreshOnLoad] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const { user: storedUser, savedAt } = getAuthFromStorage();
    setUser(storedUser);
    setIsHydrated(true);
    const fresh = !!(storedUser && savedAt && Date.now() - savedAt <= CACHE_TTL_MS);
    setCacheFreshOnLoad(fresh);
    if (fresh) {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async (forceRefresh?: boolean) => {
    if (typeof window === "undefined" || !isHydrated) return;

    if (!forceRefresh) {
      const { user: cachedUser, savedAt } = getAuthFromStorage();
      if (
        cachedUser &&
        savedAt &&
        Date.now() - savedAt < RECHECK_INTERVAL_MS
      ) {
        setIsLoading(false);
        return;
      }
    }

    const shouldShowLoading = !forceRefresh || user !== null;
    if (shouldShowLoading) {
      setIsLoading(true);
    }

    try {
      const authData = await getCurrentUser();
      setUser(authData);
      saveAuthToStorage(authData);
    } catch {
      setUser(null);
      saveAuthToStorage(null);
    } finally {
      setIsLoading(false);
    }
  }, [isHydrated, user]);

  useEffect(() => {
    if (!isHydrated || cacheFreshOnLoad) return;
    void checkAuth();
  }, [isHydrated, cacheFreshOnLoad, checkAuth]);

  const updateUser = useCallback((newUser: AuthUser | null) => {
    setUser(newUser);
    saveAuthToStorage(newUser);
    if (newUser) {
      setIsLoading(false);
    }
  }, []);

  const openAuth = useCallback((mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const handleFocus = () => {
      void checkAuth(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void checkAuth(true);
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
        isAuthReady: isHydrated,
        isAuthOpen,
        authModalMode,
        checkAuth,
        updateUser,
        openAuth,
        closeAuth,
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
