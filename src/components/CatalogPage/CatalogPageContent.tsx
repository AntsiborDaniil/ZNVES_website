"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams, usePathname } from "next/navigation";
import styles from "./CatalogPage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import CatalogSkeleton from "./CatalogSkeleton";
import Link from "next/link";
import type { CatalogProduct } from "../../types/products";
import {
  CATALOG_PAGE_SIZE,
  getCatalogCategoryLabel,
  resolveCategorySlug,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import { useLazyGetCatalogProductsPageQuery, useLazyGetCatalogProductsPageByCategoryQuery } from "../../store/api";
import { buildProductHref } from "../../lib/productNavigation";
import { useCatalogCategories } from "../../contexts/CatalogCategoriesContext";

type CatalogPageContentProps = {
  title: string;
  initialProducts?: CatalogProduct[];
  initialCategories?: ApiCatalogCategory[];
  initialCategoryParam?: string | null;
  initialHasMore?: boolean;
};

const categoryFromUrl = (param: string | null): string => {
  if (!param) return "all";
  return resolveCategorySlug(param) ?? "all";
};

const normalizeSlug = (value: string): string =>
  value.trim().toLowerCase().replace(/_/g, "-");

const CatalogPageContent = ({
  title,
  initialProducts = [],
  initialCategories = [],
  initialCategoryParam = null,
  initialHasMore = false,
}: CatalogPageContentProps) => {
  const [loadPage] = useLazyGetCatalogProductsPageQuery();
  const [loadCategoryPage] = useLazyGetCatalogProductsPageByCategoryQuery();
  const fetchCatalogProductsPage = useCallback((params: Parameters<typeof loadPage>[0]) => loadPage(params, true).unwrap(), [loadPage]);
  const fetchCatalogProductsPageByCategory = useCallback((category: string | undefined, page: number, pageSize: number) => loadCategoryPage({ category, page, pageSize }, true).unwrap(), [loadCategoryPage]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    categories: sharedCategories,
    refresh: refreshSharedCategories,
  } = useCatalogCategories();

  const categoryParam =
    searchParams?.get("category") ?? initialCategoryParam ?? null;
  const navFrom = title === "NEW IN" ? "new-in" : "catalog";
  const isNewIn = title === "NEW IN";

  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [nextPage, setNextPage] = useState(2);
  const [categories, setCategories] = useState<ApiCatalogCategory[]>(() =>
    initialCategories.length > 0 ? initialCategories : sharedCategories
  );
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(
    initialCategories.length === 0 && sharedCategories.length === 0
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryFromUrl(categoryParam)
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);
  const categoryRequestIdRef = useRef(0);
  const productsRef = useRef(products);
  productsRef.current = products;

  const ssrSyncKey = `${title}|${categoryParam ?? ""}|${initialProducts.length}|${initialProducts[0]?.slug ?? ""}|${initialHasMore}`;

  // Синхрон с RSC при смене категории (Link) — не ждём отдельный client fetch
  useEffect(() => {
    setActiveCategory(categoryFromUrl(categoryParam));
    setProducts(initialProducts);
    setHasMore(initialHasMore);
    setNextPage(2);
    setLoadError(null);
    setIsLoading(initialProducts.length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ключ отражает смену SSR-порции
  }, [ssrSyncKey]);

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

  // Если SSR пустой — добираем первую страницу на клиенте
  useEffect(() => {
    if (initialProducts.length > 0) return;

    const requestId = ++categoryRequestIdRef.current;
    let cancelled = false;

    const loadFirstPage = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const categorySlug =
          categoryParam == null
            ? undefined
            : resolveCategorySlug(categoryParam) ?? undefined;

        const page = isNewIn
          ? await fetchCatalogProductsPage({
              is_new: true,
              category: categorySlug,
              page: 1,
              page_size: CATALOG_PAGE_SIZE,
            })
          : await fetchCatalogProductsPageByCategory(
              categorySlug,
              1,
              CATALOG_PAGE_SIZE
            );

        if (cancelled || requestId !== categoryRequestIdRef.current) return;

        setProducts(page.products);
        setHasMore(page.hasMore);
        setNextPage(2);
        if (page.products.length === 0) {
          setLoadError(null);
        }
      } catch {
        if (!cancelled && requestId === categoryRequestIdRef.current) {
          setLoadError(
            "Не удалось загрузить товары. Проверьте сеть и попробуйте ещё раз."
          );
          setProducts([]);
          setHasMore(false);
        }
      } finally {
        if (!cancelled && requestId === categoryRequestIdRef.current) {
          setIsLoading(false);
        }
      }
    };

    void loadFirstPage();
    return () => {
      cancelled = true;
    };
  }, [categoryParam, initialProducts.length, isNewIn, fetchCatalogProductsPage, fetchCatalogProductsPageByCategory]);

  const appendNextPage = useCallback(async () => {
    if (loadingMoreRef.current || !hasMore) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      const categorySlug =
        categoryParam == null
          ? undefined
          : resolveCategorySlug(categoryParam) ?? undefined;

      const page = isNewIn
        ? await fetchCatalogProductsPage({
            is_new: true,
            category: categorySlug,
            page: nextPage,
            page_size: CATALOG_PAGE_SIZE,
          })
        : await fetchCatalogProductsPageByCategory(
            categorySlug,
            nextPage,
            CATALOG_PAGE_SIZE
          );

      if (page.products.length === 0) {
        setHasMore(false);
        return;
      }

      const seen = new Set(productsRef.current.map((p) => p.slug));
      const unique = page.products.filter((p) => !seen.has(p.slug));
      // Бэк без пагинации вернул те же slug — больше не просим
      if (unique.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...unique]);
      setHasMore(page.hasMore);
      setNextPage((p) => p + 1);
    } catch {
      setHasMore(false);
    } finally {
      loadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [categoryParam, hasMore, isNewIn, nextPage, fetchCatalogProductsPage, fetchCatalogProductsPageByCategory]);

  const filteredProducts = useMemo(() => {
    return [...products].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products]);

  // Догрузка следующей страницы с API по скроллу (уже загруженные показываем все)
  useEffect(() => {
    if (!hasMore) return;

    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        void appendNextPage();
      },
      { rootMargin: "480px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [appendNextPage, hasMore, filteredProducts.length]);

  const handleRetry = useCallback(() => {
    setLoadError(null);
    setIsLoading(true);
    void (async () => {
      try {
        const categorySlug =
          categoryParam == null
            ? undefined
            : resolveCategorySlug(categoryParam) ?? undefined;
        const page = isNewIn
          ? await fetchCatalogProductsPage({
              is_new: true,
              category: categorySlug,
              page: 1,
              page_size: CATALOG_PAGE_SIZE,
            })
          : await fetchCatalogProductsPageByCategory(
              categorySlug,
              1,
              CATALOG_PAGE_SIZE
            );
        setProducts(page.products);
        setHasMore(page.hasMore);
        setNextPage(2);
        if (page.products.length === 0) {
          setLoadError(null);
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
  }, [categoryParam, isNewIn, refreshSharedCategories, fetchCatalogProductsPage, fetchCatalogProductsPageByCategory]);

  const showSentinel =
    !isLoading && filteredProducts.length > 0 && hasMore;

  const categoryHref = (slug: string) => {
    if (slug === "all") return pathname;
    return `${pathname}?category=${encodeURIComponent(slug)}`;
  };

  const isCategoryActive = (slug: string) =>
    normalizeSlug(slug) === normalizeSlug(activeCategory);

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
          <nav className={styles.categories} aria-label="Категории">
            <Link
              href={categoryHref("all")}
              scroll={false}
              className={`${styles.categoryButton} ${
                isCategoryActive("all") ? styles.categoryButtonActive : ""
              }`}
              onClick={() => setActiveCategory("all")}
              prefetch
            >
              All
            </Link>
            {categories.map((category) => {
              const label = getCatalogCategoryLabel(category);
              return (
                <Link
                  key={category.slug}
                  href={categoryHref(category.slug)}
                  scroll={false}
                  className={`${styles.categoryButton} ${
                    isCategoryActive(category.slug)
                      ? styles.categoryButtonActive
                      : ""
                  }`}
                  onClick={() => setActiveCategory(normalizeSlug(category.slug))}
                  prefetch
                >
                  {label}
                </Link>
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
                    imagePriority={index < 4}
                    loadImage
                  />
                </Link>
              ))}
            </div>

            {showSentinel ? (
              <div
                ref={loadMoreRef}
                className={styles.loadMoreSentinel}
                aria-hidden
              />
            ) : null}

            {isLoadingMore ? (
              <p className={styles.loadingMoreLabel} role="status">
                Загрузка…
              </p>
            ) : null}

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
                    <Link
                      href={categoryHref("all")}
                      scroll={false}
                      className={styles.emptyStateButton}
                      onClick={() => setActiveCategory("all")}
                    >
                      Смотреть все
                    </Link>
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
