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
import styles from "./ProductDisplaySection.module.css";
import type { CatalogProduct } from "../../types/products";
import { fetchNewInProducts, fetchAllCatalogProducts } from "../../api/home/catalogApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { Swiper as SwiperInstance } from "swiper";
import { useWindowSize } from "../../hooks/useWindowSize";

type ActiveArrow = "prev" | "next" | null;

type ProductDisplaySectionProps = {
  title: string;
  showShopNow: boolean;
  id?: string;
  isBestseller?: boolean;
};

const ProductDisplaySection = ({
  title,
  showShopNow,
  id,
  isBestseller = false,
}: ProductDisplaySectionProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeArrow, setActiveArrow] = useState<ActiveArrow>(null);
  const [maxVisible, setMaxVisible] = useState(4);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const [isMobile, setIsMobile] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasPrefetchedProductsRef = useRef(false);
  const hasPrefetchedShopNowRef = useRef(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width === 0) return;

    if (width <= 480) {
      setMaxVisible(1.5);
      setSpaceBetween(8);
      setIsMobile(false);
    } else if (width <= 768) {
      setMaxVisible(3);
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

  // Загрузка товаров из API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        if (title === "NEW IN") {
          const newInProducts = await fetchNewInProducts();
          setProducts(newInProducts);
        } else {
          const catalogProducts = await fetchAllCatalogProducts();
          setProducts(catalogProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [title]);

  const handlePrev = () => {
    if (!isBeginning && swiperRef.current) {
      swiperRef.current.slidePrev();
      setActiveArrow("prev");
    }
  };

  const handleNext = () => {
    if (!isEnd && swiperRef.current) {
      swiperRef.current.slideNext();
      setActiveArrow("next");
    }
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
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveArrow(null);
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
    if (hasPrefetchedProductsRef.current) {
      return;
    }

    const prefetchCount = Math.min(products.length, 6);
    const routesToPrefetch = products
      .slice(0, prefetchCount)
      .map((product) => `/catalog/${product.slug || product.id}`);

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
    <section
      id={id}
      className={`${styles.section} ${isBestseller ? styles.isBestseller : ""}`}
    >
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
                } ${isBeginning ? styles.arrowButtonDisabled : ""}`}
                onClick={handlePrev}
                aria-label="Previous"
                type="button"
                disabled={isBeginning}
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
                } ${isEnd ? styles.arrowButtonDisabled : ""}`}
                onClick={handleNext}
                aria-label="Next"
                type="button"
                disabled={isEnd}
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
                sticky: false,
              },
              resistance: true,
              resistanceRatio: 0.85,
              spaceBetween,
              slidesPerView: maxVisible,
              slidesPerGroup: 1,
              loop: false,
              centeredSlides: isMobile,
              speed: 600,
              watchSlidesProgress: true,
              watchOverflow: true,
              onSwiper: handleSwiper,
              onSlideChange: handleSlideChange,
              onBeforeInit: handleBeforeInit,
              lazy: {
                enabled: true,
                loadOnTransitionStart: false,
                loadPrevNext: true,
                loadPrevNextAmount: 2,
              },
            },
            products.map((product) => (
              <SwiperSlide key={product.id} className={styles.slideItem}>
                <Link
                  href={`/catalog/${product.slug || product.id}`}
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
                    isSliderCard={true}
                  />
                </Link>
              </SwiperSlide>
            ))
          )
        ) : (
          <div className={styles.emptyState}>Товары не найдены</div>
        )}
      </div>
      {canNavigate && (
        <div className={styles.arrowsBottom}>
          <button
            className={`${styles.arrowButton} ${
              activeArrow === "prev"
                ? styles.arrowButtonActive
                : styles.arrowButtonInactive
            } ${isBeginning ? styles.arrowButtonDisabled : ""}`}
            onClick={handlePrev}
            aria-label="Previous"
            type="button"
            disabled={isBeginning}
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
            } ${isEnd ? styles.arrowButtonDisabled : ""}`}
            onClick={handleNext}
            aria-label="Next"
            type="button"
            disabled={isEnd}
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
