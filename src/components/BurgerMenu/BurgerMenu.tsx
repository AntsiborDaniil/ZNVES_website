"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./BurgerMenu.module.css";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import {
  buildCatalogCategoryHref,
  fetchCatalogCategories,
  FALLBACK_CATALOG_CATEGORIES,
  getCatalogCategoryLabel,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

type BurgerMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const scrollToCollections = () => {
  const el = document.getElementById("collections");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

const BurgerMenu = ({ isOpen, onToggle }: BurgerMenuProps) => {
  const menuId = useId();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openCart, isCartOpen } = useCart();
  const { isAuthenticated, openAuth } = useAuth();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>([]);

  useEffect(() => {
    void fetchCatalogCategories().then((data) => {
      setCatalogCategories(data.length > 0 ? data : FALLBACK_CATALOG_CATEGORIES);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsCatalogOpen(true);
    }
  }, [isOpen]);

  const handleLinkClick = useCallback(() => {
    if (isOpen) {
      onToggle();
    }
  }, [isOpen, onToggle]);

  const handleCollectionsClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handleLinkClick();

      window.setTimeout(() => {
        if (pathname === "/") {
          scrollToCollections();
          window.history.replaceState(null, "", "/#collections");
          return;
        }

        router.push("/");
        let tries = 0;
        const timer = window.setInterval(() => {
          tries += 1;
          if (scrollToCollections() || tries > 40) {
            window.clearInterval(timer);
            window.history.replaceState(null, "", "/#collections");
          }
        }, 50);
      }, 80);
    },
    [handleLinkClick, pathname, router]
  );

  useKeyboardEvent(
    "Escape",
    useCallback(() => {
      if (isOpen) {
        onToggle();
      }
    }, [isOpen, onToggle]),
    isOpen
  );

  useEffect(() => {
    if (!isOpen) {
      setIsCatalogOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const isCatalogActive = pathname.startsWith("/catalog");
  const isAccountActive = pathname.startsWith("/account");
  const isCartActive = isCartOpen;

  const currentCategory = searchParams.get("category");

  const isCategorySlugActive = useCallback(
    (slug: string) => {
      if (!currentCategory) return false;
      return currentCategory.toLowerCase() === slug.toLowerCase();
    },
    [currentCategory]
  );

  return (
    <div className={styles.burgerMenu}>
      <button
        className={`${styles.burgerButton} ${isOpen ? styles.open : ""}`}
        onClick={onToggle}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls={`${menuId}-menu`}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!isOpen}
        onClick={onToggle}
      />

      <nav
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        id={`${menuId}-menu`}
        aria-hidden={!isOpen}
      >
        <button
          className={styles.closeButton}
          onClick={onToggle}
          aria-label="Закрыть меню"
          type="button"
        >
          <Image
            src="/images/burger/close.svg"
            alt=""
            width={20}
            height={20}
            className={styles.closeIcon}
            unoptimized
          />
        </button>

        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <button
              type="button"
              className={`${styles.menuHeader} ${
                isCatalogActive ? styles.menuHeaderActive : ""
              }`}
              onClick={() => setIsCatalogOpen((open) => !open)}
              aria-expanded={isCatalogOpen}
            >
              КАТАЛОГ {isCatalogOpen ? "−" : "+"}
            </button>
            <ul
              className={`${styles.catalogSubmenu} ${
                isCatalogOpen ? styles.catalogSubmenuOpen : ""
              }`}
            >
              <li className={styles.catalogItem}>
                <Link
                  href="/catalog"
                  className={`${styles.catalogLink} ${
                    isCatalogActive && !currentCategory
                      ? styles.catalogLinkActive
                      : ""
                  }`}
                  onClick={handleLinkClick}
                  prefetch={false}
                  tabIndex={isCatalogOpen ? undefined : -1}
                >
                  All
                </Link>
              </li>
              {catalogCategories.map((category) => (
                <li key={category.slug} className={styles.catalogItem}>
                  <Link
                    href={buildCatalogCategoryHref(category.slug)}
                    className={`${styles.catalogLink} ${
                      isCategorySlugActive(category.slug)
                        ? styles.catalogLinkActive
                        : ""
                    }`}
                    onClick={handleLinkClick}
                    prefetch={false}
                    tabIndex={isCatalogOpen ? undefined : -1}
                  >
                    {getCatalogCategoryLabel(category)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.menuDivider} aria-hidden />
          </div>

          <Link
            href="/#collections"
            className={styles.menuHeader}
            onClick={handleCollectionsClick}
            prefetch={false}
          >
            КОЛЛЕКЦИИ
          </Link>

          <button
            type="button"
            className={`${styles.menuHeader} ${
              isCartActive ? styles.menuHeaderActive : ""
            }`}
            onClick={() => {
              openCart();
              handleLinkClick();
            }}
          >
            КОРЗИНА
          </button>

          {isAuthenticated ? (
            <Link
              href="/account"
              className={`${styles.menuHeader} ${
                isAccountActive ? styles.menuHeaderActive : ""
              }`}
              onClick={handleLinkClick}
              prefetch={false}
            >
              ЛИЧНЫЙ КАБИНЕТ
            </Link>
          ) : (
            <button
              type="button"
              className={`${styles.menuHeader} ${
                isAccountActive ? styles.menuHeaderActive : ""
              }`}
              onClick={() => {
                openAuth("login");
                handleLinkClick();
              }}
            >
              ЛИЧНЫЙ КАБИНЕТ
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default BurgerMenu;
