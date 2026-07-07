"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "znves:cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Уведомление об использовании cookie">
      <div className={styles.inner}>

        <div className={styles.iconWrap} aria-hidden="true">
          {/* Чистая иконка печенья */}
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Тень */}
            <ellipse cx="40" cy="73" rx="22" ry="4" fill="#bcb4a5" opacity="0.35"/>
            {/* Тело — немного неровный круг как настоящее печенье */}
            <path
              d="M40 7 C47 6 54 9 59 14 C65 20 68 28 67 36 C66 44 61 51 54 56 C47 61 38 63 30 60 C22 58 15 52 12 44 C9 36 10 27 15 20 C20 13 27 7 34 6 C36 5.5 38 6.5 40 7Z"
              fill="#d4a96a"
            />
            {/* Внутренняя текстура — чуть темнее снизу */}
            <path
              d="M40 7 C47 6 54 9 59 14 C63 19 66 26 66 34 C56 31 48 33 43 39 C38 45 38 54 43 60 C41 61 39 62 37 62 C34 62 31 61 29 60 C22 58 15 52 12 44 C9 36 10 27 15 20 C20 13 27 7 34 6 C36 5.5 38 6.5 40 7Z"
              fill="#c8954f"
              opacity="0.45"
            />
            {/* Шоколадные капли — аккуратные */}
            <ellipse cx="28" cy="24" rx="4" ry="3.5" fill="#4a2810" transform="rotate(-15 28 24)"/>
            <ellipse cx="44" cy="20" rx="3.5" ry="3" fill="#4a2810" transform="rotate(10 44 20)"/>
            <ellipse cx="20" cy="38" rx="3.5" ry="3" fill="#4a2810" transform="rotate(-20 20 38)"/>
            <ellipse cx="36" cy="34" rx="4" ry="3.5" fill="#4a2810" transform="rotate(5 36 34)"/>
            <ellipse cx="52" cy="32" rx="3" ry="2.8" fill="#4a2810" transform="rotate(15 52 32)"/>
            <ellipse cx="30" cy="48" rx="4" ry="3" fill="#4a2810" transform="rotate(-10 30 48)"/>
            <ellipse cx="48" cy="46" rx="3.5" ry="3" fill="#4a2810" transform="rotate(20 48 46)"/>
          </svg>
        </div>

        <p className={styles.text}>
          Мы используем файлы cookie для корректной работы сайта.{" "}
          <Link href="/privacy" className={styles.link}>
            Политика конфиденциальности
          </Link>
        </p>

        <button
          type="button"
          className={styles.acceptBtn}
          onClick={handleAccept}
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
