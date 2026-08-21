"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AccountAuthPromptModal.module.css";

type AccountAuthPromptModalProps = {
  onClose: () => void;
  onSkip?: () => void;
};

const AccountAuthPromptModal = ({ onClose, onSkip }: AccountAuthPromptModalProps) => {
  const { openAuth } = useAuth();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Image
            src="/images/login/cancel-btn.png"
            alt="Закрыть"
            width={37}
            height={37}
            loading="lazy"
          />
        </button>

        <h2 className={styles.title} id="auth-modal-title">
          Войдите в личный кабинет
        </h2>

        <p className={styles.description}>
          Авторизуйтесь, чтобы отслеживать заказы и упростить оформление покупок.
        </p>

        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => {
            onClose();
            openAuth("login");
          }}
        >
          Перейти ко входу
        </button>

        <button
          type="button"
          className={styles.skipBtn}
          onClick={() => {
            if (onSkip) {
              onSkip();
              return;
            }
            onClose();
          }}
        >
          Продолжить без входа
        </button>
      </div>
    </div>
  );
};

export default AccountAuthPromptModal;
