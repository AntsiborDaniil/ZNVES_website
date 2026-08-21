import { Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CatalogPageContent from "./CatalogPageContent";
import LoadingStub from "../LoadingStub/LoadingStub";
import styles from "./CatalogPage.module.css";

type CatalogPageProps = {
  title: string;
};

const CatalogPage = ({ title }: CatalogPageProps) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<LoadingStub label="Загрузка каталога…" />}>
          <CatalogPageContent title={title} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
