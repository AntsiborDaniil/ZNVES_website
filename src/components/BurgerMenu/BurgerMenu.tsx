"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./BurgerMenu.module.css";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";

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
    const searchParams = useSearchParams();
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

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

    // Получаем текущую категорию из URL
    const currentCategory = searchParams.get("category");

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
                    <Image
                        src="/images/burger/burgerCancel.png"
                        alt="Закрыть"
                        width={27}
                        height={27}
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
                            >
                                NEW IN
                            </Link>
                        </div>

                        <div className={styles.menuSection}>
                            <button
                                className={`${styles.menuHeader} ${
                                    styles.menuHeaderButton
                                } ${
                                    isCatalogActive
                                        ? styles.menuHeaderActive
                                        : ""
                                }`}
                                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                                type="button"
                            >
                                CATALOG
                            </button>
                            {isCatalogOpen && (
                                <ul className={styles.catalogSubmenu}>
                                    {CATALOG_CATEGORIES.map((category) => {
                                        // Определяем активную категорию
                                        let isCategoryActive = false;

                                        if (category.href === "/catalog") {
                                            // Для "All" проверяем, что мы на /catalog без параметров
                                            isCategoryActive =
                                                pathname === "/catalog" &&
                                                !currentCategory;
                                        } else {
                                            // Для остальных категорий извлекаем параметр category из href
                                            const categoryParam =
                                                category.href.split(
                                                    "?category="
                                                )[1];
                                            if (
                                                categoryParam &&
                                                currentCategory
                                            ) {
                                                // Декодируем параметр из URL (может быть закодирован)
                                                let decodedCategory =
                                                    categoryParam;
                                                try {
                                                    decodedCategory =
                                                        decodeURIComponent(
                                                            categoryParam
                                                        );
                                                } catch (e) {
                                                    // Если ошибка декодирования, используем как есть
                                                }
                                                const decodedLower =
                                                    decodedCategory.toLowerCase();
                                                // currentCategory уже декодирован из URL через searchParams.get()
                                                const currentCategoryLower =
                                                    currentCategory.toLowerCase();
                                                // Сравниваем без учета регистра
                                                isCategoryActive =
                                                    currentCategoryLower ===
                                                    decodedLower;
                                            }
                                        }

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
                    </div>

                    <div className={styles.menuSectionAccount}>
                        <Link
                            href="/account"
                            className={`${styles.menuItemWithIcon} ${
                                isAccountActive ? styles.menuItemActive : ""
                            }`}
                            onClick={handleLinkClick}
                        >
                            <Image
                                src="/images/burger/cabinet.png"
                                alt=""
                                width={12}
                                height={12}
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
                                src="/images/burger/cart.png"
                                alt=""
                                width={13}
                                height={13}
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
