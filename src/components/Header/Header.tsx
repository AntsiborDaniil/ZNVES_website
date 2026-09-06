"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

const scrollToCollections = () => {
  const el = document.getElementById("collections");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

const Header = ({ variant = "solid" }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileHeader, setIsMobileHeader] = useState(false);
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>(
    FALLBACK_CATALOG_CATEGORIES
  );
  const catalogButtonRef = useRef<HTMLButtonElement>(null);
  const catalogMenuRef = useRef<HTMLDivElement>(null);
  const { getTotalItems, openCart } = useCart();
  const { isAuthenticated, openAuth } = useAuth();
  const cartCount = getTotalItems();

  const handleCollectionsClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsCatalogOpen(false);
      setIsAccountOpen(false);

      if (pathname === "/") {
        scrollToCollections();
        window.history.replaceState(null, "", "/#collections");
        return;
      }

      router.push("/#collections");
    },
    [pathname, router]
  );

  useEffect(() => {
    void fetchCatalogCategories().then((data) => {
      if (data.length > 0) setCatalogCategories(data);
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const sync = () => setIsMobileHeader(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
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
  const closeAccount = () => setIsAccountOpen(false);

  const toggleCatalog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsAccountOpen(false);
    setIsCatalogOpen((open) => !open);
  };

  const closeCatalogFromMenu = useCallback(() => {
    setIsCatalogOpen(false);
  }, []);

  const handleMenuCollectionsClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      handleCollectionsClick(event);
    },
    [handleCollectionsClick]
  );

  const accountPopover = isAuthenticated ? (
    <AccountPopover isOpen={isAccountOpen} onClose={closeAccount} />
  ) : null;

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
              Каталог {isCatalogOpen ? "−" : "+"}
            </button>
          </div>
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
              {!isMobileHeader && accountPopover}
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
          <div className={styles.mobileAccountWrap}>
            <AccountIcon
              isMenuOpen={isAccountOpen}
              onAuthenticatedClick={() => {
                closeCatalog();
                setIsAccountOpen((open) => !open);
              }}
            />
            {isMobileHeader && accountPopover}
          </div>
          <CartIcon />
        </div>
      </header>

      <div
        ref={catalogMenuRef}
        className={styles.catalogMenuHost}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <CatalogMegaMenu
          isOpen={isCatalogOpen}
          categories={catalogCategories}
          onNavigate={closeCatalogFromMenu}
          onCollectionsClick={handleMenuCollectionsClick}
        />
      </div>
    </div>
  );
};

export default Header;
