"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MyAccount.module.css";

interface OrderData {
  id: string;
  date: string;
  status: string;
  products: Array<{
    image: string;
    name: string;
  }>;
}

type MyAccountProps = {
  onNavigate?: (tab: "profile" | "orders", orderId?: string) => void;
};

const MyAccount = ({ onNavigate }: MyAccountProps) => {
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Загружаем последний заказ из sessionStorage
    if (typeof window !== "undefined") {
      try {
        const storedOrders = sessionStorage.getItem("znves:orders");
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          if (parsedOrders.length > 0) {
            // Сортируем заказы по дате (новые первыми) и берем первый
            const sortedOrders = parsedOrders.sort(
              (a: OrderData, b: OrderData) => {
                const dateA = new Date(a.date.split(".").reverse().join("-"));
                const dateB = new Date(b.date.split(".").reverse().join("-"));
                return dateB.getTime() - dateA.getTime();
              }
            );
            setLastOrder(sortedOrders[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load orders from sessionStorage:", error);
      }
    }
  }, []);

  const handlePersonalDataClick = () => {
    onNavigate?.("profile");
  };

  const handleOrdersClick = () => {
    if (lastOrder) {
      onNavigate?.("orders", lastOrder.id);
    } else {
      onNavigate?.("orders");
    }
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

      {lastOrder ? (
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
                <h1 className={styles.cardTitleCart}>
                  Заказ от {lastOrder.date}
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
            <div className={styles.orderDetailsContainer}>
              <div className={styles.orderDetailsLeft}>
                <div className={styles.orderDetailsTop}>
                  <div className={styles.cardInfoItem}>№{lastOrder.id}</div>
                  <div className={styles.orderStatus}>
                    {lastOrder.status === "не оплачен"
                      ? "Ожидает оплаты"
                      : "Оплачен"}
                  </div>
                </div>
                <div className={styles.orderDetailsBottom}>
                  <div className={styles.orderState}>
                    <span>•</span>{" "}
                    <h2 className={styles.orderStateText}>
                      Новый ({lastOrder.status})
                    </h2>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetailsRight}>
                <div className={styles.orderThumbnails}>
                  {lastOrder.products.slice(0, 3).map((product, index) => (
                    <div key={index} className={styles.thumbnail}>
                      <Image
                        src={product.image || "/images/catalogs/placeholder.png"}
                        alt={product.name || "Товар"}
                        width={60}
                        height={60}
                        className={styles.thumbnailImage}
                      />
                    </div>
                  ))}
                  {lastOrder.products.length > 3 && (
                    <div className={styles.thumbnailMore}>
                      +{lastOrder.products.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                <h1 className={styles.cardTitleCart}>Нет активных заказов</h1>
              </div>
              <Image
                src="/images/account/arrowRight.png"
                alt="Стрелка"
                width={41}
                height={39}
                className={styles.thumbnailImageArrow}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
