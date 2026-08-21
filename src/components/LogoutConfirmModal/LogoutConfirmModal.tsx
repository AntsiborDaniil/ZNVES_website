"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./LogoutConfirmModal.module.css";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const LogoutConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: LogoutConfirmModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) onCancel();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={() => !isLoading && onCancel()}>
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
      >
        <h2 id="logout-confirm-title" className={styles.title}>
          Выйти из аккаунта?
        </h2>
        <p className={styles.text}>Вы уверены, что хотите выйти?</p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isLoading}
          >
            Отмена
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Выход…" : "Выйти"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutConfirmModal;
