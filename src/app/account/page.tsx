"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PersonalData from "../../components/AccountPage/PersonalData/PersonalData";
import Orders from "../../components/AccountPage/Orders/Orders";
import AccountAuthCheckFallback from "../../components/AccountPage/AccountAuthCheckFallback/AccountAuthCheckFallback";
import {
  isProfileStandaloneView,
  navigateToAccount,
  parseAccountTab,
  type AccountTab,
} from "../../lib/accountNavigation";
import styles from "./page.module.css";

const AccountPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, isAuthReady, checkAuth } = useAuth();
  const activeTab = parseAccountTab(searchParams.get("tab"));
  const [ordersHeading, setOrdersHeading] = useState("Заказы");
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [ordersListKey, setOrdersListKey] = useState(0);

  const authCheckedRef = useRef(false);

  useEffect(() => {
    if (!isAuthReady || authCheckedRef.current) return;
    authCheckedRef.current = true;
    void checkAuth(true);
  }, [isAuthReady, checkAuth]);

  useEffect(() => {
    if (activeTab !== "orders") setOrdersHeading("Заказы");
    if (activeTab !== "profile") setIsPasswordMode(false);
  }, [activeTab]);

  const isStandaloneProfile =
    activeTab === "profile" &&
    isProfileStandaloneView(searchParams.get("view"));

  const goToTab = (tab: AccountTab) => {
    setIsPasswordMode(false);
    if (tab !== "orders") setOrdersHeading("Заказы");
    if (tab === "orders") {
      setOrdersHeading("Заказы");
      setOrdersListKey((key) => key + 1);
    }
    navigateToAccount(router, pathname, tab);
  };

  const sectionLabel =
    activeTab === "orders"
      ? ordersHeading
      : isPasswordMode
        ? "Пароль"
        : "Профиль";

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
      <main
        className={`${styles.main} ${
          isStandaloneProfile ? styles.mainStandalone : ""
        }`}
      >
        {isStandaloneProfile ? (
          <div className={styles.standaloneHeader}>
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
                {sectionLabel}
              </span>
            </p>
          </div>
        ) : (
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
                {sectionLabel}
              </span>
            </p>

            <h1 className={styles.asideTitle}>{sectionLabel}</h1>

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
            </nav>
          </aside>
        )}

        <article
          className={`${styles.card} ${
            isStandaloneProfile ? styles.cardStandalone : ""
          }`}
        >
          {activeTab !== "profile" && (
            <h1 className={styles.mobilePageTitle}>{sectionLabel}</h1>
          )}
          {activeTab === "profile" && (
            <PersonalData
              standalone={isStandaloneProfile}
              onPasswordModeChange={setIsPasswordMode}
            />
          )}
          {activeTab === "orders" && (
            <div id="account-orders">
              <Orders
                key={ordersListKey}
                onOrderSelect={(order) =>
                  setOrdersHeading(order?.title ?? "Заказы")
                }
              />
            </div>
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
