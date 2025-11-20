"use client";

import { useEffect, useState, useCallback } from "react";
import ScrollBlocker from "../ScrollBlocker/ScrollBlocker";
import type { CatalogProduct } from "../../types/products";

type HomePageImageLoaderProps = {
  newInProducts: CatalogProduct[];
  catalogProducts: CatalogProduct[];
  children: React.ReactNode;
};

const HomePageImageLoader = ({
  newInProducts,
  catalogProducts,
  children,
}: HomePageImageLoaderProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [totalImages, setTotalImages] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  // Собираем все изображения из первых видимых карточек
  useEffect(() => {
    const collectImages = () => {
      const images: string[] = [];
      
      // Берем первые 4-6 карточек из каждого слайдера (видимые + 2 следующих)
      const visibleCount = 6;
      
      [...newInProducts.slice(0, visibleCount), ...catalogProducts.slice(0, visibleCount)].forEach(
        (product) => {
          if (product.images && product.images.length > 0) {
            // Берем только первое изображение каждой карточки для быстрой загрузки
            images.push(product.images[0]);
          }
        }
      );

      setTotalImages(images.length);
      return images;
    };

    const images = collectImages();
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let mounted = true;
    const loaded = new Set<string>();
    const timeouts: NodeJS.Timeout[] = [];

    const handleImageLoad = (src: string) => {
      if (!mounted) return;
      
      if (!loaded.has(src)) {
        loaded.add(src);
        setLoadedImages((prev) => new Set([...prev, src]));
        setLoadedCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= images.length) {
            setImagesLoaded(true);
          }
          return newCount;
        });
      }
    };

    const handleImageError = (src: string) => {
      // Считаем ошибку как загруженное, чтобы не блокировать
      handleImageLoad(src);
    };

    // Предзагружаем все изображения
    images.forEach((src) => {
      const img = new Image();
      
      // Таймаут на случай зависших изображений (10 секунд)
      const timeout = setTimeout(() => {
        if (!loaded.has(src)) {
          handleImageError(src);
        }
      }, 10000);
      timeouts.push(timeout);

      img.onload = () => {
        clearTimeout(timeout);
        handleImageLoad(src);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        handleImageError(src);
      };
      img.src = src;
    });

    return () => {
      mounted = false;
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [newInProducts, catalogProducts]);

  const handleImagesLoaded = useCallback(() => {
    // Дополнительная логика после загрузки, если нужна
  }, []);

  return (
    <>
      <ScrollBlocker
        imagesLoaded={imagesLoaded}
        onImagesLoaded={handleImagesLoaded}
      />
      {children}
    </>
  );
};

export default HomePageImageLoader;


