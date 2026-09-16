import CatalogSkeleton from "../../components/CatalogPage/CatalogSkeleton";
import styles from "./loading.module.css";

export default function CatalogLoading() {
  return (
    <div className={styles.page} role="status" aria-label="Загрузка каталога">
      <div className={styles.headerSpacer} />
      <div className={styles.content}>
        <div className={styles.titleBar} />
        <div className={styles.filtersBar} />
        <CatalogSkeleton />
      </div>
    </div>
  );
}
