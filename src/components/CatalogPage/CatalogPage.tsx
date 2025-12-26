import { Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CatalogPageContent from "./CatalogPageContent";
import styles from "./CatalogPage.module.css";

type CatalogPageProps = {
  title: string;
};

const CatalogPage = ({ title }: CatalogPageProps) => {
  return (
    <div className={styles.page}>
      <Header variant="green" />
      <main className={styles.main}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <CatalogPageContent title={title} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
