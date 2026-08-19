"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import CartIcon from "../ui/CartIcon/CartIcon";
import AccountIcon from "../ui/AccountIcon/AccountIcon";
import { useCart } from "../../contexts/CartContext";
import styles from "./Header.module.css";

type HeaderVariant = "transparent" | "green" | "solid" | "light";

type HeaderProps = {
  variant?: HeaderVariant;
};

const LEFT_NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/new-in", label: "Новинки" },
  { href: "/#collections", label: "Коллекции" },
] as const;

const Header = ({ variant = "solid" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className={`${styles.header} ${styles[variant] ?? ""}`}>
      <nav className={styles.desktopNav} aria-label="Основная навигация">
        {LEFT_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.navLink}
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
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
        <Link href="/account" className={styles.navLink} prefetch={false}>
          Личный кабинет
        </Link>
        <Link href="/cart" className={styles.navLink} prefetch={false}>
          Корзина ({cartCount})
        </Link>
      </nav>

      <div className={styles.mobileRight}>
        <AccountIcon />
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
