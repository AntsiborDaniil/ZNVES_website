"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "./AuthModal";

const AuthModalRouteHandler = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openAuth, isAuthenticated, isAuthReady } = useAuth();

  useEffect(() => {
    if (pathname === "/login") {
      openAuth("login");
      router.replace("/catalog", { scroll: false });
      return;
    }

    if (pathname === "/register") {
      openAuth("register");
      router.replace("/catalog", { scroll: false });
    }
  }, [pathname, router, openAuth]);

  useEffect(() => {
    if (!isAuthReady || isAuthenticated || pathname !== "/account") return;
    openAuth("login");
  }, [isAuthReady, isAuthenticated, pathname, openAuth]);

  return <AuthModal />;
};

const AuthModalHost = () => (
  <Suspense fallback={null}>
    <AuthModalRouteHandler />
  </Suspense>
);

export default AuthModalHost;
