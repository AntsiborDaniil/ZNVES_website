"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./CatalogPage.module.css";
import type { CatalogProduct } from "../../types/products";
import {
  buildProductHref,
  type ProductNavFrom,
} from "../../lib/productNavigation";
import {
  isSvgImageSrc,
  useImageLoadedStates,
} from "../../hooks/useImageLoadedStates";

type CatalogGridCardProps = {
  product: CatalogProduct;
  navFrom?: ProductNavFrom;
  navCategory?: string | null;
};

const CatalogGridCard = ({
  product,
  navFrom = "catalog",
  navCategory = null,
}: CatalogGridCardProps) => {
  const imageList = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return ["/images/catalogs/placeholder.png"];
    }
    return product.images;
  }, [product.images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const { loadedStates, markImageLoaded } = useImageLoadedStates(
    imageList,
    imageContainerRef
  );
  const router = useRouter();
  const hasPrefetchedRef = useRef(false);
  const prefetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const PREFETCH_DELAY_MS = 150;

  const updateIndexFromPointer = (clientX: number) => {
    const container = imageContainerRef.current;
    if (!container || imageList.length <= 1) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(relativeX, rect.width - 1));
    const segmentWidth = rect.width / imageList.length;
    const newIndex = Math.floor(clampedX / segmentWidth);

    setCurrentIndex((prev) => (prev === newIndex ? prev : newIndex));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    updateIndexFromPointer(event.clientX);
  };

  const handlePointerLeave = () => {
    setCurrentIndex(0);
  };

  const productHref = buildProductHref(product.slug || product.id, {
    from: navFrom,
    category: navCategory,
  });

  const prefetchProduct = useCallback(() => {
    if (hasPrefetchedRef.current) return;
    if (prefetchTimeoutRef.current) return;

    prefetchTimeoutRef.current = setTimeout(() => {
      prefetchTimeoutRef.current = null;
      if (hasPrefetchedRef.current) return;
      void router.prefetch(productHref);
      hasPrefetchedRef.current = true;
    }, PREFETCH_DELAY_MS);
  }, [router, productHref]);

  const cancelPrefetch = useCallback(() => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
      prefetchTimeoutRef.current = null;
    }
  }, []);

  return (
    <Link
      href={productHref}
      className={styles.catalogCardLink}
      aria-label={`Открыть товар ${product.title}`}
      onPointerEnter={prefetchProduct}
      onPointerLeave={cancelPrefetch}
      onFocus={prefetchProduct}
    >
      <article className={styles.catalogCard}>
        <div
          className={styles.catalogCardImageWrapper}
          ref={imageContainerRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className={styles.catalogCardImageContainer}>
            {imageList.map((image, index) => {
              const isActive = index === currentIndex;
              const isLoaded = loadedStates[index];
              return (
                <Image
                  key={image + index}
                  src={image}
                  alt={`${product.title} — фото ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 22vw"
                  className={`${styles.catalogCardImage} ${
                    isActive ? styles.catalogCardImageVisible : ""
                  } ${
                    isLoaded
                      ? styles.catalogCardImageLoaded
                      : styles.catalogCardImageLoading
                  }`}
                  loading="lazy"
                  onLoad={() => markImageLoaded(index)}
                  quality={80}
                  unoptimized={isSvgImageSrc(image)}
                />
              );
            })}
            {product.isNew && (
              <span className={styles.catalogCardBadge}>new</span>
            )}
          </div>
        </div>
        <div className={styles.catalogCardInfo}>
          <h2 className={styles.catalogCardTitle}>{product.title}</h2>
          <span className={styles.catalogCardPrice}>{product.price}</span>
        </div>
      </article>
    </Link>
  );
};

export default CatalogGridCard;
