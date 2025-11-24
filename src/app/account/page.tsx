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
        <div className={styles.aside}>
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
          </nav>
        </div>

        <article className={styles.card}>
          {activeTab === "account" && (
            <MyAccount
              onNavigate={(tab: "profile" | "orders") => setActiveTab(tab)}
            />
          )}
          {activeTab === "profile" && <PersonalData />}
          {activeTab === "orders" && <Orders />}
        </article>
      </main>
    </div>
  );
};

export default AccountPage;
