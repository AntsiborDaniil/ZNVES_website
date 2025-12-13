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
          <div className={styles.cardContentInner}>
            <div className={styles.cardContentInnerLeft}>
              <h1 className={styles.cardHeader}>Личные данные</h1>
              <h1 className={styles.cardTitle}>
                Смирнов Александр Александрович
              </h1>
            </div>
            <Image
              src="/images/account/arrowRight.png"
              alt="Стрелка"
              width={41}
              height={39}
              className={styles.thumbnailImageArrow}
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoItem}>abvgd@mail.com</div>
            <div className={styles.cardInfoItem}>+7 (977) 721-04-52</div>
          </div>
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
          <div className={styles.cardContentInner}>
            <div className={styles.cardContentInnerLeft}>
              <h1 className={styles.cardHeader}>Активные заказы</h1>
              <h1 className={styles.cardTitleCart}>Заказ от 24.09.2025</h1>
            </div>
            <Image
              src="/images/account/arrowRight.png"
              alt="Стрелка"
              width={41}
              height={39}
              className={styles.thumbnailImageArrow}
            />
          </div>
          <div className={styles.orderDetailsContainer}>
            <div className={styles.orderDetailsLeft}>
              <div className={styles.orderDetailsTop}>
                <div className={styles.cardInfoItem}>№456378495</div>
                <div className={styles.orderStatus}>Ожидает оплаты</div>
              </div>
              <div className={styles.orderDetailsBottom}>
                <div className={styles.orderState}>
                  <span>•</span>{" "}
                  <h2 className={styles.orderStateText}>Новый (не оплачен)</h2>
                </div>
              </div>
            </div>
            <div className={styles.orderDetailsRight}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
