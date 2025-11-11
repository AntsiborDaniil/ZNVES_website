"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AuthHeader.module.css";

type AuthHeaderProps = {
  title: string;
};

const AuthHeader = ({ title }: AuthHeaderProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBack = () => {
    if (!isMounted) {
      router.push("/");
      return;
    }

    // Используем router.back() - Next.js безопасно обработает это
    router.back();
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <header className={styles.authHeader}>
      <button
        className={styles.backButton}
        onClick={handleBack}
        aria-label="Назад"
        type="button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className={styles.title}>{title}</h1>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Закрыть"
        type="button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
};

export default AuthHeader;
