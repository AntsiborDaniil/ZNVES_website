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

      <button type="button" className={styles.acceptBtn} onClick={acceptCookies}>
        Принять
      </button>
    </div>,
    document.body
  );
};

export default CookieBanner;
