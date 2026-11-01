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

type ProductGallerySwiperProps = {
  images: string[];
  productTitle: string;
};

/** Сначала только cover; соседи — после onLoad cover или при свайпе. */
const buildNeighborWindow = (active: number, total: number): Set<number> => {
  const next = new Set<number>();
  for (let i = active - 1; i <= active + 1; i += 1) {
    if (i >= 0 && i < total) next.add(i);
  }
  return next;
};

const ProductGallerySwiper = ({
  images,
  productTitle,
}: ProductGallerySwiperProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [coverReady, setCoverReady] = useState(false);
  const [unlocked, setUnlocked] = useState(() => {
    const initial = new Set<number>();
    if (images.length > 0) initial.add(0);
    return initial;
  });
  const gallerySwiperRef = useRef<SwiperInstance | null>(null);
  const coverReadyRef = useRef(false);

  useEffect(() => {
    setActiveImageIndex(0);
    coverReadyRef.current = false;
    setCoverReady(false);
    const initial = new Set<number>();
    if (images.length > 0) initial.add(0);
    setUnlocked(initial);
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

  const onCoverSettled = useCallback(() => {
    if (coverReadyRef.current) return;
    coverReadyRef.current = true;
    setCoverReady(true);
    unlockAround(0);
  }, [unlockAround]);

  // Кэш: onLoad может не сработать — добираем complete из DOM
  useEffect(() => {
    if (coverReadyRef.current || images.length === 0) return;
    const cover = images[0];
    const imgs = document.querySelectorAll<HTMLImageElement>(
      `.${styles.heroImage}`
    );
    for (const img of imgs) {
      if (img.getAttribute("src") !== cover) continue;
      if (img.complete) {
        onCoverSettled();
        return;
      }
    }
  }, [images, onCoverSettled, unlocked]);

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
                      loading={isCover || index === activeImageIndex ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={isCover ? "high" : "auto"}
                      onLoad={isCover ? onCoverSettled : undefined}
                      onError={(event) => {
                        event.currentTarget.src = PLACEHOLDER;
                        if (isCover) onCoverSettled();
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
          // Thumbs после cover — не конкурируют с первым кадром
          const thumbLoading =
            coverReady && index === activeImageIndex ? "eager" : "lazy";
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
                src={coverReady ? image : undefined}
                alt=""
                className={styles.thumbImage}
                loading={thumbLoading}
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
