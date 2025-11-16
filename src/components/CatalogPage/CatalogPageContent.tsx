"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CatalogPage.module.css";
import CatalogGridCard from "./CatalogGridCard";
import type { CatalogProduct } from "../../types/products";

type CatalogPageContentProps = {
    title: string;
    products: CatalogProduct[];
};

const categories = [
    "All",
    "Pants",
    "Jeans",
    "T-shirts",
    "Zip hoodies",
    "Jackets",
    "Hoodies",
    "Shorts",
];

type FilterOption = {
    value: string;
    label: string;
};

const colorOptions: FilterOption[] = [
    { value: "all", label: "Все цвета" },
    { value: "green", label: "Зеленый" },
    { value: "cream", label: "Кремовый" },
    { value: "navy", label: "Синий" },
    { value: "brown", label: "Коричневый" },
];

const sizeOptions: FilterOption[] = [
    { value: "all", label: "Все размеры" },
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
];

const orderOptions: FilterOption[] = [
    { value: "popular", label: "По умолчанию" },
    { value: "price-asc", label: "Сначала дешевле" },
    { value: "price-desc", label: "Сначала дороже" },
    { value: "newest", label: "Новинки" },
];

type FilterDropdownProps = {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
};

const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
}: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedOption =
        options.find((option) => option.value === value) ?? options[0];

    const displayText =
        value === options[0]?.value ? label : selectedOption?.label ?? label;

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (nextValue: string) => {
        onChange(nextValue);
        setIsOpen(false);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle();
        } else if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.filterDropdown} ${
                isOpen ? styles.filterDropdownOpen : ""
            }`}
        >
            <button
                type="button"
                className={styles.filterButton}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={styles.filterValue}>{displayText}</span>
                <span className={styles.filterIcon} aria-hidden="true" />
            </button>
            <ul
                className={styles.filterMenu}
                role="listbox"
                aria-hidden={!isOpen}
            >
                {options.map((option) => {
                    const isActive = option.value === value;
                    return (
                        <li
                            key={option.value}
                            className={styles.filterOptionItem}
                        >
                            <button
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                className={`${styles.filterOption} ${
                                    isActive ? styles.filterOptionActive : ""
                                }`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const CatalogPageContent = ({ title, products }: CatalogPageContentProps) => {
    const searchParams = useSearchParams();
    const categoryParam = searchParams?.get("category");

    const getNormalizedCategory = useCallback(() => {
        if (!categoryParam) return "All";
        const decodedParam = decodeURIComponent(categoryParam).toLowerCase();
        return (
            categories.find(
                (category) => category.toLowerCase() === decodedParam
            ) ?? "All"
        );
    }, [categoryParam]);

    const [activeCategory, setActiveCategory] = useState<string>(
        getNormalizedCategory()
    );
    const [colorFilter, setColorFilter] = useState<string>("all");
    const [sizeFilter, setSizeFilter] = useState<string>("all");
    const [order, setOrder] = useState<string>("popular");

    useEffect(() => {
        const normalized = getNormalizedCategory();
        setActiveCategory(normalized);
    }, [getNormalizedCategory]);

    const filteredProducts = useMemo(() => {
        let currentProducts = [...products];

        if (activeCategory !== "All") {
            currentProducts = currentProducts.filter(
                (product) => product.category === activeCategory
            );
        }

        if (colorFilter !== "all") {
            currentProducts = currentProducts.filter(
                (product) => product.color === colorFilter
            );
        }

        if (sizeFilter !== "all") {
            currentProducts = currentProducts.filter(
                (product) => product.size === sizeFilter
            );
        }

        switch (order) {
            case "price-asc":
                currentProducts.sort((a, b) => a.priceValue - b.priceValue);
                break;
            case "price-desc":
                currentProducts.sort((a, b) => b.priceValue - a.priceValue);
                break;
            case "newest":
                currentProducts.sort(
                    (a, b) => Number(b.isNew) - Number(a.isNew)
                );
                break;
            default:
                currentProducts.sort((a, b) => a.sortOrder - b.sortOrder);
        }

        return currentProducts;
    }, [activeCategory, colorFilter, sizeFilter, order, products]);

    return (
        <>
            <div className={styles.intro}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            <nav className={styles.categories} aria-label="Категории">
                {categories.map((category) => {
                    const isActive = category === activeCategory;
                    return (
                        <button
                            key={category}
                            className={`${styles.categoryButton} ${
                                isActive ? styles.categoryButtonActive : ""
                            }`}
                            onClick={() => setActiveCategory(category)}
                            type="button"
                        >
                            {category}
                        </button>
                    );
                })}
            </nav>

            <div className={styles.filters}>
                <FilterDropdown
                    label="Цвет"
                    value={colorFilter}
                    options={colorOptions}
                    onChange={setColorFilter}
                />
                <FilterDropdown
                    label="Размер"
                    value={sizeFilter}
                    options={sizeOptions}
                    onChange={setSizeFilter}
                />
                <FilterDropdown
                    label="Порядок"
                    value={order}
                    options={orderOptions}
                    onChange={setOrder}
                />
            </div>

            <section className={styles.productsSection}>
                <div className={styles.productsGrid}>
                    {filteredProducts.map((product) => (
                        <CatalogGridCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className={styles.emptyState}>
                        Нет товаров, соответствующих выбранным фильтрам.
                        Попробуйте изменить параметры.
                    </p>
                )}
            </section>
        </>
    );
};

export default CatalogPageContent;
