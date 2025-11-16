"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./BurgerMenu.module.css";

type BurgerMenuProps = {
    isOpen: boolean;
    onToggle: () => void;
};

const CATALOG_CATEGORIES = [
    { label: "All", href: "/catalog" },
    { label: "Pants", href: "/catalog?category=pants" },
    { label: "Jeans", href: "/catalog?category=jeans" },
    { label: "T-Shirt", href: "/catalog?category=t-shirts" },
    { label: "Zip Hoodies", href: "/catalog?category=zip%20hoodies" },
    { label: "Jackets", href: "/catalog?category=jackets" },
    { label: "Hoodies", href: "/catalog?category=hoodies" },
    { label: "Shorts", href: "/catalog?category=shorts" },
] as const;

const SOCIAL_LINKS = [
    { label: "Telegram", href: "#telegram" },
    { label: "Instagram*", href: "#instagram" },
] as const;

const BurgerMenu = ({ isOpen, onToggle }: BurgerMenuProps) => {
    const menuId = useId();
    const pathname = usePathname();
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const handleLinkClick = useCallback(() => {
        if (isOpen) {
            onToggle();
        }
    }, [isOpen, onToggle]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onToggle();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onToggle]);

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

    return (
        <div className={styles.burgerMenu}>
            <button
                className={`${styles.burgerButton} ${
                    isOpen ? styles.open : ""
                }`}
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
                className={`${styles.overlay} ${
                    isOpen ? styles.overlayOpen : ""
                }`}
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
                    ×
                </button>

                <div className={styles.menuContent}>
                    <div className={styles.menuSection}>
                        <Link
                            href="/new-in"
                            className={`${styles.menuHeader} ${
                                isNewInActive ? styles.menuHeaderActive : ""
                            }`}
                            onClick={handleLinkClick}
                        >
                            NEW IN
                        </Link>
                    </div>

                    <div className={styles.menuSection}>
                        <button
                            className={`${styles.menuHeader} ${
                                styles.menuHeaderButton
                            } ${
                                isCatalogActive ? styles.menuHeaderActive : ""
                            }`}
                            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                            type="button"
                        >
                            CATALOG
                        </button>
                        {isCatalogOpen && (
                            <ul className={styles.catalogSubmenu}>
                                {CATALOG_CATEGORIES.map((category) => {
                                    const isCategoryActive =
                                        category.href === "/catalog"
                                            ? pathname === "/catalog"
                                            : pathname.includes(
                                                  category.href.split("?")[1] ||
                                                      ""
                                              );

                                    return (
                                        <li
                                            key={category.href}
                                            className={styles.catalogItem}
                                        >
                                            <Link
                                                href={category.href}
                                                className={`${
                                                    styles.catalogLink
                                                } ${
                                                    isCategoryActive
                                                        ? styles.catalogLinkActive
                                                        : ""
                                                }`}
                                                onClick={handleLinkClick}
                                            >
                                                {category.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <div className={styles.menuSection}>
                        <Link
                            href="/account"
                            className={`${styles.menuItemWithIcon} ${
                                isAccountActive ? styles.menuItemActive : ""
                            }`}
                            onClick={handleLinkClick}
                        >
                            <Image
                                src="/images/account.png"
                                alt=""
                                width={24}
                                height={24}
                                className={styles.menuIcon}
                            />
                            ЛИЧНЫЙ КАБИНЕТ
                        </Link>
                        <Link
                            href="/cart"
                            className={`${styles.menuItemWithIcon} ${
                                isCartActive ? styles.menuItemActive : ""
                            }`}
                            onClick={handleLinkClick}
                        >
                            <Image
                                src="/images/cart.png"
                                alt=""
                                width={24}
                                height={24}
                                className={styles.menuIcon}
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
