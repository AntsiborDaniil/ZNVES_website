"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./CatalogPage.module.css";
import type { CatalogProduct } from "../../types/products";

type CatalogGridCardProps = {
  product: CatalogProduct;
};

const CatalogGridCard = ({ product }: CatalogGridCardProps) => {
  const imageList = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return ["/images/catalogs/placeholder.png"];
    }
    return product.images;
  }, [product.images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedStates, setLoadedStates] = useState<boolean[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const hasPrefetchedRef = useRef(false);
  const prefetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const PREFETCH_DELAY_MS = 150;

  useEffect(() => {
    setLoadedStates(new Array(imageList.length).fill(false));
  }, [imageList]);

  // Снять блюр с картинок, уже загруженных из кэша или при позднем decode (onLoad может не сработать)
  useEffect(() => {
    const syncLoadedStateFromDom = () => {
      const container = imageContainerRef.current;
      if (!container) return;
      const imgs = container.querySelectorAll("img");
      imgs.forEach((img, index) => {
        if (img.complete && img.naturalWidth > 0 && index < imageList.length) {
          markImageLoaded(index);
        }
      });
    };
    const t0 = setTimeout(syncLoadedStateFromDom, 0);
    const t1 = setTimeout(syncLoadedStateFromDom, 120);
    const t2 = setTimeout(syncLoadedStateFromDom, 350);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [imageList.length, imageList]);

  const markImageLoaded = (index: number) => {
    setLoadedStates((prev) => {
      if (prev[index]) {
        return prev;
      }
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

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

  const prefetchProduct = useCallback(() => {
    if (hasPrefetchedRef.current) return;
    if (prefetchTimeoutRef.current) return;

    prefetchTimeoutRef.current = setTimeout(() => {
      prefetchTimeoutRef.current = null;
      if (hasPrefetchedRef.current) return;
      const productSlug = product.slug || product.id;
      void router.prefetch(`/catalog/${productSlug}`);
      hasPrefetchedRef.current = true;
    }, PREFETCH_DELAY_MS);
  }, [router, product.id, product.slug]);

  const cancelPrefetch = useCallback(() => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
      prefetchTimeoutRef.current = null;
    }
  }, []);

  return (
    <Link
      href={`/catalog/${product.slug || product.id}`}
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
