"use client";

import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

const Toast = ({ message, onClose, duration = 3500 }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const timer = setTimeout(() => {
      setIsClosing(true);
      closeTimer = setTimeout(() => {
        onClose();
      }, 280);
    }, duration);

    return () => {
      clearTimeout(timer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => onClose(), 280);
  };

  return (
    <div
      className={`${styles.toast} ${isClosing ? styles.toastClosing : ""}`}
      role="status"
      aria-live="polite"
    >
      <p className={styles.toastMessage}>{message}</p>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={handleClose}
        aria-label="Закрыть уведомление"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
