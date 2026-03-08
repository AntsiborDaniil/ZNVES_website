"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../ui/ToastProvider/ToastProvider";
import { getProductById } from "../../data/products";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  title: string;
  price: string;
  images: string[];
  isNew: boolean;
  productId?: number;
  showAddToCart?: boolean;
  isSliderCard?: boolean;
  variant?: "slider" | "grid";
  /** Подпись цвета для корзины (чтобы не дергать API colors на cart) */
  colorLabel?: string;
};

const ProductCard = ({
  title,
  price,
  images,
  isNew,
  productId,
  showAddToCart = true,
  isSliderCard = false,
  variant = "slider",
  colorLabel: colorLabelProp,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const imageList = useMemo(() => {
    if (images.length === 0) {
      return ["/images/catalogs/placeholder.png"];
    }
    return images;
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedStates, setLoadedStates] = useState<boolean[]>([]);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const touchUsedRef = useRef(false);
  const DOUBLE_TAP_MS = 350;
  const DOUBLE_TAP_PX = 40;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    setHoverEnabled(mq.matches);
    const handler = () => setHoverEnabled(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setLoadedStates(new Array(imageList.length).fill(false));
  }, [imageList]);

  useEffect(() => {
    if (!hoverEnabled) setCurrentIndex(0);
  }, [hoverEnabled]);

  const markImageLoaded = useCallback((index: number) => {
    setLoadedStates((prev) => {
      if (prev[index]) {
        return prev;
      }
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const updateIndexFromPointer = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container || imageList.length <= 1) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const clampedX = Math.max(0, Math.min(relativeX, rect.width - 1));
      const segmentWidth = rect.width / imageList.length;
      const newIndex = Math.floor(clampedX / segmentWidth);

      setCurrentIndex((prev) => (prev === newIndex ? prev : newIndex));
    },
    [imageList.length]
  );

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hoverEnabled || imageList.length <= 1) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hoverEnabled || imageList.length <= 1) return;
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerLeave = () => {
    if (hoverEnabled) setCurrentIndex(0);
  };

  // Двойное касание / двойной клик на маленьких экранах — листаем на следующее фото
  const handleDoubleTapOrClick = useCallback(
    (clientX: number, clientY: number) => {
      if (hoverEnabled || imageList.length <= 1) return;
      const now = Date.now();
      const prev = lastTapRef.current;
      const isDoubleTap =
        prev &&
        now - prev.time < DOUBLE_TAP_MS &&
        Math.abs(clientX - prev.x) < DOUBLE_TAP_PX &&
        Math.abs(clientY - prev.y) < DOUBLE_TAP_PX;
      if (isDoubleTap) {
        lastTapRef.current = null;
        setCurrentIndex((i) => (i + 1) % imageList.length);
        return;
      }
      lastTapRef.current = { time: now, x: clientX, y: clientY };
    },
    [hoverEnabled, imageList.length]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (touchUsedRef.current) return;
      handleDoubleTapOrClick(e.clientX, e.clientY);
    },
    [handleDoubleTapOrClick]
  );

  const handleContainerTouchStart = useCallback(() => {
    touchUsedRef.current = true;
  }, []);

  const handleContainerTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.changedTouches?.[0];
      if (touch) handleDoubleTapOrClick(touch.clientX, touch.clientY);
      setTimeout(() => {
        touchUsedRef.current = false;
      }, 400);
    },
    [handleDoubleTapOrClick]
  );

  // Снять блюр с картинок, уже загруженных из кэша или при позднем decode (onLoad может не сработать)
  const syncLoadedStateFromDom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const imgs = container.querySelectorAll("img");
    imgs.forEach((img, index) => {
      if (img.complete && img.naturalWidth > 0 && index < imageList.length) {
        markImageLoaded(index);
      }
    });
  }, [imageList.length, imageList, markImageLoaded]);

  useEffect(() => {
    const t0 = setTimeout(syncLoadedStateFromDom, 0);
    const t1 = setTimeout(syncLoadedStateFromDom, 120);
    const t2 = setTimeout(syncLoadedStateFromDom, 350);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [imageList.length, imageList, markImageLoaded, syncLoadedStateFromDom]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId) {
      return;
    }

    const product = getProductById(productId);
    if (!product) {
      return;
    }

    const catalogProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      priceValue: product.priceValue,
      images: product.images,
      isNew: product.isNew,
      category: product.category,
      color: product.color,
      size: product.size,
      sortOrder: product.sortOrder,
    };

    addItem(
      catalogProduct,
      product.defaultSize,
      product.availableColors[0]?.value || product.color,
      1,
      undefined,
      colorLabelProp ?? product.availableColors[0]?.label
    );

    showToast("Добавлено в корзину");
  };

  return (
    <div
      className={`${styles.productCard} ${
        isSliderCard ? styles.sliderCard : ""
      } ${variant === "grid" ? styles.gridCard : ""}`}
    >
      <div className={styles.imageWrapper}>
        <div
          className={styles.imageContainer}
          ref={containerRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleContainerClick}
          onTouchStart={handleContainerTouchStart}
          onTouchEnd={handleContainerTouchEnd}
          role={imageList.length > 1 ? "button" : undefined}
          aria-label={imageList.length > 1 ? "Двойное нажатие — следующее фото" : undefined}
        >
          {imageList.map((image, index) => {
            const isActive = index === currentIndex;
            const isLoaded = loadedStates[index];
            return (
              <Image
                key={image + index}
                src={image}
                alt={`${title} — фото ${index + 1}`}
                fill
                sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 22vw"
                className={`${styles.productImage} swiper-lazy ${
                  isActive ? styles.productImageVisible : ""
                } ${
                  isLoaded
                    ? styles.productImageLoaded
                    : styles.productImageLoading
                }`}
                loading={isSliderCard && index === 0 ? "eager" : "lazy"}
                onLoad={() => markImageLoaded(index)}
                quality={80}
              />
            );
          })}
          {isNew && <div className={styles.newBadge}>new</div>}
        </div>
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{title}</h1>
        <p className={styles.productPrice}>{price}</p>
        {productId && showAddToCart && (
          <button
            type="button"
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            aria-label="Добавить в корзину"
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
