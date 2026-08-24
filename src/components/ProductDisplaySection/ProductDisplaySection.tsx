"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import Button from "../ui/Button/Button";
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
import {
  buildProductHref,
  type ProductNavFrom,
} from "../../lib/productNavigation";

export const BESTSELLERS_MAX_PRODUCTS = 8;

type ProductDisplaySectionProps = {
  title: string;
  showShopNow: boolean;
  id?: string;
  isBestseller?: boolean;
  headerAlign?: "split" | "center";
  maxProducts?: number;
  navFrom?: ProductNavFrom;
  navCategory?: string | null;
};

const isNewInTitle = (title: string) =>
  title === "NEW IN" || title === "Bestsellers";

const MIN_SLIDES_FOR_LOOP = 16;

const ProductDisplaySection = ({
  title,
  showShopNow,
  id,
  isBestseller = false,
  headerAlign = "split",
  maxProducts,
  navFrom = "home",
  navCategory = null,
}: ProductDisplaySectionProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [maxVisible, setMaxVisible] = useState<number | "auto">(4);
  const [spaceBetween, setSpaceBetween] = useState(20);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();

  const isLimitedSlider = maxProducts != null;

  useEffect(() => {
    if (width === 0) return;

    if (width <= 768) {
      setMaxVisible(2);
      setSpaceBetween(8);
    } else if (width <= 1200) {
      setMaxVisible(3);
      setSpaceBetween(16);
    } else {
      setMaxVisible(4);
      setSpaceBetween(20);
    }
  }, [width]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        if (isNewInTitle(title)) {
          const newInProducts = await fetchNewInProducts();
          setProducts(newInProducts);
        } else {
          const catalogProducts = await fetchAllCatalogProducts();
          setProducts(catalogProducts);
        }
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [title]);

  const displayProducts = useMemo(() => {
    if (!isLimitedSlider) return products;
    return products.slice(0, maxProducts);
  }, [products, maxProducts, isLimitedSlider]);

  const slidesForSwiper = useMemo(() => {
    if (displayProducts.length === 0) return [];
    if (isLimitedSlider) return displayProducts;

    if (displayProducts.length >= MIN_SLIDES_FOR_LOOP) return displayProducts;

    const repeated: CatalogProduct[] = [];
    while (repeated.length < MIN_SLIDES_FOR_LOOP) {
      repeated.push(...displayProducts);
    }
    return repeated;
  }, [displayProducts, isLimitedSlider]);

  const visibleCount = typeof maxVisible === "number" ? maxVisible : 4;
  const canScroll = displayProducts.length > visibleCount;
  const pageCount = canScroll
    ? displayProducts.length - visibleCount + 1
    : 0;
  const enableLoop =
    !isLimitedSlider && displayProducts.length >= MIN_SLIDES_FOR_LOOP;

  const shopNowHref = isNewInTitle(title) ? "/new-in" : "/catalog";
  const slideCount = Math.max(displayProducts.length, 1);
  const maxPageIndex = Math.max(pageCount - 1, 0);

  const syncSwiperState = useCallback(
    (swiper: SwiperInstance) => {
      const index = enableLoop
        ? swiper.realIndex ?? 0
        : swiper.activeIndex ?? 0;

      const pageIndex = enableLoop
        ? index % slideCount
        : Math.min(Math.max(index, 0), maxPageIndex);

      setActiveIndex(pageIndex);

      if (!canScroll) {
        setProgress(100);
        return;
      }

      setProgress(Math.min(100, Math.max(8, (swiper.progress || 0) * 100)));
    },
    [canScroll, enableLoop, maxPageIndex, slideCount]
  );

  const handleSwiper = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      syncSwiperState(swiper);
    },
    [syncSwiperState]
  );

  const handleSlideChange = useCallback(
    (swiper: SwiperInstance) => {
      syncSwiperState(swiper);
    },
    [syncSwiperState]
  );

  const handleBeforeInit = useCallback(
    (swiper: SwiperInstance) => {
      if (!enableLoop) return;

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
    },
    [enableLoop, slidesForSwiper.length]
  );

  const goToSlide = (index: number) => {
    if (enableLoop) {
      swiperRef.current?.slideToLoop(index);
      return;
    }

    swiperRef.current?.slideTo(index);
  };

  return (
    <section
      id={id}
      className={`${styles.section} ${isBestseller ? styles.isBestseller : ""} ${
        headerAlign === "center" ? styles.sectionCentered : ""
      }`}
    >
      <div className={isBestseller ? styles.bestsellerHeader : undefined}>
        <SectionHeader
          title={title}
          href={showShopNow ? shopNowHref : undefined}
          actionLabel="Смотреть больше"
          align={headerAlign}
        />
      </div>
      <div className={styles.sliderContainer}>
        {isLoading ? (
          <SliderSkeleton
            cardCount={typeof maxVisible === "number" ? maxVisible : 4}
          />
        ) : displayProducts.length > 0 ? (
          createElement(
            Swiper as ComponentType<Record<string, unknown>>,
            {
              className: styles.slider,
              modules: [FreeMode],
              loop: enableLoop,
              spaceBetween,
              slidesPerView: maxVisible,
              slidesPerGroup: 1,
              speed: width > 0 && width <= 768 ? 400 : 1100,
              followFinger: true,
              touchRatio: 1,
              resistance: true,
              resistanceRatio: 0.65,
              allowTouchMove: true,
              watchOverflow: true,
              freeMode: {
                enabled: true,
                momentum: true,
                momentumRatio: 0.65,
                momentumVelocityRatio: 0.7,
                momentumBounce: false,
                minimumVelocity: 0.02,
                sticky: true,
              },
              grabCursor: true,
              watchSlidesProgress: true,
              onSwiper: handleSwiper,
              onSlideChange: handleSlideChange,
              onProgress: syncSwiperState,
              onBeforeInit: handleBeforeInit,
            },
            slidesForSwiper.map((product, index) => (
              <SwiperSlide
                key={isLimitedSlider ? product.id : `${product.id}-${index}`}
                className={styles.slideItem}
              >
                <Link
                  href={buildProductHref(product.slug || product.id, {
                    from: navFrom,
                    category: navCategory,
                  })}
                  className={styles.slideLink}
                  aria-label={`Перейти к товару ${product.title}`}
                  prefetch={false}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    images={product.images}
                    isNew={product.isNew}
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
      {pageCount > 1 && displayProducts.length > 0 && (
        <>
          <div className={styles.progress} aria-hidden>
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.bullets} role="tablist" aria-label="Слайды">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.bullet} ${
                  index === activeIndex ? styles.bulletActive : ""
                }`}
                aria-label={`Слайд ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
      {showShopNow && (
        <div className={styles.mobileMore}>
          <Button href={shopNowHref} variant="outline" fullWidth>
            Смотреть больше
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProductDisplaySection;
