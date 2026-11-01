"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./CatalogPage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import CatalogSkeleton from "./CatalogSkeleton";
import Link from "next/link";
import type { CatalogProduct } from "../../types/products";
import {
  fetchCatalogProductsByCategory,
  getCatalogCategoryLabel,
  resolveCategorySlug,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import { fetchNewInProducts } from "../../api/new-in/newInApi";
import { buildProductHref } from "../../lib/productNavigation";
import { useCatalogCategories } from "../../contexts/CatalogCategoriesContext";

type CatalogPageContentProps = {
  title: string;
  initialProducts?: CatalogProduct[];
  initialCategories?: ApiCatalogCategory[];
  initialCategoryParam?: string | null;
};

const categoryFromUrl = (param: string | null): string => {
  if (!param) return "all";
  return resolveCategorySlug(param) ?? "all";
};

const CatalogPageContent = ({
  title,
  initialProducts = [],
  initialCategories = [],
  initialCategoryParam = null,
}: CatalogPageContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    categories: sharedCategories,
    refresh: refreshSharedCategories,
  } = useCatalogCategories();

  const categoryParam =
    searchParams?.get("category") ?? initialCategoryParam ?? null;
  const navFrom = title === "NEW IN" ? "new-in" : "catalog";

  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [categories, setCategories] = useState<ApiCatalogCategory[]>(() =>
    initialCategories.length > 0 ? initialCategories : sharedCategories
  );
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(
    initialCategories.length === 0 && sharedCategories.length === 0
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryFromUrl(categoryParam)
  );
  const categoriesRef = useRef<HTMLElement | null>(null);
  const ssrProductsUsedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const walk = (x - startX) * 2;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (sharedCategories.length > 0) {
      setCategories(sharedCategories);
      setIsCategoriesLoading(false);
    }
  }, [sharedCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      setIsCategoriesLoading(false);
      return;
    }

    let cancelled = false;
    void (async () => {
      setIsCategoriesLoading(true);
      try {
        await refreshSharedCategories();
      } finally {
        if (!cancelled) setIsCategoriesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [categories.length, refreshSharedCategories]);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      const useSsrQuiet =
        !ssrProductsUsedRef.current && initialProducts.length > 0;
      if (useSsrQuiet) {
        ssrProductsUsedRef.current = true;
        setIsLoading(false);
      } else if (products.length === 0) {
        setIsLoading(true);
      }

      setLoadError(null);

      try {
        const categorySlug =
          categoryParam == null
            ? undefined
            : resolveCategorySlug(categoryParam) ?? undefined;

        const nextProducts =
          title === "NEW IN"
            ? await fetchNewInProducts(categorySlug)
            : await fetchCatalogProductsByCategory(categorySlug);

        if (cancelled) return;

        // Пустой ответ при живом SSR не затираем (часто сеть/timeout)
        if (nextProducts.length > 0) {
          setProducts(nextProducts);
        } else if (!useSsrQuiet) {
          setProducts(nextProducts);
        }
      } catch {
        if (!cancelled && products.length === 0) {
          setLoadError(
            "Не удалось загрузить товары. Проверьте сеть и попробуйте ещё раз."
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- products length только для UX скелетона
  }, [title, categoryParam, initialProducts.length]);

  useEffect(() => {
    setActiveCategory(categoryFromUrl(categoryParam));
  }, [categoryParam]);

  const updateURL = useCallback(
    (updates: { category?: string }) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      if (updates.category !== undefined) {
        if (updates.category === "All" || updates.category === "all") {
          params.delete("category");
        } else {
          params.set("category", updates.category);
        }
      }

      params.delete("color");
      params.delete("size");
      params.delete("order");

      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleCategoryChange = useCallback(
    (slug: string) => {
      setActiveCategory(slug);
      updateURL({ category: slug === "all" ? "All" : slug });
    },
    [updateURL]
  );

  const handleRetry = useCallback(() => {
    setLoadError(null);
    setIsLoading(true);
    void (async () => {
      try {
        const categorySlug =
          categoryParam == null
            ? undefined
            : resolveCategorySlug(categoryParam) ?? undefined;
        const nextProducts =
          title === "NEW IN"
            ? await fetchNewInProducts(categorySlug)
            : await fetchCatalogProductsByCategory(categorySlug);
        setProducts(nextProducts);
        if (nextProducts.length === 0) {
          setLoadError(
            "Не удалось загрузить товары. Проверьте сеть и попробуйте ещё раз."
          );
        }
        await refreshSharedCategories();
      } catch {
        setLoadError(
          "Не удалось загрузить товары. Проверьте сеть и попробуйте ещё раз."
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [categoryParam, title, refreshSharedCategories]);

  const filteredProducts = useMemo(() => {
    return [...products].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products]);

  return (
    <>
      <div className={styles.intro}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      <div className={styles.categoriesRow}>
        {isCategoriesLoading ? (
          <div className={styles.categoriesSkeleton} aria-hidden>
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
            <div className={styles.categorySkeletonPill} />
          </div>
        ) : (
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
              const label = getCatalogCategoryLabel(category);
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
        )}
      </div>

      <section className={styles.productsSection}>
        {isLoading ? (
          <CatalogSkeleton />
        ) : (
          <>
            <div className={styles.productsGrid}>
              {filteredProducts.map((product, index) => (
                <Link
                  key={`${String(product.slug ?? product.id)}-${index}`}
                  href={buildProductHref(product.slug || product.id, {
                    from: navFrom,
                    category:
                      activeCategory !== "all" ? activeCategory : null,
                  })}
                  className={styles.catalogCardLink}
                  aria-label={`Открыть товар ${product.title}`}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    images={product.images}
                    isNew={product.isNew}
                    variant="grid"
                  />
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyStateWrap}>
                <div className={styles.emptyStateVisual} aria-hidden>
                  <span className={styles.emptyStateRing} />
                  <div className={styles.emptyStateIcon}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 7h16l-1.2 12.2A2 2 0 0 1 16.81 21H7.19a2 2 0 0 1-1.99-1.8L4 7Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 12.5h5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className={styles.emptyStateTitle}>
                  {loadError ? "Не удалось загрузить" : "Таких товаров нет"}
                </h2>
                <p className={styles.emptyStateText}>
                  {loadError ? (
                    loadError
                  ) : (
                    <>
                      В этой выборке пока пусто.
                      <br />
                      Откройте весь каталог — там есть что посмотреть.
                    </>
                  )}
                </p>
                {loadError ? (
                  <button
                    type="button"
                    className={styles.emptyStateButton}
                    onClick={handleRetry}
                  >
                    Повторить
                  </button>
                ) : (
                  activeCategory !== "all" && (
                    <button
                      type="button"
                      className={styles.emptyStateButton}
                      onClick={() => handleCategoryChange("all")}
                    >
                      Смотреть все
                    </button>
                  )
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
