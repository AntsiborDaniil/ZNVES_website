"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import styles from "./CatalogPage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import CatalogSkeleton from "./CatalogSkeleton";
import Link from "next/link";
import type { CatalogProduct } from "../../types/products";
import {
  fetchCatalogProductsByCategory,
  fetchCatalogCategories,
  FALLBACK_CATALOG_CATEGORIES,
  getCatalogCategoryLabel,
  resolveCategorySlug,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import {
  fetchNewInProducts,
  normalizeCategoryForApi as normalizeCategoryForNewInApi,
} from "../../api/new-in/newInApi";
import { useAuth } from "../../contexts/AuthContext";
import {
  dismissCatalogAuthModal,
  isCatalogAuthModalDismissed,
} from "../AccountAuthPromptModal/catalogAuthPromptStorage";
import { buildProductHref } from "../../lib/productNavigation";

const AccountAuthPromptModal = dynamic(
  () => import("../AccountAuthPromptModal/AccountAuthPromptModal"),
  { ssr: false }
);

type CatalogPageContentProps = {
  title: string;
};

const categoryFromUrl = (param: string | null): string => {
  if (!param) return "all";
  return resolveCategorySlug(param) ?? decodeURIComponent(param);
};

const CatalogPageContent = ({ title }: CatalogPageContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const categoryParam = searchParams?.get("category");
  const navFrom = title === "NEW IN" ? "new-in" : "catalog";

  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<ApiCatalogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryFromUrl(categoryParam)
  );
  const categoriesRef = useRef<HTMLElement | null>(null);
  /** true после первой успешной загрузки — при смене категории скелетон не показываем */
  const hasLoadedOnceRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Модалка входа — только для неавторизованных, пока пользователь не отказался навсегда
  useEffect(() => {
    if (isAuthLoading || isAuthenticated) {
      setShowAuthModal(false);
      return;
    }
    if (isCatalogAuthModalDismissed()) return;

    const timer = window.setTimeout(() => {
      setShowAuthModal(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [isAuthenticated, isAuthLoading]);

  const handleCloseAuthModal = useCallback(() => setShowAuthModal(false), []);

  const handleSkipAuthModal = useCallback(() => {
    dismissCatalogAuthModal();
    setShowAuthModal(false);
  }, []);

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
    const loadCategories = async () => {
      setIsCategoriesLoading(true);
      try {
        const categoriesData = await fetchCatalogCategories();
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        } else {
          setCategories(FALLBACK_CATALOG_CATEGORIES);
        }
      } catch {
        setCategories(FALLBACK_CATALOG_CATEGORIES);
      } finally {
        setIsCategoriesLoading(false);
      }
    };
    void loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (!hasLoadedOnceRef.current) {
        setIsLoading(true);
      }
      try {
        const categorySlug =
          categoryParam == null
            ? undefined
            : resolveCategorySlug(categoryParam) ??
              decodeURIComponent(categoryParam);

        if (title === "NEW IN") {
          const categoryForApi =
            !categorySlug || categorySlug === "all"
              ? undefined
              : normalizeCategoryForNewInApi(categorySlug);
          const newInProducts = await fetchNewInProducts(categoryForApi);
          setProducts(newInProducts);
        } else {
          const categoryForApi =
            !categorySlug || categorySlug === "all"
              ? undefined
              : categorySlug;
          const catalogProducts = await fetchCatalogProductsByCategory(
            categoryForApi
          );
          setProducts(catalogProducts);
        }
      } catch {
        setProducts([]);
      } finally {
        hasLoadedOnceRef.current = true;
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      void loadProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [title, categoryParam]);

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

      // Убираем старые query фильтров, если остались в URL
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
              const label = category.name || getCatalogCategoryLabel(category);
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
                      activeCategory !== "all"
                        ? activeCategory
                        : product.category,
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
                    zoomOnHover
                  />
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.emptyStateWrap}>
                <div className={styles.emptyStateIcon} aria-hidden>
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <h2 className={styles.emptyStateTitle}>Ничего не найдено</h2>
                <p className={styles.emptyStateText}>
                  В этой категории пока нет товаров.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {showAuthModal && !isAuthenticated && (
        <AccountAuthPromptModal
          onClose={handleCloseAuthModal}
          onSkip={handleSkipAuthModal}
        />
      )}
    </>
  );
};

export default CatalogPageContent;
