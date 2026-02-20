"use client";

import { useEffect, useState } from "react";
import styles from "./PromoErrorToast.module.css";

type PromoErrorToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

const PromoErrorToast = ({ message, onClose, duration = 3500 }: PromoErrorToastProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const timer = setTimeout(() => {
      setIsClosing(true);
      closeTimer = setTimeout(onClose, 300);
    }, duration);
    return () => {
      clearTimeout(timer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${isClosing ? styles.toastClosing : ""}`}
      role="alert"
    >
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
};

export default PromoErrorToast;
