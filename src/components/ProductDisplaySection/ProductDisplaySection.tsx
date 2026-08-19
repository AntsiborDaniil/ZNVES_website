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
import SliderSkeleton from "./SliderSkeleton";
import styles from "./ProductDisplaySection.module.css";
import type { CatalogProduct } from "../../types/products";
import { fetchNewInProducts, fetchAllCatalogProducts } from "../../api/home/catalogApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import type { Swiper as SwiperInstance } from "swiper";
import { useWindowSize } from "../../hooks/useWindowSize";

type ProductDisplaySectionProps = {
  title: string;
  showShopNow: boolean;
  id?: string;
  isBestseller?: boolean;
  headerAlign?: "split" | "center";
};

const isNewInTitle = (title: string) =>
  title === "NEW IN" || title === "Bestsellers";

const ProductDisplaySection = ({
  title,
  showShopNow,
  id,
  isBestseller = false,
  headerAlign = "split",
}: ProductDisplaySectionProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [maxVisible, setMaxVisible] = useState<number | "auto">(4);
  const [spaceBetween, setSpaceBetween] = useState(20);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();

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

  const shopNowHref = isNewInTitle(title) ? "/new-in" : "/catalog";
  const uniqueCount = Math.max(products.length, 1);

  const syncSwiperState = useCallback(
    (swiper: SwiperInstance) => {
      const real = swiper.realIndex ?? 0;
      setActiveIndex(real % uniqueCount);
      setProgress(Math.min(100, Math.max(8, (swiper.progress || 0) * 100)));
    },
    [uniqueCount]
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
    [slidesForSwiper.length]
  );

  const goToSlide = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section
      id={id}
      className={`${styles.section} ${isBestseller ? styles.isBestseller : ""}`}
    >
      <SectionHeader
        title={title}
        href={showShopNow ? shopNowHref : undefined}
        actionLabel="Смотреть больше"
        align={headerAlign}
      />
      <div className={styles.sliderContainer}>
        {isLoading ? (
          <SliderSkeleton />
        ) : products.length > 0 ? (
          createElement(
            Swiper as ComponentType<Record<string, unknown>>,
            {
              className: styles.slider,
              modules: [FreeMode, Mousewheel],
              loop: true,
              spaceBetween,
              slidesPerView: maxVisible,
              slidesPerGroup: 1,
              speed: width > 0 && width <= 768 ? 400 : 1100,
              followFinger: true,
              touchRatio: 1,
              resistance: true,
              resistanceRatio: 0.65,
              freeMode: {
                enabled: true,
                momentum: true,
                momentumRatio: 0.65,
                momentumVelocityRatio: 0.7,
                momentumBounce: false,
                minimumVelocity: 0.02,
                sticky: false,
              },
              mousewheel: {
                enabled: true,
                forceToAxis: true,
                sensitivity: 0.8,
                releaseOnEdges: true,
              },
              grabCursor: true,
              watchSlidesProgress: true,
              watchOverflow: false,
              onSwiper: handleSwiper,
              onSlideChange: handleSlideChange,
              onProgress: syncSwiperState,
              onBeforeInit: handleBeforeInit,
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
              )),
            ]
          )
        ) : (
          <div className={styles.emptyState}>Товары не найдены</div>
        )}
      </div>
      {products.length > 0 && (
        <>
          <div className={styles.progress} aria-hidden>
            <span className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.bullets} role="tablist" aria-label="Слайды">
            {products.map((product, index) => (
              <button
                key={product.id}
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
    </section>
  );
};

export default ProductDisplaySection;
