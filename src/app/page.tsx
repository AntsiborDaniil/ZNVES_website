import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import HomeScrollReset from "../components/HomeScrollReset/HomeScrollReset";
import Footer from "../components/Footer/Footer";
import SliderSkeleton from "../components/ProductDisplaySection/SliderSkeleton";
import styles from "./page.module.css";

const ProductDisplaySection = dynamic(
  () => import("../components/ProductDisplaySection/ProductDisplaySection"),
  { loading: () => <SliderSkeleton /> }
);

const CatalogCollage = dynamic(
  () => import("../components/CatalogCollage/CatalogCollage")
);

const CollectionBanners = dynamic(
  () => import("../components/CollectionBanner/CollectionBanner")
);

export default function HomePage() {
  return (
    <div className={styles.app}>
      <HomeScrollReset />
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
