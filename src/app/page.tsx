import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import HomeScrollReset from "../components/HomeScrollReset/HomeScrollReset";
import Footer from "../components/Footer/Footer";
import SliderSkeleton from "../components/ProductDisplaySection/SliderSkeleton";
import { fetchHomePage } from "../api/home/homeApi";
import {
  fetchNewInProducts,
  fetchAllCatalogProducts,
} from "../api/home/catalogApi";
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

export default async function HomePage() {
  const [homePage, newInProducts, catalogProducts] = await Promise.all([
    fetchHomePage(),
    fetchNewInProducts(),
    fetchAllCatalogProducts(),
  ]);

  return (
    <div className={styles.app}>
      <HomeScrollReset />
      <Header />
      <HeroSection hero={homePage.hero} />
      <div className={styles.productDisplaySections}>
        <ProductDisplaySection
          title="Bestsellers"
          showShopNow
          isBestseller
          maxProducts={8}
          navFrom="home"
          initialProducts={newInProducts}
        />
        <CatalogCollage
          products={catalogProducts}
          featuredImage={homePage.catalog_featured_image}
        />
        <CollectionBanners items={homePage.collections} />
      </div>
      <Footer />
    </div>
  );
}
