import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CatalogPageContent from "./CatalogPageContent";
import styles from "./CatalogPage.module.css";
import type { CatalogProduct } from "../../types/products";

type CatalogPageProps = {
  title: string;
  products: CatalogProduct[];
  isLoading?: boolean;
};

const CatalogPage = ({
  title,
  products,
  isLoading = false,
}: CatalogPageProps) => {
  return (
    <div className={styles.page}>
      <Header variant="green" />
      <main className={styles.main}>
        <CatalogPageContent
          title={title}
          products={products}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
