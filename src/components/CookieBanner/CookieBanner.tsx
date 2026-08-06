"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "znves:cookie_consent";

const CookieBanner = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const acceptCookies = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, [pathname]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={styles.banner}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="73" rx="22" ry="4" fill="#bcb4a5" opacity="0.35"/>
          <path
            d="M40 7 C47 6 54 9 59 14 C65 20 68 28 67 36 C66 44 61 51 54 56 C47 61 38 63 30 60 C22 58 15 52 12 44 C9 36 10 27 15 20 C20 13 27 7 34 6 C36 5.5 38 6.5 40 7Z"
            fill="#d4a96a"
          />
          <path
            d="M40 7 C47 6 54 9 59 14 C63 19 66 26 66 34 C56 31 48 33 43 39 C38 45 38 54 43 60 C41 61 39 62 37 62 C34 62 31 61 29 60 C22 58 15 52 12 44 C9 36 10 27 15 20 C20 13 27 7 34 6 C36 5.5 38 6.5 40 7Z"
            fill="#c8954f"
            opacity="0.45"
          />
          <ellipse cx="28" cy="24" rx="4" ry="3.5" fill="#4a2810" transform="rotate(-15 28 24)"/>
          <ellipse cx="44" cy="20" rx="3.5" ry="3" fill="#4a2810" transform="rotate(10 44 20)"/>
          <ellipse cx="20" cy="38" rx="3.5" ry="3" fill="#4a2810" transform="rotate(-20 20 38)"/>
          <ellipse cx="36" cy="34" rx="4" ry="3.5" fill="#4a2810" transform="rotate(5 36 34)"/>
          <ellipse cx="52" cy="32" rx="3" ry="2.8" fill="#4a2810" transform="rotate(15 52 32)"/>
          <ellipse cx="30" cy="48" rx="4" ry="3" fill="#4a2810" transform="rotate(-10 30 48)"/>
          <ellipse cx="48" cy="46" rx="3.5" ry="3" fill="#4a2810" transform="rotate(20 48 46)"/>
        </svg>
      </div>

      <div className={styles.content}>
        <p className={styles.title} id="cookie-consent-title">
          Мы используем cookie
        </p>
        <p className={styles.text} id="cookie-consent-description">
          Для корректной работы сайта.{" "}
          <Link href="/privacy" className={styles.link}>
            Подробнее
          </Link>
        </p>
      </div>

      <button
        type="button"
        className={styles.acceptBtn}
        onClick={acceptCookies}
      >
        Принять
      </button>
    </div>,
    document.body
  );
};

export default CookieBanner;
