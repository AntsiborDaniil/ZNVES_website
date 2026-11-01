import { Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CatalogPageContent from "./CatalogPageContent";
import LoadingStub from "../LoadingStub/LoadingStub";
import type { CatalogProduct } from "../../types/products";
import type { ApiCatalogCategory } from "../../api/catalog/catalogApi";
import styles from "./CatalogPage.module.css";

type CatalogPageProps = {
  title: string;
  initialProducts?: CatalogProduct[];
  initialCategories?: ApiCatalogCategory[];
  initialCategoryParam?: string | null;
};

const CatalogPage = ({
  title,
  initialProducts = [],
  initialCategories = [],
  initialCategoryParam = null,
}: CatalogPageProps) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<LoadingStub label="Загрузка каталога…" />}>
          <CatalogPageContent
            title={title}
            initialProducts={initialProducts}
            initialCategories={initialCategories}
            initialCategoryParam={initialCategoryParam}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
