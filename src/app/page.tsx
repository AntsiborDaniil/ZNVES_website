import { Suspense } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import HomeScrollReset from "../components/HomeScrollReset/HomeScrollReset";
import Footer from "../components/Footer/Footer";
import SliderSkeleton from "../components/ProductDisplaySection/SliderSkeleton";
import { HomeBestsellers, HomeCatalogCollage } from "./HomeBelowFold";
import styles from "./page.module.css";

function CollageSkeleton() {
  return (
    <div
      style={{
        minHeight: 320,
        margin: "0 0 40px",
        background:
          "linear-gradient(105deg, var(--color-grey-5) 0%, #f7f7f7 45%, var(--color-grey-3) 50%, #f7f7f7 55%, var(--color-grey-5) 100%)",
        backgroundSize: "220% 100%",
      }}
      aria-hidden
    />
  );
}

/**
 * Hero + header отдаём сразу.
 * Bestsellers / collage — отдельные Suspense-границы (streaming),
 * чтобы TTFB не ждал полный каталог.
 */
export default function HomePage() {
  return (
    <div className={styles.app}>
      <HomeScrollReset />
      <Header />
      <HeroSection />
      <div className={styles.productDisplaySections}>
        <Suspense fallback={<SliderSkeleton />}>
          <HomeBestsellers />
        </Suspense>
        <Suspense fallback={<CollageSkeleton />}>
          <HomeCatalogCollage />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
