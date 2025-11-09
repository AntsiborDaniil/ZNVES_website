"use client";

import Link from "next/link";
import { useCallback, useEffect, useId } from "react";
import { usePathname } from "next/navigation";
import styles from "./BurgerMenu.module.css";

type BurgerMenuProps = {
    isOpen: boolean;
    onToggle: () => void;
};

const MENU_ITEMS = [
    { label: "Главная", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "NEW IN", href: "/new-in" },
    { label: "Личный кабинет", href: "/account" },
] as const;

const BurgerMenu = ({ isOpen, onToggle }: BurgerMenuProps) => {
    const menuId = useId();
    const pathname = usePathname();

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
        if (isOpen) {
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }

        return undefined;
    }, [isOpen]);

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
                <div className={styles.menuHeader}>
                    <span className={styles.menuLabel}>Навигация</span>
                </div>
                <ul className={styles.menuList}>
                    {MENU_ITEMS.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                        return (
                            <li key={item.href} className={styles.menuItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.menuLink} ${
                                        isActive ? styles.menuLinkActive : ""
                                    }`}
                                    onClick={handleLinkClick}
                                >
                                    <span>{item.label}</span>
                                    <span
                                        aria-hidden="true"
                                        className={styles.menuLinkChevron}
                                    >
                                        →
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default BurgerMenu;
