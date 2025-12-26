"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./OrderSuccessModal.module.css";

type OrderSuccessModalProps = {
  orderNumber: string;
  onClose: () => void;
  onGoToAccount: () => void;
};

const OrderSuccessModal = ({
  orderNumber,
  onClose,
  onGoToAccount,
}: OrderSuccessModalProps) => {
  // Блокируем скролл при открытой модалке
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
          />
        </button>
        <h2 className={styles.modalTitle}>Спасибо за Ваш заказ!</h2>
        <div className={styles.orderNumber}>№{orderNumber}</div>
        <p className={styles.modalText}>
          Отследить ваш заказ Вы можете <br/>в личном кабинете
        </p>
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onGoToAccount}
          >
            Перейти в личный кабинет
          </button>
          <Link href="/catalog" className={styles.secondaryButton}>
            Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
