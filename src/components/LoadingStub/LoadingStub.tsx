"use client";

import styles from "./LoadingStub.module.css";

type LoadingStubProps = {
  /** Текст под индикатором */
  label?: string;
  /** Компактный вариант (без растягивания на весь экран) */
  inline?: boolean;
};

export default function LoadingStub({ label = "Загрузка…", inline }: LoadingStubProps) {
  return (
    <div className={inline ? styles.inline : styles.wrapper}>
      <div className={styles.spinner} aria-hidden />
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
}
