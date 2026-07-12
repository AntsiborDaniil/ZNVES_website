"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import MyAccount from "../../components/AccountPage/MyAccount/MyAccount";
import Orders from "../../components/AccountPage/Orders/Orders";
import AccountAuth from "../../components/AccountAuth/AccountAuth";
import styles from "./page.module.css";

const AccountPage = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState<"account" | "profile" | "orders">(
    "account"
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(
    undefined
  );

  const authCheckedRef = useRef(false);

  useEffect(() => {
    if (authCheckedRef.current) return;
    authCheckedRef.current = true;
    void checkAuth(true);
  }, [checkAuth]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className={styles.accountPage}>
        <Header variant="green" />
        <main className={styles.main}>
          <p className={styles.loadingText}>Загрузка…</p>
        </main>
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.accountPage}>
        <Header variant="green" />
        <main className={styles.main}>
          <AccountAuth />
        </main>
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
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
          <Link href="/catalog" className={styles.backLink} prefetch={false}>
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
