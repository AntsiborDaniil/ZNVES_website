"use client";

import {
  createElement,
  useCallback,
  useEffect,
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
/** На LTE сразу греем первые кадры — иначе свайп ждёт полные JPG по одному */
const INITIAL_UNLOCK = 4;

type ProductGallerySwiperProps = {
  images: string[];
  productTitle: string;
};

const buildNeighborWindow = (active: number, total: number): Set<number> => {
  const next = new Set<number>();
  for (let i = active - 1; i <= active + 2; i += 1) {
    if (i >= 0 && i < total) next.add(i);
  }
  return next;
};

const buildInitialUnlock = (total: number): Set<number> => {
  const next = new Set<number>();
  const until = Math.min(INITIAL_UNLOCK, total);
  for (let i = 0; i < until; i += 1) next.add(i);
  return next;
};

const ProductGallerySwiper = ({
  images,
  productTitle,
}: ProductGallerySwiperProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(() =>
    buildInitialUnlock(images.length)
  );
  const gallerySwiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setUnlocked(buildInitialUnlock(images.length));
    gallerySwiperRef.current?.slideTo(0, 0);
  }, [images]);

  const mergeUnlock = useCallback((indices: Iterable<number>) => {
    setUnlocked((prev) => {
      let changed = false;
      const merged = new Set(prev);
      for (const i of indices) {
        if (!merged.has(i)) {
          merged.add(i);
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  }, []);

  const unlockAround = useCallback(
    (index: number) => {
      mergeUnlock(buildNeighborWindow(index, images.length));
    },
    [images.length, mergeUnlock]
  );

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
            const isCover = index === 0;
            return (
              <SwiperSlide key={image + index}>
                <div className={styles.heroSlide}>
                  {isUnlocked ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`${productTitle} — фото ${index + 1}`}
                      className={styles.heroImage}
                      loading={index < INITIAL_UNLOCK ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={isCover ? "high" : "auto"}
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
                loading={index < 2 ? "eager" : "lazy"}
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
