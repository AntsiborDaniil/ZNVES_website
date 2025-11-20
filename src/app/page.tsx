import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import Footer from "../components/Footer/Footer";
import { fetchCatalogServer } from "../services/catalogService.server";
import styles from "./page.module.css";

// Server Component - загружает данные на сервере
export default async function HomePage() {
  // Загружаем данные для обоих слайдеров параллельно на сервере
  const [newInProducts, catalogProducts] = await Promise.all([
    fetchCatalogServer({ is_new: true }),
    fetchCatalogServer({ is_new: false }),
  ]);

  return (
    <div className={styles.app}>
      <Header />
      <HeroSection />
      <div className={styles.productDisplaySections}>
        <ProductDisplaySection
          title="NEW IN"
          showShopNow
          initialProducts={newInProducts}
        />
        <ProductDisplaySection
          id="catalog-section"
          title="CATALOG"
          showShopNow
          initialProducts={catalogProducts}
        />
      </div>
      <Footer />
    </div>
  );
}
