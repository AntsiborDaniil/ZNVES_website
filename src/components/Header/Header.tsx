"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import CartIcon from "../ui/CartIcon/CartIcon";
import AccountIcon from "../ui/AccountIcon/AccountIcon";
import styles from "./Header.module.css";

type HeaderVariant = "transparent" | "green";

type HeaderProps = {
  variant?: HeaderVariant;
};

const Header = ({ variant = "transparent" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldPrefetch =
    pathname !== "/checkout" && pathname !== "/cart" && pathname !== "/account";

  const headerClassName = `${styles.header} ${
    variant === "green" ? styles.headerGreen : ""
  }`;

  return (
    <header className={headerClassName}>
      <div className={styles.leftSection}>
        <Suspense fallback={<div style={{ width: 40, height: 40 }} />}>
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
        prefetch={shouldPrefetch}
      >
        <Image
          src="/images/logo.png"
          alt="ZNVES logo"
          width={125}
          height={60}
          className={styles.logoImage}
          loading="lazy"
        />
      </Link>
      <div className={styles.rightIcons}>
        <AccountIcon />
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
