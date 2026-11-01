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
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import styles from "./ProductPageView.module.css";

const MAX_VISIBLE_THUMBS = 7;
const PLACEHOLDER = "/images/catalogs/placeholder.png";

type ProductGallerySwiperProps = {
  images: string[];
  productTitle: string;
};

/** Окно вокруг активного слайда — без native lazy (ломается в Swiper на мобилке). */
const buildWindow = (active: number, total: number): Set<number> => {
  const next = new Set<number>();
  for (let i = active - 1; i <= active + 2; i += 1) {
    if (i >= 0 && i < total) next.add(i);
  }
  if (total > 0) next.add(0);
  return next;
};

const ProductGallerySwiper = ({
  images,
  productTitle,
}: ProductGallerySwiperProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(() =>
    buildWindow(0, images.length)
  );
  const gallerySwiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setUnlocked(buildWindow(0, images.length));
    gallerySwiperRef.current?.slideTo(0);
  }, [images]);

  const unlockAround = useCallback(
    (index: number) => {
      setUnlocked((prev) => {
        const windowed = buildWindow(index, images.length);
        let changed = false;
        windowed.forEach((i) => {
          if (!prev.has(i)) changed = true;
        });
        if (!changed) return prev;
        const merged = new Set(prev);
        windowed.forEach((i) => merged.add(i));
        return merged;
      });
    },
    [images.length]
  );

  // Прогрев URL в кэш браузера для разблокированных кадров
  useEffect(() => {
    unlocked.forEach((index) => {
      const src = images[index];
      if (!src) return;
      const probe = new window.Image();
      probe.decoding = "async";
      probe.src = src;
    });
  }, [unlocked, images]);

  const hasOverflow = images.length > MAX_VISIBLE_THUMBS;
  const overflowCount = hasOverflow
    ? images.length - (MAX_VISIBLE_THUMBS - 1)
    : 0;
  const visibleThumbs =
    overflowCount > 0 ? images.slice(0, MAX_VISIBLE_THUMBS) : images;

  const goToImage = (index: number) => {
    setActiveImageIndex(index);
    unlockAround(index);
    gallerySwiperRef.current?.slideTo(index);
  };

  const thumbEagerUntil = useMemo(
    () => Math.min(3, visibleThumbs.length),
    [visibleThumbs.length]
  );

  return (
    <div className={styles.imageSliderWrap}>
      <div className={styles.heroWrap}>
        {images.length > 1 && (
          <button
            type="button"
            className={`${styles.galleryArrow} ${styles.galleryPrev}`}
            aria-label="Предыдущее фото"
            onClick={() => gallerySwiperRef.current?.slidePrev()}
          >
            <Image
              src="/images/product/gallery-arrow.svg"
              alt=""
              width={6}
              height={11}
              className={styles.galleryArrowIcon}
              unoptimized
            />
          </button>
        )}
        {createElement(
          Swiper as ComponentType<Record<string, unknown>>,
          {
            slidesPerView: 1,
            spaceBetween: 0,
            className: styles.imageSlider,
            onSwiper: (swiper: SwiperInstance) => {
              gallerySwiperRef.current = swiper;
              unlockAround(swiper.activeIndex);
            },
            onSlideChange: (swiper: SwiperInstance) => {
              setActiveImageIndex(swiper.activeIndex);
              unlockAround(swiper.activeIndex);
            },
            onSlideChangeTransitionStart: (swiper: SwiperInstance) => {
              unlockAround(swiper.activeIndex);
            },
          },
          images.map((image, index) => {
            const isUnlocked = unlocked.has(index);
            return (
              <SwiperSlide key={image + index}>
                <div className={styles.heroSlide}>
                  {isUnlocked ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`${productTitle} — фото ${index + 1}`}
                      className={styles.heroImage}
                      loading="eager"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      onError={(event) => {
                        event.currentTarget.src = PLACEHOLDER;
                      }}
                    />
                  ) : (
                    <div className={styles.heroImage} aria-hidden />
                  )}
                </div>
              </SwiperSlide>
            );
          })
        )}
        {images.length > 1 && (
          <button
            type="button"
            className={`${styles.galleryArrow} ${styles.galleryNext}`}
            aria-label="Следующее фото"
            onClick={() => gallerySwiperRef.current?.slideNext()}
          >
            <Image
              src="/images/product/gallery-arrow.svg"
              alt=""
              width={6}
              height={11}
              className={styles.galleryArrowIcon}
              unoptimized
            />
          </button>
        )}
      </div>
      <div className={styles.thumbs} role="tablist" aria-label="Фотографии товара">
        {visibleThumbs.map((image, index) => {
          const isLastOverflow =
            overflowCount > 0 && index === visibleThumbs.length - 1;
          return (
            <button
              key={image + index}
              type="button"
              className={`${styles.thumb} ${
                activeImageIndex === index ? styles.thumbActive : ""
              }`}
              onClick={() => goToImage(index)}
              aria-label={
                isLastOverflow
                  ? `Ещё ${overflowCount} фото`
                  : `Фото ${index + 1}`
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className={styles.thumbImage}
                loading={index < thumbEagerUntil ? "eager" : "lazy"}
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = PLACEHOLDER;
                }}
              />
              {isLastOverflow && (
                <span className={styles.thumbMore}>+{overflowCount}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallerySwiper;
