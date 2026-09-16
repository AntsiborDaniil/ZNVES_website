import CatalogSkeleton from "../../../components/CatalogPage/CatalogSkeleton";
import styles from "../loading.module.css";

export default function ProductLoading() {
  return (
    <div className={styles.page} role="status" aria-label="Загрузка товара">
      <div className={styles.headerSpacer} />
      <div className={styles.content}>
        <div className={styles.titleBar} />
        <CatalogSkeleton />
      </div>
    </div>
  );
}
