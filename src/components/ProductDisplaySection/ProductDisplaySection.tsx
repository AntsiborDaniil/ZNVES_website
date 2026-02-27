"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCard";
import SliderSkeleton from "./SliderSkeleton";
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [maxVisible, setMaxVisible] = useState<number | "auto">(4);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const [slidesOffsetAfter, setSlidesOffsetAfter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasPrefetchedProductsRef = useRef(false);
  const hasPrefetchedShopNowRef = useRef(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width === 0) return;

    if (width <= 480) {
      setMaxVisible("auto");
      setSpaceBetween(8);
      setIsMobile(false);
      setSlidesOffsetAfter(Math.min(120, Math.floor(width * 0.25)));
    } else if (width <= 768) {
      setMaxVisible("auto");
      setSpaceBetween(10);
      setIsMobile(false);
      setSlidesOffsetAfter(Math.min(80, Math.floor(width * 0.15)));
    } else if (width <= 1200) {
      setMaxVisible(3);
      setSpaceBetween(10);
      setIsMobile(false);
      setSlidesOffsetAfter(0);
    } else {
      setMaxVisible(4);
      setSpaceBetween(10);
      setIsMobile(false);
      setSlidesOffsetAfter(0);
    }
  }, [width]);

  useEffect(() => {
    if (width > 0 && width <= 480 && swiperRef.current) {
      const t = setTimeout(() => swiperRef.current?.update(), 100);
      return () => clearTimeout(t);
    }
  }, [width]);

  // Загрузка товаров из API (с кешем в catalogApi)
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
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      setActiveArrow("next");
    }
  };

  const MIN_SLIDES_FOR_LOOP = 16;

  const slidesForSwiper = useMemo(() => {
    if (products.length === 0) return [];
    if (products.length >= MIN_SLIDES_FOR_LOOP) return products;
    const repeated: CatalogProduct[] = [];
    while (repeated.length < MIN_SLIDES_FOR_LOOP) {
      repeated.push(...products);
    }
    return repeated;
  }, [products]);

  const canNavigate =
    slidesForSwiper.length >
    (typeof maxVisible === "number" ? maxVisible : 2);

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
    if (width > 0 && width <= 480) {
      requestAnimationFrame(() => {
        swiper.update();
      });
    }
  }, [width]);

  const handleSlideChange = useCallback((swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveArrow(null);
  }, []);

  const handleBeforeInit = useCallback((swiper: SwiperInstance) => {
    const params = swiper.params as unknown as Record<string, unknown>;
    params.preloadImages = true;
    params.loopedSlides = Math.max(slidesForSwiper.length, 8);
    params.loopAdditionalSlides = 4;
    params.lazy = {
      enabled: true,
      loadOnTransitionStart: true,
      loadPrevNext: true,
      loadPrevNextAmount: 3,
    };
  }, [slidesForSwiper.length]);

  useEffect(() => {
    if (hasPrefetchedProductsRef.current) {
      return;
    }

    const prefetchCount = Math.min(products.length, 3);
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
              <Image
                src="/images/catalogs/shopArrow.png"
                alt="Arrow Right"
                width={24}
                height={24}
                className={styles.shopArrow}
                loading="lazy"
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
                }`}
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
          <SliderSkeleton />
        ) : products.length > 0 ? (
          createElement(
            Swiper as any,
            {
              className: styles.slider,
              modules: [FreeMode],
              loop: true,
              spaceBetween,
              slidesOffsetAfter,
              slidesPerView: maxVisible,
              slidesPerGroup: 1,
              centeredSlides: isMobile,
              speed: width > 0 && width <= 480 ? 400 : 1100,
              followFinger: true,
              touchRatio: width > 0 && width <= 480 ? 1.2 : 1,
              longSwipesRatio: width > 0 && width <= 480 ? 0.3 : 0.15,
              resistance: true,
              resistanceRatio: width > 0 && width <= 480 ? 0.6 : 0.7,
              freeMode: {
                enabled: true,
                momentum: true,
                momentumRatio: 0.65,
                momentumVelocityRatio: 0.7,
                momentumBounce: false,
                minimumVelocity: 0.02,
                sticky: false,
              },
              grabCursor: true,
              watchSlidesProgress: true,
              watchOverflow: false,
              onSwiper: handleSwiper,
              onSlideChange: handleSlideChange,
              onBeforeInit: handleBeforeInit,
              lazy: {
                enabled: true,
                loadOnTransitionStart: true,
                loadPrevNext: true,
                loadPrevNextAmount: 3,
              },
            },
            [
              ...slidesForSwiper.map((product, index) => (
                <SwiperSlide
                  key={`${product.id}-${index}`}
                  className={styles.slideItem}
                >
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
                      colorLabel={product.colors?.[0]?.value ?? product.color}
                    />
                  </Link>
                </SwiperSlide>
              )),
            ]
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
