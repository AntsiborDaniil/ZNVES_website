"use client";

import styles from "./SliderSkeleton.module.css";

type SliderSkeletonProps = {
  cardCount?: number;
};

function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden>
      <div className={styles.imageWrap}>
        <div className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.titleLine} />
        <div className={styles.titleLineShort} />
        <div className={styles.priceLine} />
      </div>
    </div>
  );
}

export default function SliderSkeleton({ cardCount = 4 }: SliderSkeletonProps) {
  return (
    <div
      className={styles.track}
      role="status"
      aria-label="Загрузка товаров"
    >
      {Array.from({ length: cardCount }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
