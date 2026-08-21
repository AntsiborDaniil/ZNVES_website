"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import Orders from "../../components/AccountPage/Orders/Orders";
import AccountAuthCheckFallback from "../../components/AccountPage/AccountAuthCheckFallback/AccountAuthCheckFallback";
import styles from "./page.module.css";

type AccountTab = "profile" | "orders";

const parseTab = (value: string | null): AccountTab =>
  value === "orders" ? "orders" : "profile";

const AccountPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, isAuthReady, checkAuth, requestLogout } =
    useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>(() =>
    parseTab(searchParams.get("tab"))
  );
  const [ordersHeading, setOrdersHeading] = useState("Заказы");

  const authCheckedRef = useRef(false);

  useEffect(() => {
    if (!isAuthReady || authCheckedRef.current) return;
    authCheckedRef.current = true;
    void checkAuth(true);
  }, [isAuthReady, checkAuth]);

  useEffect(() => {
    const nextTab = parseTab(searchParams.get("tab"));
    setActiveTab(nextTab);
    if (nextTab !== "orders") setOrdersHeading("Заказы");
  }, [searchParams]);

  const goToTab = (tab: AccountTab) => {
    setActiveTab(tab);
    if (tab !== "orders") setOrdersHeading("Заказы");
    router.replace(`/account?tab=${tab}`, { scroll: false });
  };

  if (!isAuthReady || (isLoading && !isAuthenticated)) {
    return (
      <div className={styles.accountPage}>
        <Header />
        <AccountAuthCheckFallback />
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.accountPage}>
        <Header />
        <AccountAuthCheckFallback />
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accountPage}>
      <Header />
      <nav className={styles.mobileNav}>
        <button
          type="button"
          className={`${styles.mobileNavItem} ${
            activeTab === "profile" ? styles.mobileNavItemActive : ""
          }`}
          onClick={() => goToTab("profile")}
        >
          Личный кабинет
        </button>
        <span className={styles.mobileNavSeparator} />
        <button
          type="button"
          className={`${styles.mobileNavItem} ${
            activeTab === "orders" ? styles.mobileNavItemActive : ""
          }`}
          onClick={() => goToTab("orders")}
        >
          Мои заказы
        </button>
        <span className={styles.mobileNavSeparator} />
        <button
          type="button"
          className={styles.mobileNavItem}
          onClick={requestLogout}
        >
          Выйти
        </button>
      </nav>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <p className={styles.breadcrumbs}>
            <Link href="/" prefetch={false}>
              Главная
            </Link>
            <span> / </span>
            <Link href="/account?tab=profile" prefetch={false}>
              Личный кабинет
            </Link>
            <span> / </span>
            <span className={styles.breadcrumbCurrent}>
              {activeTab === "orders" ? "Заказы" : "Профиль"}
            </span>
          </p>

          <h1 className={styles.asideTitle}>
            {activeTab === "orders" ? ordersHeading : "Профиль"}
          </h1>

          <nav className={styles.sideNav} aria-label="Разделы кабинета">
            <button
              type="button"
              className={`${styles.sideNavItem} ${
                activeTab === "profile" ? styles.sideNavItemActive : ""
              }`}
              onClick={() => goToTab("profile")}
            >
              Личный кабинет
            </button>
            <button
              type="button"
              className={`${styles.sideNavItem} ${
                activeTab === "orders" ? styles.sideNavItemActive : ""
              }`}
              onClick={() => goToTab("orders")}
            >
              Мои заказы
            </button>
            <button
              type="button"
              className={styles.sideNavItem}
              onClick={requestLogout}
            >
              Выйти
            </button>
          </nav>
        </aside>

        <article className={styles.card}>
          <h1 className={styles.mobilePageTitle}>
            {activeTab === "orders" ? ordersHeading : "Профиль"}
          </h1>
          {activeTab === "profile" && <PersonalData />}
          {activeTab === "orders" && (
            <Orders
              onOrderSelect={(order) =>
                setOrdersHeading(order?.title ?? "Заказы")
              }
            />
          )}
        </article>
      </main>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};

const AccountPage = () => (
  <Suspense
    fallback={
      <div className={styles.accountPage}>
        <Header />
        <AccountAuthCheckFallback />
        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    }
  >
    <AccountPageContent />
  </Suspense>
);

export default AccountPage;
