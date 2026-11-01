"use client";

import { useEffect } from "react";
import styles from "./OrderConfirmModal.module.css";

export type OrderConfirmField = {
  label: string;
  value: string;
};

type OrderConfirmModalProps = {
  fields: OrderConfirmField[];
  totalLabel: string;
  totalValue: string;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const OrderConfirmModal = ({
  fields,
  totalLabel,
  totalValue,
  isSubmitting = false,
  onConfirm,
  onClose,
}: OrderConfirmModalProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose, isSubmitting]);

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
      role="presentation"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirm-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
          disabled={isSubmitting}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <h2 id="order-confirm-title" className={styles.modalTitle}>
          Подтверждение заказа
        </h2>
        <p className={styles.modalSubtitle}>
          Проверьте данные перед оформлением
        </p>
        <div className={styles.summaryList}>
          {fields.map((field) => (
            <div key={field.label} className={styles.summaryRow}>
              <span className={styles.summaryLabel}>{field.label}</span>
              <span className={styles.summaryValue}>{field.value}</span>
            </div>
          ))}
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span className={styles.summaryLabel}>{totalLabel}</span>
            <span className={styles.summaryValue}>{totalValue}</span>
          </div>
        </div>
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Оформление..." : "Оформить заказ"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Изменить данные
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
