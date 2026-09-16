"use client";

import {
  createElement,
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

type ProductGallerySwiperProps = {
  images: string[];
  productTitle: string;
};

const ProductGallerySwiper = ({
  images,
  productTitle,
}: ProductGallerySwiperProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallerySwiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    gallerySwiperRef.current?.slideTo(0);
  }, [images]);

  const hasOverflow = images.length > MAX_VISIBLE_THUMBS;
  const overflowCount = hasOverflow
    ? images.length - (MAX_VISIBLE_THUMBS - 1)
    : 0;
  const visibleThumbs =
    overflowCount > 0 ? images.slice(0, MAX_VISIBLE_THUMBS) : images;

  const goToImage = (index: number) => {
    setActiveImageIndex(index);
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
            },
          },
          images.map((image, index) => (
            <SwiperSlide key={image + index}>
              <div className={styles.heroSlide}>
                <img
                  src={image}
                  alt={`${productTitle} — фото ${index + 1}`}
                  className={styles.heroImage}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))
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
              <img src={image} alt="" className={styles.thumbImage} />
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
