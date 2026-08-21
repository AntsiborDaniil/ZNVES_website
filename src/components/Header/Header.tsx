"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import CartIcon from "../ui/CartIcon/CartIcon";
import AccountIcon from "../ui/AccountIcon/AccountIcon";
import AccountPopover from "../AccountPopover/AccountPopover";
import CatalogMegaMenu from "../CatalogMegaMenu/CatalogMegaMenu";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  FALLBACK_CATALOG_CATEGORIES,
  fetchCatalogCategories,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import styles from "./Header.module.css";

type HeaderVariant = "transparent" | "green" | "solid" | "light";

type HeaderProps = {
  variant?: HeaderVariant;
};

const Header = ({ variant = "solid" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>(
    FALLBACK_CATALOG_CATEGORIES
  );
  const catalogButtonRef = useRef<HTMLButtonElement>(null);
  const catalogMenuRef = useRef<HTMLDivElement>(null);
  const { getTotalItems, openCart } = useCart();
  const { isAuthenticated, openAuth } = useAuth();
  const cartCount = getTotalItems();

  useEffect(() => {
    void fetchCatalogCategories().then((data) => {
      if (data.length > 0) setCatalogCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!isCatalogOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCatalogOpen(false);
    };

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        catalogButtonRef.current?.contains(target) ||
        catalogMenuRef.current?.contains(target)
      ) {
        return;
      }
      setIsCatalogOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [isCatalogOpen]);

  const closeCatalog = () => setIsCatalogOpen(false);

  const toggleCatalog = () => {
    setIsAccountOpen(false);
    setIsCatalogOpen((open) => !open);
  };

  return (
    <div className={`${styles.shell} ${isCatalogOpen ? styles.catalogOpen : ""}`}>
      <header className={`${styles.header} ${styles[variant] ?? ""}`}>
        <nav className={styles.desktopNav} aria-label="Основная навигация">
          <div className={styles.catalogWrap}>
            <button
              ref={catalogButtonRef}
              type="button"
              className={`${styles.navLink} ${
                isCatalogOpen ? styles.navLinkActive : ""
              }`}
              aria-expanded={isCatalogOpen}
              aria-haspopup="menu"
              onClick={toggleCatalog}
            >
              Каталог
            </button>
          </div>
          <Link href="/new-in" className={styles.navLink} prefetch={false}>
            Новинки
          </Link>
          <Link href="/#collections" className={styles.navLink} prefetch={false}>
            Коллекции
          </Link>
        </nav>

        <div className={styles.mobileLeft}>
          <Suspense fallback={<div className={styles.burgerFallback} />}>
            <BurgerMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen((prev) => !prev)}
            />
          </Suspense>
        </div>

        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Go to homepage"
          prefetch={false}
        >
          <Image
            src="/images/logo-white.svg"
            alt="ZNVES"
            width={86}
            height={41}
            className={styles.logoImage}
            priority
            unoptimized
          />
        </Link>

        <nav className={styles.desktopNavRight} aria-label="Аккаунт">
          {isAuthenticated ? (
            <div className={styles.accountWrap}>
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={isAccountOpen}
                aria-haspopup="menu"
                onClick={() => {
                  closeCatalog();
                  setIsAccountOpen((open) => !open);
                }}
              >
                Личный кабинет
              </button>
              <AccountPopover
                isOpen={isAccountOpen}
                onClose={() => setIsAccountOpen(false)}
              />
            </div>
          ) : (
            <button
              type="button"
              className={styles.navLink}
              onClick={() => {
                closeCatalog();
                openAuth("login");
              }}
            >
              Личный кабинет
            </button>
          )}
          <button
            type="button"
            className={styles.navLink}
            onClick={() => {
              closeCatalog();
              openCart();
            }}
          >
            Корзина ({cartCount})
          </button>
        </nav>

        <div className={styles.mobileRight}>
          <AccountIcon />
          <CartIcon />
        </div>
      </header>

      {isCatalogOpen && (
        <div ref={catalogMenuRef}>
          <CatalogMegaMenu
            categories={catalogCategories}
            onNavigate={closeCatalog}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
