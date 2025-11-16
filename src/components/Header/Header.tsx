"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    useEffect(() => {
        const routesToPrefetch = [
            "/catalog",
            "/new-in",
            "/privacy",
            "/public-offer",
            "/cart",
        ];

        routesToPrefetch.forEach((route) => {
            void router.prefetch(route);
        });
    }, [router]);

    const headerClassName = `${styles.header} ${
        variant === "green" ? styles.headerGreen : ""
    }`;

    return (
        <header className={headerClassName}>
            <BurgerMenu
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen((prev) => !prev)}
            />
            <Link
                href="/"
                className={styles.logoLink}
                aria-label="Go to homepage"
            >
                <Image
                    src="/images/logo.png"
                    alt="ZNVES logo"
                    width={125}
                    height={60}
                    className={styles.logoImage}
                    priority
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
