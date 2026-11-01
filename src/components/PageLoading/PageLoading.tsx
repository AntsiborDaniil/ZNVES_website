import CatalogSkeleton from "../CatalogPage/CatalogSkeleton";
import styles from "./PageLoading.module.css";

type PageLoadingProps = {
  title?: string;
  ariaLabel?: string;
};

/** Полностраничная заглушка каталога / new-in в тонах сайта. */
export default function PageLoading({
  title = "CATALOG",
  ariaLabel = "Загрузка…",
}: PageLoadingProps) {
  return (
    <div className={styles.page} aria-busy="true" aria-label={ariaLabel}>
      <div className={styles.headerSpacer} aria-hidden />
      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.categories} aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={styles.categoryPill}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        <CatalogSkeleton />
      </main>
    </div>
  );
}
