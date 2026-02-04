"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./CartOrderErrorModal.module.css";

type CartOrderErrorModalProps = {
  message: string;
  onClose: () => void;
};

const CartOrderErrorModal = ({ message, onClose }: CartOrderErrorModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Image
            src="/images/login/cancel-btn.png"
            alt="Закрыть"
            width={24}
            height={24}
            loading="lazy"
          />
        </button>
        <h2 className={styles.modalTitle}>Ошибка оформления заказа</h2>
        <p className={styles.modalText}>{message}</p>
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onClose}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOrderErrorModal;
