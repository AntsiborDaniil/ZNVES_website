"use client";

import { useState } from "react";
import Header from "../../components/Header/Header";
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
