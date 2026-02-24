import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductDisplaySection from "../components/ProductDisplaySection/ProductDisplaySection";
import Footer from "../components/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  links: [
    { rel: "preload", href: "/images/hero-background.png", as: "image" },
    {
      rel: "preload",
      href: "/images/heroMobile.png",
      as: "image",
      media: "(max-width: 768px)",
    },
  ],
};

export default function HomePage() {
    return (
        <div className={styles.app}>
            <Header />
            <HeroSection />
            <div className={styles.productDisplaySections}>
                <ProductDisplaySection title="NEW IN" showShopNow />
                <ProductDisplaySection
                    id="catalog-section"
                    title="CATALOG"
                    showShopNow
                />
            </div>
            <Footer />
        </div>
    );
}
