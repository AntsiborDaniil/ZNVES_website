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
};

const ProductCard = ({
  title,
  price,
  images,
  isNew,
  productId,
  showAddToCart = true,
  isSliderCard = false,
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoadedStates(new Array(imageList.length).fill(false));
  }, [imageList]);

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
    if (imageList.length <= 1) {
      return;
    }
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (imageList.length <= 1) {
      return;
    }
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerLeave = () => {
    setCurrentIndex(0);
  };

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
      1
    );

    showToast("Добавлено в корзину");
  };

  return (
    <div
      className={`${styles.productCard} ${
        isSliderCard ? styles.sliderCard : ""
      }`}
    >
      <div className={styles.imageWrapper}>
        <div
          className={styles.imageContainer}
          ref={containerRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
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
                loading={index === 0 ? "eager" : "lazy"}
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
