"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { AuthUser } from "../api/auth/authApi";
import { shopApi, useGetCurrentUserQuery } from "../store/api";
import { useAppDispatch } from "../store/hooks";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: user = null, isLoading, refetch } = useGetCurrentUserQuery(undefined, { refetchOnFocus: true, refetchOnMountOrArgChange: true });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const identityRef = useRef<string | null>(null);

  useEffect(() => {
    // Remove the previous independent auth cache; the API is the session authority.
    try { sessionStorage.removeItem("znves:auth"); } catch { /* storage may be unavailable */ }
    setIsHydrated(true);
  }, []);

  const updateUser = useCallback((newUser: AuthUser | null) => {
    const nextIdentity = newUser?.email ?? null;
    if (identityRef.current !== nextIdentity) {
      dispatch(shopApi.util.resetApiState());
      identityRef.current = nextIdentity;
    }
    void dispatch(shopApi.util.upsertQueryData("getCurrentUser", undefined, newUser));
  }, [dispatch]);

  useEffect(() => {
    if (user === null && isLoading) return;
    const nextIdentity = user?.email ?? null;
    if (identityRef.current !== nextIdentity) updateUser(user);
  }, [user, isLoading, updateUser]);

  const checkAuth = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const openAuth = useCallback((mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setIsAuthOpen(true);
  }, []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user, user, isLoading,
      isAuthReady: isHydrated && !isLoading,
      isAuthOpen, authModalMode, checkAuth, updateUser, openAuth, closeAuth,
    }}>
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
