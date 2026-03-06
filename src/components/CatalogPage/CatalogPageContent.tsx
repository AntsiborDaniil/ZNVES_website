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
import CatalogSkeleton from "./CatalogSkeleton";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "../../types/products";
import type { ApiCatalogColor, ApiCatalogSize } from "../../api/catalog/catalogApi";
import {
  fetchCatalogProductsByCategory,
  fetchCatalogColors,
  fetchCatalogSizes,
  fetchCatalogCategories,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import {
  fetchNewInProducts,
  normalizeCategoryForApi as normalizeCategoryForNewInApi,
} from "../../api/new-in/newInApi";

type CatalogPageContentProps = {
  title: string;
};

// Фолбэк-категории на случай, если API временно недоступно (названия на английском)
const FALLBACK_CATEGORIES: ApiCatalogCategory[] = [
  { slug: "pants", name: "Pants" },
  { slug: "jeans", name: "Jeans" },
  { slug: "t-shirt", name: "T-shirts" },
  { slug: "zip-hoodie", name: "Zip hoodies" },
  { slug: "jackets", name: "Jackets" },
  { slug: "hoodies", name: "Hoodies" },
  { slug: "shorts", name: "Shorts" },
];

// Отображение названий категорий на английском (slug → label)
const CATEGORY_SLUG_TO_ENGLISH: Record<string, string> = {
  pants: "Pants",
  jeans: "Jeans",
  "t-shirt": "T-shirts",
  "zip-hoodie": "Zip hoodies",
  jackets: "Jackets",
  hoodies: "Hoodies",
  shorts: "Shorts",
};

type FilterOption = {
  value: string;
  label: string;
};

/** Строит варианты из colors×sizes, когда с API не пришли variants (один вариант на цвет — все размеры товара). */
function buildPseudoVariants(product: CatalogProduct): { color_slug: string; size_slugs: string[] }[] {
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  if (!colors.length || !sizes.length) return [];
  return colors.map((c) => ({
    color_slug: c.slug,
    size_slugs: sizes.map((s) => s.slug),
  }));
}

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

  const displayValue =
    value === options[0]?.value ? options[0]?.label ?? label : selectedOption?.label ?? label;

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
        <span className={styles.filterLabel}>{label}</span>
        <span className={styles.filterValue}>{displayValue}</span>
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
  const [categories, setCategories] = useState<ApiCatalogCategory[]>(FALLBACK_CATEGORIES);
  const [colors, setColors] = useState<ApiCatalogColor[]>([]);
  const [sizes, setSizes] = useState<ApiCatalogSize[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam ? decodeURIComponent(categoryParam) : "all"
  );
  const [colorFilter, setColorFilter] = useState<string>(colorParam || "all");
  const [sizeFilter, setSizeFilter] = useState<string>(sizeParam || "all");
  const [order, setOrder] = useState<string>(orderParam || "popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersPanelRef = useRef<HTMLDivElement | null>(null);
  const filtersButtonRef = useRef<HTMLButtonElement | null>(null);
  const filtersButtonDesktopRef = useRef<HTMLButtonElement | null>(null);
  const categoriesRef = useRef<HTMLElement | null>(null);
  /** true после первой успешной загрузки — при смене категории скелетон не показываем */
  const hasLoadedOnceRef = useRef(false);
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

  // Загрузка категорий, цветов и размеров для фильтров
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [colorsData, sizesData, categoriesData] = await Promise.all([
          fetchCatalogColors(),
          fetchCatalogSizes(),
          fetchCatalogCategories(),
        ]);
        setColors(colorsData);
        setSizes(sizesData);
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        }
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
      if (!hasLoadedOnceRef.current) {
        setIsLoading(true);
      }
      try {
        const categorySlug = categoryParam
          ? decodeURIComponent(categoryParam)
          : undefined;

        if (title === "NEW IN") {
          // Для страницы NEW IN загружаем только новые товары
          const categoryForApi =
            !categorySlug || categorySlug === "all"
              ? undefined
              : normalizeCategoryForNewInApi(categorySlug);
          const newInProducts = await fetchNewInProducts(categoryForApi);
          setProducts(newInProducts);
        } else {
          // Для страницы CATALOG загружаем все товары с учетом категории
          const categoryForApi =
            !categorySlug || categorySlug === "all"
              ? undefined
              : categorySlug;
          const catalogProducts = await fetchCatalogProductsByCategory(
            categoryForApi
          );
          setProducts(catalogProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        hasLoadedOnceRef.current = true;
        setIsLoading(false);
      }
    };

    // Debounce для оптимизации запросов
    const timeoutId = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [title, categoryParam]);

  // Обновляем состояние из URL при изменении параметров
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(decodeURIComponent(categoryParam));
    } else {
      setActiveCategory("all");
    }
  }, [categoryParam]);

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
        if (updates.category === "All" || updates.category === "all") {
          params.delete("category");
        } else {
          params.set("category", updates.category);
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
    (slug: string) => {
      setActiveCategory(slug);
      updateURL({ category: slug === "all" ? "All" : slug });
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
    // Категория уже учтена при загрузке с API (categoryParam) — не фильтруем по ней на клиенте

    // Используем состояние фильтров (обновляется сразу при смене селекта), чтобы фильтр срабатывал без задержки от router.push
    const colorActive = (colorFilter ?? "").trim() || "all";
    const sizeActive = (sizeFilter ?? "").trim() || "all";
    const colorNorm = colorActive.toLowerCase();
    const sizeNorm = sizeActive.toLowerCase();

    const bothFiltersSet = colorActive !== "all" && sizeActive !== "all";

    if (bothFiltersSet) {
      // Одна логика: пара (цвет + размер) есть в вариантах. Варианты — с API или строим из colors×sizes (каждый цвет — все размеры товара).
      currentProducts = currentProducts.filter((product) => {
        const variantList = product.variants?.length
          ? product.variants
          : buildPseudoVariants(product);
        if (!variantList.length) return false;
        return variantList.some((v) => {
          const vColor = (v.color_slug ?? "").toLowerCase().trim();
          if (vColor !== colorNorm) return false;
          const vAny = v as { size_slugs?: string[]; size_slug?: string };
          const sizeList = Array.isArray(vAny.size_slugs)
            ? vAny.size_slugs
            : vAny.size_slug != null
              ? [vAny.size_slug]
              : [];
          return sizeList.some(
            (sz) => String(sz).toLowerCase().trim() === sizeNorm
          );
        });
      });
    } else {
      if (colorActive !== "all") {
        currentProducts = currentProducts.filter((product) =>
          product.colors?.length
            ? product.colors.some(
                (c) => (c.slug ?? "").toLowerCase().trim() === colorNorm
              )
            : (product.color ?? "").toLowerCase().trim() === colorNorm
        );
      }
      if (sizeActive !== "all") {
        currentProducts = currentProducts.filter((product) =>
          product.sizes?.length
            ? product.sizes.some(
                (s) => (s.slug ?? "").toLowerCase().trim() === sizeNorm
              )
            : (product.size ?? "").toLowerCase().trim() === sizeNorm
        );
      }
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

  const handleClearFilters = useCallback(() => {
    setColorFilter("all");
    setSizeFilter("all");
    setOrder("popular");
    updateURL({ color: "all", size: "all", order: "popular" });
  }, [updateURL]);

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
          <button
            key="all"
            className={`${styles.categoryButton} ${
              activeCategory === "all" ? styles.categoryButtonActive : ""
            }`}
            onClick={() => handleCategoryChange("all")}
            type="button"
          >
            All
          </button>
          {categories.map((category) => {
            const isActive = category.slug === activeCategory;
            const label = CATEGORY_SLUG_TO_ENGLISH[category.slug] ?? category.name;
            return (
              <button
                key={category.slug}
                className={`${styles.categoryButton} ${
                  isActive ? styles.categoryButtonActive : ""
                }`}
                onClick={() => handleCategoryChange(category.slug)}
                type="button"
              >
                {label}
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
                onClick={handleClearFilters}
                aria-label="Удалить фильтры"
              >
                <span className={styles.clearFiltersIcon} aria-hidden>
                  ×
                </span>
                <span className={styles.clearFiltersButtonText}>Удалить фильтры</span>
              </button>
            )}
          </div>
        </div>
      )}

      <section className={styles.productsSection}>
        {isLoading ? (
          <CatalogSkeleton />
        ) : (
          <>
            <div className={styles.productsGrid}>
              {filteredProducts.map((product, index) => (
                <Link
                  key={`${String(product.slug ?? product.id)}-${index}`}
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
              <div className={styles.emptyStateWrap}>
                <div className={styles.emptyStateIcon} aria-hidden>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <h2 className={styles.emptyStateTitle}>Ничего не найдено</h2>
                <p className={styles.emptyStateText}>
                  Нет товаров, подходящих под выбранные фильтры. Измените цвет, размер или порядок сортировки.
                </p>
                {(colorFilter !== "all" || sizeFilter !== "all" || order !== "popular") && (
                  <button
                    type="button"
                    className={styles.emptyStateButton}
                    onClick={handleClearFilters}
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CatalogPageContent;
