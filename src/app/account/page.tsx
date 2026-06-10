"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import MyAccount from "../../components/AccountPage/MyAccount/MyAccount";
import Orders from "../../components/AccountPage/Orders/Orders";
import TelegramLoginWidget from "../../components/TelegramLoginWidget/TelegramLoginWidget";
import LoadingStub from "../../components/LoadingStub/LoadingStub";
import styles from "./page.module.css";

const AccountPage = () => {
  const { isAuthenticated, isLoading, checkAuth, redirectToBot } = useAuth();
  const [activeTab, setActiveTab] = useState<"account" | "profile" | "orders">(
    "account"
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(
    undefined
  );
  const [widgetKey, setWidgetKey] = useState(0);

  // При загрузке/перезагрузке страницы аккаунта всегда запрашиваем данные пользователя с бэка (GET /api/auth/user/)
  useEffect(() => {
    checkAuth(true);
  }, [checkAuth]);

  // После возврата на вкладку перемонтируем виджет (checkAuth на focus — в AuthContext)
  useEffect(() => {
    if (isAuthenticated) return;
    const handleReturn = () => {
      if (document.visibilityState !== "visible") return;
      setWidgetKey((k) => k + 1);
    };
    window.addEventListener("focus", handleReturn);
    document.addEventListener("visibilitychange", handleReturn);
    return () => {
      window.removeEventListener("focus", handleReturn);
      document.removeEventListener("visibilitychange", handleReturn);
    };
  }, [isAuthenticated]);

  // Пока не получили ответ от бэка — показываем заглушку загрузки
  if (isLoading) {
    return (
      <div className={styles.accountPage}>
        <Header variant="green" />
        <main className={styles.main}>
          <div className={styles.loadingStubWrap}>
            <LoadingStub label="Проверка авторизации…" />
          </div>
        </main>
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }

  // Бэк вернул не 200 или без данных — показываем виджет входа
  if (!isAuthenticated) {
    return (
      <div className={styles.accountPage}>
        <Header variant="green" />
        <main className={styles.main}>
          <div className={styles.telegramLoginBlock}>
            <h1 className={styles.telegramLoginTitle}>Войдите через Telegram</h1>
            <p className={styles.telegramLoginDescription}>
              Нажмите кнопку ниже — откроется сервис Telegram; после входа вас перенаправит в бота для завершения регистрации.
            </p>
            <TelegramLoginWidget
              key={`tg-widget-${widgetKey}`}
              size="large"
              className={styles.telegramLoginWidget}
            />
            <p className={styles.telegramLoginHint}>
              Если после входа вас не перенаправило в Telegram — обновите страницу и нажмите кнопку ещё раз.
            </p>
            <button
              type="button"
              className={styles.telegramLoginRetry}
              onClick={redirectToBot}
            >
              Открыть бота вручную
            </button>
          </div>
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
