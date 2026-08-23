import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import CatalogCollage from "../components/CatalogCollage/CatalogCollage";
import CollectionBanners from "../components/CollectionBanner/CollectionBanner";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export default function HomePage() {
    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <div className={styles.productDisplaySections}>
                <ProductDisplaySection
                    title="Bestsellers"
                    showShopNow
                    isBestseller
                    maxProducts={8}
                    navFrom="home"
                />
                <CatalogCollage />
                <CollectionBanners />
            </div>
            <Footer />
        </div>
    );
}
