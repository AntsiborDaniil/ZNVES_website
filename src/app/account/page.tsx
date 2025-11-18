"use client";

import { useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import MyAccount from "../../components/AccountPage/MyAccount/MyAccount";
import Orders from "../../components/AccountPage/Orders/Orders";
import styles from "./page.module.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<"account" | "profile" | "orders">(
    "account"
  );

  return (
    <div className={styles.accountPage}>
      <AuthHeader title="Личный кабинет" theme="transparent" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Личные данные</h2>
            <nav className={styles.nav}>
              <button
                type="button"
                className={`${styles.navButton} ${
                  activeTab === "account" ? styles.navButtonActive : ""
                }`}
                onClick={() => setActiveTab("account")}
              >
                Мой кабинет
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${
                  activeTab === "profile" ? styles.navButtonActive : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Личные данные
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${
                  activeTab === "orders" ? styles.navButtonActive : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Заказы
              </button>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => {
                  // Handle logout
                  if (typeof window !== "undefined") {
                    window.location.href = "/";
                  }
                }}
              >
                Выйти
              </button>
            </nav>
          </aside>

          <article className={styles.card}>
            {activeTab === "account" && <MyAccount />}
            {activeTab === "profile" && <PersonalData />}
            {activeTab === "orders" && <Orders />}
          </article>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
