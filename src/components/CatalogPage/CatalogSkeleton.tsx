"use client";

import styles from "./CatalogSkeleton.module.css";

const SKELETON_CARD_COUNT = 8;

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

export default function CatalogSkeleton() {
  return (
    <div className={styles.grid} role="status" aria-label="Загрузка каталога">
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
