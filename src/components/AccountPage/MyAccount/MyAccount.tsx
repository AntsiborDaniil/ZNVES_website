"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { getMyOrders, apiOrderToAccountView, type AccountOrderView } from "../../../api/order/orderApi";
import styles from "./MyAccount.module.css";

type MyAccountProps = {
  onNavigate?: (tab: "profile" | "orders", orderId?: string) => void;
};

const MyAccount = ({ onNavigate }: MyAccountProps) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [lastOrder, setLastOrder] = useState<AccountOrderView | null>(null);

  const displayName = user
    ? [user.last_name, user.first_name].filter(Boolean).join(" ") || user.username || "—"
    : "—";
  const displayEmail = user?.email ?? "—";
  const displayPhone = user?.phone_number ?? "—";

  useEffect(() => {
    if (!isAuthenticated) return;
    getMyOrders(true)
      .then((list) => {
        const first = list[0];
        setLastOrder(first ? apiOrderToAccountView(first) : null);
      })
      .catch(() => setLastOrder(null));
  }, [isAuthenticated]);

  const handlePersonalDataClick = () => {
    if (!isAuthenticated) {
      router.push("/account");
      return;
    }
    onNavigate?.("profile");
  };

  const handleOrdersClick = () => {
    if (!isAuthenticated) {
      router.push("/account");
      return;
    }
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
              <h1 className={styles.cardTitle}>{displayName}</h1>
            </div>
            <Image
              src="/images/account/arrowRight.png"
              alt="Стрелка"
              width={41}
              height={39}
              className={styles.thumbnailImageArrow}
              loading="lazy"
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoItem}>{displayEmail}</div>
            <div className={styles.cardInfoItem}>{displayPhone}</div>
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
                loading="lazy"
              />
            </div>
            <div className={styles.orderDetailsContainer}>
              <div className={styles.orderDetailsLeft}>
                <div className={styles.orderDetailsTop}>
                  <div className={styles.cardInfoItem}>№{lastOrder.id}</div>
                  <div className={styles.orderStatus}>
                    {lastOrder.status === "created" || lastOrder.status?.toLowerCase().includes("не оплачен")
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
                  {lastOrder.products?.slice(0, 3).map((product, index) => (
                    <div key={index} className={styles.thumbnail}>
                      <Image
                        src={product.image || "/images/catalogs/placeholder.png"}
                        alt={product.name || "Товар"}
                        width={60}
                        height={60}
                        className={styles.thumbnailImage}
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {lastOrder.products && lastOrder.products.length > 3 && (
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
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
