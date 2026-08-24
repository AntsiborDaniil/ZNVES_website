"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import Button from "../ui/Button/Button";
import { fetchHomePage } from "../../api/home/homeApi";
import type { HomeHero } from "../../types/home";

const HERO_MOBILE_LIGHTEN = "/images/home/hero-mobile-lighten.png";
const HERO_MOBILE_DARKEN = "/images/home/hero-mobile-darken.png";

const DEFAULT_HERO: HomeHero = {
  desktop_image: "/images/home/hero-desktop.png",
  mobile_image: "/images/home/hero-mobile.png",
  title: "NEW COLLECTION",
  cta_text: "Перейти в каталог",
  cta_href: "/catalog",
};

const HeroSection = () => {
  useScrollRestoration();
  const [hero, setHero] = useState<HomeHero>(DEFAULT_HERO);

  useEffect(() => {
    fetchHomePage()
      .then((data) => setHero(data.hero))
      .catch(() => setHero(DEFAULT_HERO));
  }, []);

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
          sizes="100vw"
          quality={85}
        />
        {/* Mobile: 3 слоя из Figma — фото, осветление, затемнение */}
        <div className={styles.heroMobileStack}>
          <Image
            src={hero.mobile_image}
            alt=""
            fill
            priority
            unoptimized
            className={styles.heroMobileMain}
            sizes="(max-width: 768px) 100vw, 0px"
          />
          <Image
            src={HERO_MOBILE_LIGHTEN}
            alt=""
            fill
            priority
            unoptimized
            className={styles.heroMobileLighten}
            sizes="(max-width: 768px) 100vw, 0px"
          />
          <Image
            src={HERO_MOBILE_DARKEN}
            alt=""
            fill
            priority
            unoptimized
            className={styles.heroMobileDarken}
            sizes="(max-width: 768px) 100vw, 0px"
          />
        </div>
        <div className={styles.overlay} />
        <div className={styles.gradient} />
      </div>
      <div className={styles.heroContent}>
        <p className={styles.title}>{hero.title}</p>
        <Button href={hero.cta_href} variant="primary" className={styles.cta}>
          {hero.cta_text}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
