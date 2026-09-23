import Image from "next/image";
import styles from "./HeroSection.module.css";
import { fetchHomePage } from "../../api/home/homeApi";
import type { HomeHero } from "../../types/home";

/** Локальные ассеты hero (не берём URL картинок с API — там могут быть старые). */
const HERO_DESKTOP_IMAGE = "/images/home/hero-desktop.webp";
const HERO_MOBILE_IMAGE = "/images/home/hero-mobile.webp";

const DEFAULT_HERO: HomeHero = {
  desktop_image: HERO_DESKTOP_IMAGE,
  mobile_image: HERO_MOBILE_IMAGE,
  title: "NEW COLLECTION",
  cta_text: "Перейти в каталог",
  cta_href: "/catalog",
};

type HeroSectionProps = {
  hero?: HomeHero;
};

const HeroSection = async ({ hero: heroProp }: HeroSectionProps) => {
  let hero = heroProp ?? DEFAULT_HERO;

  if (!heroProp) {
    try {
      const data = await fetchHomePage();
      if (data?.hero) hero = data.hero;
    } catch {
      hero = DEFAULT_HERO;
    }
  }

  // Картинки всегда из репозитория; title/cta можно оставить с API
  hero = {
    ...hero,
    desktop_image: HERO_DESKTOP_IMAGE,
    mobile_image: HERO_MOBILE_IMAGE,
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src={hero.desktop_image}
          alt=""
          fill
          priority
          fetchPriority="high"
          className={styles.heroBackgroundImage}
          sizes="(max-width: 768px) 1px, 100vw"
          quality={90}
        />
        <div className={styles.heroMobileStack}>
          <Image
            src={hero.mobile_image}
            alt=""
            fill
            priority
            fetchPriority="high"
            className={styles.heroMobileMain}
            sizes="(max-width: 768px) 100vw, 0px"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
