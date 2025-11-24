"use client";

import Image from "next/image";
import styles from "./MyAccount.module.css";

type MyAccountProps = {
  onNavigate?: (tab: "profile" | "orders") => void;
};

const MyAccount = ({ onNavigate }: MyAccountProps) => {
  const handlePersonalDataClick = () => {
    onNavigate?.("profile");
  };

  const handleOrdersClick = () => {
    onNavigate?.("orders");
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={handlePersonalDataClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePersonalDataClick();
          }
        }}
      >
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>Личные данные</div>
          <div className={styles.cardTitle}>
            Смирнов Александр Александрович
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoItem}>abvgd@mail.co.m</div>
            <div className={styles.cardInfoItem}>+7 (977) 721-04-52</div>
          </div>
        </div>
        <div className={styles.cardArrow}>
          <Image
            src="/images/arrow-right.png"
            alt="Перейти"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div
        className={styles.card}
        onClick={handleOrdersClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOrdersClick();
          }
        }}
      >
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>Активные заказы</div>
          <div className={styles.cardTitle}>Заказ от 24.09.2025</div>
          <div className={styles.orderDetails}>
            <div className={styles.orderNumber}>№456378495</div>
            <div className={styles.orderStatus}>Ожидает оплаты</div>
            <div className={styles.orderState}>
              <span>•</span> Новый (<u>не оплачен</u>)
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.orderThumbnails}>
            <div className={styles.thumbnail}>
              <Image
                src="/images/catalogs/voyage.png"
                alt="Товар"
                width={60}
                height={60}
                className={styles.thumbnailImage}
              />
            </div>
            <div className={styles.thumbnail}>
              <Image
                src="/images/catalogs/voyage.png"
                alt="Товар"
                width={60}
                height={60}
                className={styles.thumbnailImage}
              />
            </div>
          </div>
          <div className={styles.cardArrow}>
            <Image
              src="/images/arrow-right.png"
              alt="Перейти"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
