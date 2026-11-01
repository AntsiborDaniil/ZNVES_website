"use client";

import styles from "./LoadingStub.module.css";

type LoadingStubProps = {
  /** Текст под индикатором */
  label?: string;
  /** Компактный вариант (без растягивания на весь экран) */
  inline?: boolean;
};

export default function LoadingStub({
  label = "Загрузка…",
  inline,
}: LoadingStubProps) {
  return (
    <div
      className={inline ? styles.inline : styles.wrapper}
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      <div className={styles.mark} aria-hidden>
        <span className={styles.ring} />
        <span className={styles.core} />
      </div>
      {label ? <p className={styles.label}>{label}</p> : null}
    </div>
  );
}
