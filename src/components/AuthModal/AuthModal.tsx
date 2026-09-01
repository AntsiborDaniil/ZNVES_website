"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import AccountAuth from "../AccountAuth/AccountAuth";
import styles from "./AuthModal.module.css";

const AuthModal = () => {
  const router = useRouter();
  const { isAuthOpen, authModalMode, closeAuth, isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPasswordResetInProgress, setIsPasswordResetInProgress] = useState(false);

  useEffect(() => {
    if (isAuthOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsActive(true));
      });
      document.body.style.overflow = "hidden";
      return;
    }

    setIsActive(false);
    document.body.style.overflow = "";

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [isAuthOpen]);

  useEffect(() => {
    if (!isAuthOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAuth();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isAuthOpen, closeAuth]);

  useEffect(() => {
    if (isAuthenticated && isAuthOpen && !isPasswordResetInProgress) {
      closeAuth();
    }
  }, [isAuthenticated, isAuthOpen, isPasswordResetInProgress, closeAuth]);

  const handleAuthenticated = useCallback(() => {
    closeAuth();
    router.push("/account");
  }, [closeAuth, router]);

  const handleClose = useCallback(() => {
    closeAuth();
  }, [closeAuth]);

  if (!isVisible && !isAuthOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isActive ? styles.overlayVisible : ""}`}
      onClick={handleClose}
      aria-hidden={!isActive}
    >
      <div
        className={`${styles.content} ${isActive ? styles.contentVisible : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Личный кабинет"
        aria-hidden={!isActive}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 5L19 19M19 5L5 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <AccountAuth
          key={authModalMode}
          variant="modal"
          initialMode={authModalMode}
          redirectOnSuccess={false}
          onAuthenticated={handleAuthenticated}
          onPasswordResetFlowChange={setIsPasswordResetInProgress}
        />
      </div>
    </div>
  );
};

export default AuthModal;
