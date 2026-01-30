"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import MyAccount from "../../components/AccountPage/MyAccount/MyAccount";
import Orders from "../../components/AccountPage/Orders/Orders";
import styles from "./page.module.css";

const AccountPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, redirectToBot } = useAuth();
  const [activeTab, setActiveTab] = useState<"account" | "profile" | "orders">(
    "account"
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(
    undefined
  );

  // Проверяем авторизацию при загрузке страницы
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToBot();
    }
  }, [isAuthenticated, isLoading, redirectToBot]);

  // Проверяем авторизацию при возврате из бота (фокус окна)
  useEffect(() => {
    if (isLoading) {
      return;
    }

    const handleFocus = () => {
      // Проверяем авторизацию при возврате на страницу
      if (!isAuthenticated) {
        redirectToBot();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isAuthenticated) {
        redirectToBot();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, isLoading, redirectToBot]);

  // Показываем загрузку или ничего, если не авторизован
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.accountPage}>
      <Header variant="green" />
      <nav className={styles.mobileNav}>
        <button
          type="button"
          className={`${styles.mobileNavItem} ${
            activeTab === "account" ? styles.mobileNavItemActive : ""
          }`}
          onClick={() => setActiveTab("account")}
        >
          Мой кабинет
        </button>
        <span className={styles.mobileNavSeparator}></span>
        <button
          type="button"
          className={`${styles.mobileNavItem} ${
            activeTab === "profile" ? styles.mobileNavItemActive : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Личные данные
        </button>
        <span className={styles.mobileNavSeparator}></span>
        <button
          type="button"
          className={`${styles.mobileNavItem} ${
            activeTab === "orders" ? styles.mobileNavItemActive : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Заказы
        </button>
      </nav>
      <main className={styles.main}>
        <div className={styles.aside}>
          <Link href="/catalog" className={styles.backLink}>
            Вернуться в каталог
          </Link>
          <h2 className={styles.asideTitle}>Личный кабинет</h2>
          <ul className={styles.navList}>
            <li
              className={`${styles.navListItem} ${
                activeTab === "account" ? styles.navListItemActive : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              Мой кабинет
            </li>
            <li
              className={`${styles.navListItem} ${
                activeTab === "profile" ? styles.navListItemActive : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Личные данные
            </li>
            <li
              className={`${styles.navListItem} ${
                activeTab === "orders" ? styles.navListItemActive : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Заказы
            </li>
          </ul>
        </div>

        <article className={styles.card}>
          {activeTab === "account" && (
            <MyAccount
              onNavigate={(tab: "profile" | "orders", orderId?: string) => {
                setActiveTab(tab);
                if (orderId) {
                  setSelectedOrderId(orderId);
                }
              }}
            />
          )}
          {activeTab === "profile" && <PersonalData />}
          {activeTab === "orders" && (
            <Orders initialOrderId={selectedOrderId} />
          )}
        </article>
      </main>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

export default AccountPage;
