"use client";

import { useEffect } from "react";
import styles from "./CartOrderErrorModal.module.css";

type CartOrderErrorModalProps = {
  message: string;
  onClose: () => void;
};

const CartOrderErrorModal = ({ message, onClose }: CartOrderErrorModalProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-error-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <h2 id="order-error-title" className={styles.modalTitle}>
          Ошибка оформления
        </h2>
        <p className={styles.modalText}>{message}</p>
        <div className={styles.modalButtons}>
          <button type="button" className={styles.primaryButton} onClick={onClose}>
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOrderErrorModal;
