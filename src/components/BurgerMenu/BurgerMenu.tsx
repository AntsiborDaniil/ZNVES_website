"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./BurgerMenu.module.css";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import {
  buildCatalogCategoryHref,
  fetchCatalogCategories,
  FALLBACK_CATALOG_CATEGORIES,
  getCatalogCategoryLabel,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";

type BurgerMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const SOCIAL_LINKS = [
  { label: "Telegram", href: "#telegram" },
  { label: "Instagram*", href: "#instagram" },
] as const;

const BurgerMenu = ({ isOpen, onToggle }: BurgerMenuProps) => {
  const menuId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>([]);

  useEffect(() => {
    void fetchCatalogCategories().then((data) => {
      setCatalogCategories(data.length > 0 ? data : FALLBACK_CATALOG_CATEGORIES);
    });
  }, []);

  // Автоматически открываем каталог при открытии меню
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

  const isNewInActive = pathname === "/new-in";
  const isCatalogActive = pathname.startsWith("/catalog");
  const isAccountActive = pathname.startsWith("/account");
  const isCartActive = pathname === "/cart";

  const currentCategory = searchParams.get("category");

  const isCategorySlugActive = useCallback(
    (slug: string) => {
      if (!currentCategory) return false;
      return currentCategory.toLowerCase() === slug.toLowerCase();
    },
    [currentCategory]
  );

  const shouldPrefetch =
    pathname !== "/checkout" &&
    pathname !== "/cart" &&
    pathname !== "/account";

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
            src="/images/burger/burgerCancel.png"
            alt="Закрыть"
            width={27}
            height={27}
            loading="lazy"
          />
        </button>

        <div className={styles.menuContent}>
          <div className={styles.menuSectionNavigation}>
            <div className={styles.menuSection}>
              <Link
                href="/new-in"
                className={`${styles.menuHeader} ${
                  isNewInActive ? styles.menuHeaderActive : ""
                }`}
                onClick={handleLinkClick}
                prefetch={shouldPrefetch}
              >
                NEW IN
              </Link>
            </div>

            <div className={styles.menuSection}>
              <Link
                href="/catalog"
                className={`${styles.menuHeader} ${
                  isCatalogActive ? styles.menuHeaderActive : ""
                }`}
                onClick={handleLinkClick}
                prefetch={shouldPrefetch}
              >
                CATALOG
              </Link>
              {isCatalogOpen && (
                <ul className={styles.catalogSubmenu}>
                  <li className={styles.catalogItem}>
                    <Link
                      href="/catalog"
                      className={`${styles.catalogLink} ${
                        pathname === "/catalog" && !currentCategory
                          ? styles.catalogLinkActive
                          : ""
                      }`}
                      onClick={handleLinkClick}
                      prefetch={shouldPrefetch}
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
                        prefetch={shouldPrefetch}
                      >
                        {getCatalogCategoryLabel(category)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.menuSectionAccount}>
            <Link
              href="/account"
              className={`${styles.menuItemWithIcon} ${
                isAccountActive ? styles.menuItemActive : ""
              }`}
              onClick={handleLinkClick}
              prefetch={shouldPrefetch}
            >
              <Image
                src="/images/burger/cabinet.png"
                alt=""
                width={14}
                height={14}
                className={styles.menuIcon}
                loading="lazy"
              />
              ЛИЧНЫЙ КАБИНЕТ
            </Link>
            <Link
              href="/cart"
              className={`${styles.menuItemWithIcon} ${
                isCartActive ? styles.menuItemActive : ""
              }`}
              onClick={handleLinkClick}
              prefetch={shouldPrefetch}
            >
              <Image
                src="/images/burger/cart.png"
                alt=""
                width={14}
                height={14}
                className={styles.menuIcon}
                loading="lazy"
              />
              КОРЗИНА
            </Link>
          </div>

          <div className={styles.socialSection}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.socialLink}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BurgerMenu;
