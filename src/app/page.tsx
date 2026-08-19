import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import CatalogCollage from "../components/CatalogCollage/CatalogCollage";
import CollectionBanners from "../components/CollectionBanner/CollectionBanner";
import Footer from "../components/Footer/Footer";
import { HOME_COLLECTIONS } from "../data/homeContent";
import styles from "./page.module.css";

export default function HomePage() {
    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <div className={styles.productDisplaySections}>
                <ProductDisplaySection title="Bestsellers" showShopNow />
                <CatalogCollage />
                <CollectionBanners items={HOME_COLLECTIONS} />
            </div>
            <Footer />
        </div>
    );
}
