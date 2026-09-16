import CatalogSkeleton from "../../components/CatalogPage/CatalogSkeleton";
import styles from "../catalog/loading.module.css";

export default function NewInLoading() {
  return (
    <div className={styles.page} role="status" aria-label="Загрузка новинок">
      <div className={styles.headerSpacer} />
      <div className={styles.content}>
        <div className={styles.titleBar} />
        <div className={styles.filtersBar} />
        <CatalogSkeleton />
      </div>
    </div>
  );
}
