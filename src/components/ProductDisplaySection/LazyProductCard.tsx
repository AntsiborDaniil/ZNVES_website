"use client";

import { useEffect, useState, useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import type { CatalogProduct } from "../../types/products";
import styles from "./ProductDisplaySection.module.css";

type LazyProductCardProps = {
  product: CatalogProduct;
  index: number;
  isInitialRender: boolean;
};

const LazyProductCard = ({
  product,
  index,
  isInitialRender,
}: LazyProductCardProps) => {
  const [shouldRender, setShouldRender] = useState(isInitialRender);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Если уже должен рендериться, не проверяем
    if (shouldRender) {
      return;
    }

    // Используем Intersection Observer для определения видимости
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      {
        // Начинаем загрузку когда карточка находится в 200px от viewport
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldRender]);

  // Если не должен рендериться, показываем placeholder
  if (!shouldRender) {
    return (
      <div
        ref={cardRef}
        className={styles.lazyPlaceholder}
        aria-label="Загрузка карточки товара"
      />
    );
  }

  return (
    <Link
      ref={cardRef}
      href={`/catalog/${product.id}`}
      className={styles.slideLink}
      aria-label={`Перейти к товару ${product.title}`}
    >
      <ProductCard
        title={product.title}
        price={product.price}
        images={product.images}
        isNew={product.isNew}
        productId={product.id}
        showAddToCart={false}
      />
    </Link>
  );
};

export default LazyProductCard;
