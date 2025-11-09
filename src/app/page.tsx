import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export default function HomePage() {
    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <ProductDisplaySection title="NEW IN" showShopNow />
            <ProductDisplaySection
                id="catalog-section"
                title="CATALOG"
                showShopNow
            />
            <Footer />
        </div>
    );
}
