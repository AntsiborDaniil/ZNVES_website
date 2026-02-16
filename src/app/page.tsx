import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import Footer from "../components/Footer/Footer";
import { fetchNewInProducts, fetchAllCatalogProducts } from "../api/home/catalogApi";
import styles from "./page.module.css";

export default async function HomePage() {
    const [newInProducts, catalogProducts] = await Promise.all([
        fetchNewInProducts(),
        fetchAllCatalogProducts(),
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
