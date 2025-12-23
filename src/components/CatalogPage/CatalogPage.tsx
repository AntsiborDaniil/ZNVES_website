import { Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CatalogPageContent from "./CatalogPageContent";
import styles from "./CatalogPage.module.css";
import type { CatalogProduct } from "../../types/products";

type CatalogPageProps = {
  title: string;
  products: CatalogProduct[];
};

const CatalogPage = ({ title, products }: CatalogPageProps) => {
  return (
    <div className={styles.page}>
      <Header variant="green" />
      <main className={styles.main}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CatalogPageContent title={title} products={products} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
