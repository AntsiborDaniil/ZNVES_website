"use client";

/* eslint-disable @next/next/no-img-element */
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCard";
import LazyProductCard from "./LazyProductCard";
import styles from "./ProductDisplaySection.module.css";
import type { CatalogProduct } from "../../types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { Swiper as SwiperInstance } from "swiper";
import { useWindowSize } from "../../hooks/useWindowSize";
import { fetchCatalog } from "../../services/catalogService";

type ActiveArrow = "prev" | "next" | null;

type ProductDisplaySectionProps = {
  title: string;
  showShopNow: boolean;
  id?: string;
  initialProducts?: CatalogProduct[];
};

const ProductDisplaySection = ({
  title,
  showShopNow,
  id,
  initialProducts,
}: ProductDisplaySectionProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeArrow, setActiveArrow] = useState<ActiveArrow>(null);
  const [maxVisible, setMaxVisible] = useState(4);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>(
    initialProducts || []
  );
  const [isLoading, setIsLoading] = useState(
    !initialProducts || initialProducts.length === 0
  );
  const router = useRouter();
  const hasPrefetchedProductsRef = useRef(false);
  const hasPrefetchedShopNowRef = useRef(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width === 0) return;

    if (width <= 480) {
      setMaxVisible(1);
      setSpaceBetween(0);
      setIsMobile(true);
    } else if (width <= 768) {
      setMaxVisible(2);
      setSpaceBetween(10);
      setIsMobile(false);
    } else if (width <= 1200) {
      setMaxVisible(3);
      setSpaceBetween(10);
      setIsMobile(false);
    } else {
      setMaxVisible(4);
      setSpaceBetween(10);
      setIsMobile(false);
    }
  }, [width]);

  // Загрузка данных из API с оптимистичным обновлением
  useEffect(() => {
    // Если есть initialProducts, используем их и не загружаем заново
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setIsLoading(false);
      return;
    }

    const loadProducts = async () => {
      try {
        const params =
          title === "NEW IN" ? { is_new: true } : { is_new: false };

        // Используем оптимистичное обновление - показываем кеш сразу
        const fetchedProducts = await fetchCatalog(params, {
          optimistic: true,
        });
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [title, initialProducts]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
    setActiveArrow("prev");
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
    setActiveArrow("next");
  };

  const canNavigate = products.length > maxVisible;

  const shopNowHref =
    title === "NEW IN"
      ? "/new-in"
      : title === "CATALOG"
      ? "/catalog"
      : "/catalog";

  const handleSwiper = useCallback((swiper: SwiperInstance) => {
    swiperRef.current = swiper;
  }, []);

  const handleBeforeInit = useCallback((swiper: SwiperInstance) => {
    const params = swiper.params as unknown as Record<string, unknown>;
    params.preloadImages = false;
    params.lazy = {
      enabled: true,
      loadOnTransitionStart: false,
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    };
  }, []);

  useEffect(() => {
    if (hasPrefetchedProductsRef.current || products.length === 0) {
      return;
    }

    const prefetchCount = Math.min(products.length, 6);
    const routesToPrefetch = products
      .slice(0, prefetchCount)
      .map((product) => `/catalog/${product.id}`);

    routesToPrefetch.forEach((route) => {
      void router.prefetch(route);
    });

    hasPrefetchedProductsRef.current = true;
  }, [products, router]);

  useEffect(() => {
    if (hasPrefetchedShopNowRef.current || !showShopNow) {
      return;
    }

    void router.prefetch(shopNowHref);
    hasPrefetchedShopNowRef.current = true;
  }, [router, shopNowHref, showShopNow]);

  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.headerRight}>
          {showShopNow && (
            <Link href={shopNowHref} className={styles.shopNow}>
              SHOP NOW
              <img
                src="/images/catalogs/shopArrow.png"
                alt="Arrow Right"
                className={styles.shopArrow}
              />
            </Link>
          )}

          {canNavigate && (
            <div className={styles.arrows}>
              <button
                className={`${styles.arrowButton} ${
                  activeArrow === "prev"
                    ? styles.arrowButtonActive
                    : styles.arrowButtonInactive
                }`}
                onClick={handlePrev}
                aria-label="Previous"
                type="button"
              >
                <svg
                  width="35"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  className={
                    activeArrow === "prev"
                      ? styles.arrowSvgActive
                      : styles.arrowSvgInactive
                  }
                >
                  <path d="M12 15l-5-5 5-5" />
                </svg>
              </button>
              <button
                className={`${styles.arrowButton} ${
                  activeArrow === "next"
                    ? styles.arrowButtonActive
                    : styles.arrowButtonInactive
                }`}
                onClick={handleNext}
                aria-label="Next"
                type="button"
              >
                <svg
                  width="35"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  className={
                    activeArrow === "next"
                      ? styles.arrowSvgActive
                      : styles.arrowSvgInactive
                  }
                >
                  <path d="M8 15l5-5-5-5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.sliderContainer}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : products.length > 0 ? (
          createElement(
            Swiper as any,
            {
              className: styles.slider,
              modules: [FreeMode],
              freeMode: {
                enabled: true,
                momentum: true,
                momentumRatio: 0.35,
                minimumVelocity: 0.08,
              },
              spaceBetween,
              slidesPerView: maxVisible,
              slidesPerGroup: 1,
              loop: products.length > maxVisible,
              centeredSlides: isMobile,
              speed: 600,
              watchSlidesProgress: true,
              onSwiper: handleSwiper,
              onBeforeInit: handleBeforeInit,
              lazy: {
                enabled: true,
                loadOnTransitionStart: false,
                loadPrevNext: true,
                loadPrevNextAmount: 2,
              },
            },
            products.map((product, index) => {
              // Рендерим первые видимые карточки + несколько следующих сразу
              // Остальные будут загружаться по мере прокрутки
              const shouldRenderImmediately =
                index < maxVisible + 2 || // Видимые + 2 следующих
                (initialProducts && initialProducts.length > 0 && index < 8); // Или первые 8 если есть initialProducts

              return (
                <SwiperSlide key={product.id} className={styles.slideItem}>
                  {shouldRenderImmediately ? (
                    <Link
                      href={`/catalog/${product.id}`}
                      className={styles.slideLink}
                      aria-label={`Перейти к товару ${product.title}`}
                    >
                      <ProductCard
                        title={product.title}
                        price={product.price}
                        images={product.images}
                        isNew={product.isNew}
                        productId={product.id}
                        showAddToCart={false}
                      />
                    </Link>
                  ) : (
                    <div className={styles.slideLink}>
                      <LazyProductCard
                        product={product}
                        index={index}
                        isInitialRender={false}
                      />
                    </div>
                  )}
                </SwiperSlide>
              );
            })
          )
        ) : (
          <div className={styles.emptyState}>Нет товаров</div>
        )}
      </div>
      {canNavigate && (
        <div className={styles.arrowsBottom}>
          <button
            className={`${styles.arrowButton} ${
              activeArrow === "prev"
                ? styles.arrowButtonActive
                : styles.arrowButtonInactive
            }`}
            onClick={handlePrev}
            aria-label="Previous"
            type="button"
          >
            <svg
              width="35"
              height="30"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              className={
                activeArrow === "prev"
                  ? styles.arrowSvgActive
                  : styles.arrowSvgInactive
              }
            >
              <path d="M12 15l-5-5 5-5" />
            </svg>
          </button>
          <button
            className={`${styles.arrowButton} ${
              activeArrow === "next"
                ? styles.arrowButtonActive
                : styles.arrowButtonInactive
            }`}
            onClick={handleNext}
            aria-label="Next"
            type="button"
          >
            <svg
              width="35"
              height="30"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              className={
                activeArrow === "next"
                  ? styles.arrowSvgActive
                  : styles.arrowSvgInactive
              }
            >
              <path d="M8 15l5-5-5-5" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductDisplaySection;
