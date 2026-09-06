"use client";

import Image from "next/image";
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ProductCard.module.css";
import {
  isSvgImageSrc,
  useImageLoadedStates,
} from "../../hooks/useImageLoadedStates";

type ProductCardProps = {
  title: string;
  price: string;
  images: string[];
  isNew: boolean;
  isSliderCard?: boolean;
  variant?: "slider" | "grid";
  zoomOnHover?: boolean;
};

const ProductCard = ({
  title,
  price,
  images,
  isNew,
  isSliderCard = false,
  variant = "slider",
  zoomOnHover = false,
}: ProductCardProps) => {
  const imageList = useMemo(() => {
    if (images.length === 0) {
      return ["/images/catalogs/placeholder.png"];
    }
    return images;
  }, [images]);

  const hasCarousel = imageList.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  // Карусель фото только в каталоге / new-in (не в слайдерах Bestsellers и т.п.)
  const useImageSwiper = !hoverEnabled && hasCarousel && !isSliderCard;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardSwiperRef = useRef<SwiperInstance | null>(null);
  const swipeMovedRef = useRef(false);
  const { loadedStates, markImageLoaded } = useImageLoadedStates(
    imageList,
    containerRef
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setHoverEnabled(mq.matches);
    const handler = () => setHoverEnabled(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    cardSwiperRef.current?.slideTo(0, 0);
  }, [imageList]);

  useEffect(() => {
    if (hoverEnabled) setCurrentIndex(0);
  }, [hoverEnabled]);

  const updateIndexFromPointer = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container || !hasCarousel) return;

      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const clampedX = Math.max(0, Math.min(relativeX, rect.width - 1));
      const segmentWidth = rect.width / imageList.length;
      const newIndex = Math.floor(clampedX / segmentWidth);

      setCurrentIndex((prev) => (prev === newIndex ? prev : newIndex));
    },
    [hasCarousel, imageList.length]
  );

  const handlePointerMoveHover = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hoverEnabled || !hasCarousel) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerEnterHover = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hoverEnabled || !hasCarousel) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerLeaveHover = () => {
    if (hoverEnabled) setCurrentIndex(0);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!swipeMovedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    swipeMovedRef.current = false;
  };

  return (
    <div
      className={`${styles.productCard} ${
        isSliderCard ? styles.sliderCard : ""
      } ${variant === "grid" ? styles.gridCard : ""} ${
        zoomOnHover ? styles.zoomOnHover : ""
      }`}
      onClickCapture={handleClickCapture}
    >
      <div className={styles.imageWrapper}>
        <div
          className={`${styles.imageContainer} ${
            useImageSwiper ? styles.imageContainerCarousel : ""
          }`}
          ref={containerRef}
          onPointerEnter={useImageSwiper ? undefined : handlePointerEnterHover}
          onPointerMove={useImageSwiper ? undefined : handlePointerMoveHover}
          onPointerLeave={useImageSwiper ? undefined : handlePointerLeaveHover}
          role={hasCarousel ? "group" : undefined}
          aria-label={
            hasCarousel
              ? `${title}, фото ${currentIndex + 1} из ${imageList.length}`
              : undefined
          }
        >
          {useImageSwiper ? (
            createElement(
              Swiper as ComponentType<Record<string, unknown>>,
              {
                modules: [Pagination],
                className: styles.cardSwiper,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 320,
                threshold: 18,
                longSwipesRatio: 0.35,
                longSwipesMs: 280,
                shortSwipes: true,
                resistanceRatio: 0.65,
                nested: true,
                touchStartPreventDefault: false,
                pagination: {
                  clickable: true,
                  bulletClass: styles.dot,
                  bulletActiveClass: styles.dotActive,
                },
                onSwiper: (swiper: SwiperInstance) => {
                  cardSwiperRef.current = swiper;
                },
                onSlideChange: (swiper: SwiperInstance) => {
                  setCurrentIndex(swiper.activeIndex);
                },
                onSliderMove: () => {
                  swipeMovedRef.current = true;
                },
                onTouchEnd: () => {
                  window.setTimeout(() => {
                    swipeMovedRef.current = false;
                  }, 50);
                },
                onTouchStart: (_swiper: SwiperInstance, event: Event) => {
                  swipeMovedRef.current = false;
                  event.stopPropagation();
                },
                onTouchMove: (_swiper: SwiperInstance, event: Event) => {
                  event.stopPropagation();
                },
              },
              imageList.map((image, index) =>
                createElement(
                  SwiperSlide as ComponentType<Record<string, unknown>>,
                  {
                    key: image + index,
                    className: styles.cardSwiperSlide,
                  },
                  <div className={styles.imageSlide}>
                    <Image
                      src={image}
                      alt={`${title} — фото ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 70vw, 40vw"
                      className={`${styles.productImage} ${styles.productImageCarousel} ${
                        loadedStates[index]
                          ? styles.productImageLoaded
                          : styles.productImageLoading
                      }`}
                      loading={index === 0 ? "eager" : "lazy"}
                      onLoad={() => markImageLoaded(index)}
                      quality={80}
                      unoptimized={isSvgImageSrc(image)}
                      draggable={false}
                    />
                  </div>
                )
              )
            )
          ) : (
            <div className={`${styles.imageTrack} ${styles.imageTrackStacked}`}>
              {imageList.map((image, index) => {
                const isActive = index === currentIndex;
                const isLoaded = loadedStates[index];
                return (
                  <div key={image + index} className={styles.imageSlide}>
                    <Image
                      src={image}
                      alt={`${title} — фото ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 22vw"
                      className={`${styles.productImage} ${
                        isActive ? styles.productImageVisible : ""
                      } ${
                        isLoaded
                          ? styles.productImageLoaded
                          : styles.productImageLoading
                      }`}
                      loading={isSliderCard && index === 0 ? "eager" : "lazy"}
                      onLoad={() => markImageLoaded(index)}
                      quality={80}
                      unoptimized={isSvgImageSrc(image)}
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {isNew && <div className={styles.newBadge}>NEW</div>}
        </div>
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{title}</h1>
        <p className={styles.productPrice}>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
