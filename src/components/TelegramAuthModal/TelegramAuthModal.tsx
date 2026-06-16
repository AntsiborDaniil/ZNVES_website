"use client";

import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./TelegramAuthModal.module.css";

const TelegramLoginWidget = dynamic(
  () =>
    import("../TelegramLoginWidget/TelegramLoginWidget").then((m) => ({
      default: m.default,
    })),
  { ssr: false }
);

type TelegramAuthModalProps = {
  onClose: () => void;
};

const TelegramAuthModal = ({ onClose }: TelegramAuthModalProps) => {
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
        aria-labelledby="tg-auth-modal-title"
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

        <div className={styles.iconWrap} aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#0a5840" />
            <path
              d="M10.5 23.5L35.5 13L29 36L22 29L18 33V27L10.5 23.5Z"
              fill="none"
              stroke="#f2f0ec"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M18 27L22.5 21.5L29 18"
              stroke="#f2f0ec"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className={styles.title} id="tg-auth-modal-title">
          Войдите через Telegram
        </h2>

        <p className={styles.description}>
          Авторизуйтесь, чтобы отслеживать заказы и упростить&nbsp;оформление&nbsp;покупок.
        </p>

        <div className={styles.widgetWrap}>
          <TelegramLoginWidget size="large" radius={4} />
        </div>

        <button
          type="button"
          className={styles.skipBtn}
          onClick={onClose}
        >
          Продолжить без входа
        </button>
      </div>
    </div>
  );
};

export default TelegramAuthModal;
