"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./CatalogPage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "../../types/products";
import type { ApiCatalogColor, ApiCatalogSize } from "../../api/catalog/catalogApi";
import {
  fetchCatalogProductsByCategory,
  fetchCatalogColors,
  fetchCatalogSizes,
  normalizeCategoryForApi,
} from "../../api/catalog/catalogApi";
import {
  fetchNewInProducts,
  normalizeCategoryForApi as normalizeCategoryForNewInApi,
} from "../../api/new-in/newInApi";

type CatalogPageContentProps = {
  title: string;
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
      <ul className={styles.filterMenu} role="listbox" aria-hidden={!isOpen}>
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <li key={option.value} className={styles.filterOptionItem}>
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

const CatalogPageContent = ({ title }: CatalogPageContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams?.get("category");
  const colorParam = searchParams?.get("color");
  const sizeParam = searchParams?.get("size");
  const orderParam = searchParams?.get("order");

  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [colors, setColors] = useState<ApiCatalogColor[]>([]);
  const [sizes, setSizes] = useState<ApiCatalogSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNormalizedCategory = useCallback(() => {
    if (!categoryParam) return "All";
    const decodedParam = decodeURIComponent(categoryParam).toLowerCase();
    return (
      categories.find((category) => category.toLowerCase() === decodedParam) ??
      "All"
    );
  }, [categoryParam]);

  const [activeCategory, setActiveCategory] = useState<string>(
    getNormalizedCategory()
  );
  const [colorFilter, setColorFilter] = useState<string>(colorParam || "all");
  const [sizeFilter, setSizeFilter] = useState<string>(sizeParam || "all");
  const [order, setOrder] = useState<string>(orderParam || "popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersPanelRef = useRef<HTMLDivElement | null>(null);
  const filtersButtonRef = useRef<HTMLButtonElement | null>(null);
  const filtersButtonDesktopRef = useRef<HTMLButtonElement | null>(null);
  const categoriesRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Закрываем панель фильтров при клике вне её
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOnMobileButton = filtersButtonRef.current?.contains(
        event.target as Node
      );
      const clickedOnDesktopButton = filtersButtonDesktopRef.current?.contains(
        event.target as Node
      );
      const clickedOnPanel = filtersPanelRef.current?.contains(
        event.target as Node
      );

      if (
        isFiltersOpen &&
        filtersPanelRef.current &&
        !clickedOnPanel &&
        !clickedOnMobileButton &&
        !clickedOnDesktopButton
      ) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFiltersOpen]);

  // Обработчики для drag-скролла категорий
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!categoriesRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeft(categoriesRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging || !categoriesRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Скорость скролла
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Загрузка цветов и размеров для фильтров
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [colorsData, sizesData] = await Promise.all([
          fetchCatalogColors(),
          fetchCatalogSizes(),
        ]);
        setColors(colorsData);
        setSizes(sizesData);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };
    loadFilters();
  }, []);

  // Опции фильтров: "все" + данные с API (slug — value для фильтрации, value — label в UI)
  const colorOptions: FilterOption[] = useMemo(
    () => [
      { value: "all", label: "Все цвета" },
      ...colors.map((c) => ({ value: c.slug, label: c.value })),
    ],
    [colors]
  );

  const sizeOptions: FilterOption[] = useMemo(
    () => [
      { value: "all", label: "Все размеры" },
      ...sizes.map((s) => ({ value: s.slug, label: s.value })),
    ],
    [sizes]
  );

  // Загрузка товаров из API с debounce
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        if (title === "NEW IN") {
          // Для страницы NEW IN загружаем только новые товары
          const normalizedCategory = getNormalizedCategory();
          const categoryForApi =
            normalizedCategory === "All"
              ? undefined
              : normalizeCategoryForNewInApi(normalizedCategory);
          const newInProducts = await fetchNewInProducts(categoryForApi);
          setProducts(newInProducts);
        } else {
          // Для страницы CATALOG загружаем все товары с учетом категории
          const normalizedCategory = getNormalizedCategory();
          const categoryForApi =
            normalizedCategory === "All"
              ? undefined
              : normalizeCategoryForApi(normalizedCategory);
          const catalogProducts = await fetchCatalogProductsByCategory(
            categoryForApi
          );
          setProducts(catalogProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce для оптимизации запросов
    const timeoutId = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [title, categoryParam, getNormalizedCategory]);

  // Обновляем состояние из URL при изменении параметров
  useEffect(() => {
    const normalized = getNormalizedCategory();
    setActiveCategory(normalized);
  }, [getNormalizedCategory]);

  useEffect(() => {
    if (colorParam) {
      setColorFilter(colorParam);
    } else {
      setColorFilter("all");
    }
  }, [colorParam]);

  useEffect(() => {
    if (sizeParam) {
      setSizeFilter(sizeParam);
    } else {
      setSizeFilter("all");
    }
  }, [sizeParam]);

  useEffect(() => {
    if (orderParam) {
      setOrder(orderParam);
    } else {
      setOrder("popular");
    }
  }, [orderParam]);

  // Функция для обновления URL с query параметрами
  const updateURL = useCallback(
    (updates: {
      category?: string;
      color?: string;
      size?: string;
      order?: string;
    }) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      // Обновляем параметры
      if (updates.category !== undefined) {
        if (updates.category === "All") {
          params.delete("category");
        } else {
          // Нормализуем категорию к нижнему регистру для соответствия с бургер-меню
          // URLSearchParams.set() автоматически кодирует значение, не нужно encodeURIComponent
          const normalizedCategory = updates.category.toLowerCase();
          params.set("category", normalizedCategory);
        }
      }

      if (updates.color !== undefined) {
        if (updates.color === "all") {
          params.delete("color");
        } else {
          params.set("color", updates.color);
        }
      }

      if (updates.size !== undefined) {
        if (updates.size === "all") {
          params.delete("size");
        } else {
          params.set("size", updates.size);
        }
      }

      if (updates.order !== undefined) {
        if (updates.order === "popular") {
          params.delete("order");
        } else {
          params.set("order", updates.order);
        }
      }

      // Обновляем URL без перезагрузки страницы
      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Обработчики для изменения фильтров
  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      updateURL({ category });
    },
    [updateURL]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setColorFilter(color);
      updateURL({ color });
    },
    [updateURL]
  );

  const handleSizeChange = useCallback(
    (size: string) => {
      setSizeFilter(size);
      updateURL({ size });
    },
    [updateURL]
  );

  const handleOrderChange = useCallback(
    (newOrder: string) => {
      setOrder(newOrder);
      updateURL({ order: newOrder });
    },
    [updateURL]
  );

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
        currentProducts.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        currentProducts.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return currentProducts;
  }, [activeCategory, colorFilter, sizeFilter, order, products]);

  return (
    <>
      <div className={styles.intro}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <button
            ref={filtersButtonRef}
            className={styles.filtersButtonMobile}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            type="button"
            aria-label="Фильтры"
            aria-expanded={isFiltersOpen}
          >
            <Image
              src="/images/catalogs/filters.png"
              alt="Фильтры"
              width={24}
              height={24}
              loading="lazy"
            />
          </button>
        </div>
      </div>

      <div className={styles.categoriesRow}>
        <nav
          ref={categoriesRef}
          className={styles.categories}
          aria-label="Категории"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  isActive ? styles.categoryButtonActive : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </nav>
        <button
          ref={filtersButtonDesktopRef}
          className={styles.filtersButton}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          type="button"
          aria-label="Фильтры"
          aria-expanded={isFiltersOpen}
        >
          <Image
            src="/images/catalogs/filters.png"
            alt="Фильтры"
            width={44}
            height={44}
            loading="lazy"
          />
        </button>
      </div>

      {isFiltersOpen && (
        <div ref={filtersPanelRef} className={styles.filtersPanel}>
          <div className={styles.filters}>
            <FilterDropdown
              label="Цвет"
              value={colorFilter}
              options={colorOptions}
              onChange={handleColorChange}
            />
            <FilterDropdown
              label="Размер"
              value={sizeFilter}
              options={sizeOptions}
              onChange={handleSizeChange}
            />
            <FilterDropdown
              label="Порядок"
              value={order}
              options={orderOptions}
              onChange={handleOrderChange}
            />
            {(colorFilter !== "all" || sizeFilter !== "all" || order !== "popular") && (
              <button
                type="button"
                className={styles.clearFiltersButton}
                onClick={() => {
                  handleColorChange("all");
                  handleSizeChange("all");
                  handleOrderChange("popular");
                }}
                aria-label="Удалить фильтры"
              >
                <span className={styles.clearFiltersIcon} aria-hidden>×</span>
                <span className={styles.clearFiltersButtonText}>Удалить фильтры</span>
              </button>
            )}
          </div>
        </div>
      )}

      <section className={styles.productsSection}>
        {isLoading ? (
          <div className={styles.emptyState}>Загрузка...</div>
        ) : (
          <>
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.slug || product.id}`}
                  className={styles.catalogCardLink}
                  aria-label={`Открыть товар ${product.title}`}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    images={product.images}
                    isNew={product.isNew}
                    productId={product.id}
                    showAddToCart={false}
                    variant="grid"
                  />
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className={styles.emptyState}>
                Нет товаров, соответствующих выбранным фильтрам. Попробуйте
                изменить параметры.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CatalogPageContent;
