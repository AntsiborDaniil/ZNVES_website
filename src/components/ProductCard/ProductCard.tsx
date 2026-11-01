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
  /** Первые карточки — LCP / SSR priority */
  imagePriority?: boolean;
  /**
   * false — только шиммер (offscreen в слайдере).
   * По умолчанию true; без priority картинка ждёт IntersectionObserver.
   */
  loadImage?: boolean;
};

const ProductCard = ({
  title,
  price,
  images,
  isNew,
  isSliderCard = false,
  variant = "slider",
  zoomOnHover = false,
  imagePriority = false,
  loadImage = true,
}: ProductCardProps) => {
  // null до mount — SSR и первый client paint совпадают (без Swiper)
  const [hoverEnabled, setHoverEnabled] = useState<boolean | null>(null);
  const isDesktopHover = hoverEnabled === true;

  const imageList = useMemo(() => {
    if (images.length === 0) {
      return ["/images/catalogs/placeholder.png"];
    }
    // Mobile slider: только cover. Desktop — все кадры для hover
    if (isSliderCard && hoverEnabled === false) {
      return [images[0]];
    }
    return images;
  }, [images, isSliderCard, hoverEnabled]);

  const hasCarousel = imageList.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const useImageSwiper = hoverEnabled === false && hasCarousel && !isSliderCard;
  /** Одиночный cover только на mobile-слайдере; на desktop — hover-стек */
  const useSliderCoverOnly = isSliderCard && !isDesktopHover;

  // Priority / явный loadImage=false: сразу; иначе — IO (каталог ниже fold)
  const [nearViewport, setNearViewport] = useState(
    () => imagePriority || isSliderCard
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardSwiperRef = useRef<SwiperInstance | null>(null);
  const swipeMovedRef = useRef(false);
  const { loadedStates, markImageLoaded } = useImageLoadedStates(
    imageList,
    containerRef
  );

  const allowMedia = loadImage && (imagePriority || nearViewport || isSliderCard);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setHoverEnabled(mq.matches);
    const handler = () => setHoverEnabled(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (imagePriority || isSliderCard || !loadImage) {
      setNearViewport(true);
      return;
    }
    const root = containerRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [imagePriority, isSliderCard, loadImage]);

  useEffect(() => {
    setCurrentIndex(0);
    cardSwiperRef.current?.slideTo(0, 0);
  }, [imageList]);

  useEffect(() => {
    if (isDesktopHover) setCurrentIndex(0);
  }, [isDesktopHover]);

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
    if (!isDesktopHover || !hasCarousel) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerEnterHover = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDesktopHover || !hasCarousel) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerLeaveHover = () => {
    if (isDesktopHover) setCurrentIndex(0);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!swipeMovedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    swipeMovedRef.current = false;
  };

  const cardClassName = zoomOnHover
    ? `${styles.productCard} ${styles.zoomOnHover}`
    : styles.productCard;

  const coverSrc = imageList[0];
  const coverLoaded = Boolean(loadedStates[0]);

  return (
    <div className={cardClassName} onClickCapture={handleClickCapture}>
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
          {useSliderCoverOnly ? (
            <>
              <div
                className={`${styles.imageShimmer} ${
                  coverLoaded ? styles.imageShimmerHidden : ""
                }`}
                aria-hidden
              />
              {allowMedia && coverSrc ? (
                // Нативный img: сразу opacity 1 — LTE не держит вечный шиммер
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverSrc}
                  alt={title}
                  className={`${styles.productImage} ${styles.productImageCarousel} ${
                    coverLoaded
                      ? styles.productImageLoaded
                      : styles.productImageLoading
                  }`}
                  loading={imagePriority || loadImage ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={imagePriority ? "high" : "auto"}
                  draggable={false}
                  onLoad={() => markImageLoaded(0)}
                  onError={() => markImageLoaded(0)}
                />
              ) : null}
            </>
          ) : useImageSwiper ? (
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
              imageList.map((image, index) => {
                const inWindow = Math.abs(index - currentIndex) <= 1;
                const shouldRender = allowMedia && (inWindow || index === 0);
                return createElement(
                  SwiperSlide as ComponentType<Record<string, unknown>>,
                  {
                    key: image + index,
                    className: styles.cardSwiperSlide,
                  },
                  <div className={styles.imageSlide}>
                    <div
                      className={`${styles.imageShimmer} ${
                        loadedStates[index] ? styles.imageShimmerHidden : ""
                      }`}
                      aria-hidden
                    />
                    {shouldRender ? (
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
                        priority={imagePriority && index === 0}
                        loading={inWindow || index === 0 ? "eager" : "lazy"}
                        fetchPriority={
                          index === 0 && imagePriority ? "high" : "auto"
                        }
                        onLoad={() => markImageLoaded(index)}
                        onError={() => markImageLoaded(index)}
                        quality={variant === "grid" ? 70 : 80}
                        unoptimized={isSvgImageSrc(image)}
                        draggable={false}
                      />
                    ) : null}
                  </div>
                );
              })
            )
          ) : (
            <div className={`${styles.imageTrack} ${styles.imageTrackStacked}`}>
              {imageList.map((image, index) => {
                const isActive = index === currentIndex;
                const isLoaded = loadedStates[index];
                const nearActive = Math.abs(index - currentIndex) <= 1;
                const coverPriority = imagePriority && index === 0;
                const shouldMount =
                  allowMedia &&
                  (isActive ||
                    nearActive ||
                    index === 0 ||
                    isDesktopHover ||
                    Boolean(loadedStates[index]));
                return (
                  <div key={image + index} className={styles.imageSlide}>
                    {isActive || index === 0 ? (
                      <div
                        className={`${styles.imageShimmer} ${
                          isLoaded ? styles.imageShimmerHidden : ""
                        }`}
                        aria-hidden
                      />
                    ) : null}
                    {shouldMount ? (
                      <Image
                        src={image}
                        alt={`${title} — фото ${index + 1}`}
                        fill
                        sizes={
                          variant === "grid"
                            ? "(max-width: 768px) 48vw, (max-width: 1200px) 30vw, 22vw"
                            : "(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 22vw"
                        }
                        className={`${styles.productImage} ${
                          isActive && isLoaded ? styles.productImageVisible : ""
                        } ${
                          isLoaded
                            ? styles.productImageLoaded
                            : styles.productImageLoading
                        }`}
                        priority={coverPriority}
                        loading={
                          coverPriority || nearActive || isActive
                            ? "eager"
                            : "lazy"
                        }
                        fetchPriority={coverPriority ? "high" : "auto"}
                        onLoad={() => markImageLoaded(index)}
                        onError={() => markImageLoaded(index)}
                        quality={variant === "grid" ? 70 : 80}
                        unoptimized={isSvgImageSrc(image)}
                        draggable={false}
                      />
                    ) : null}
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
