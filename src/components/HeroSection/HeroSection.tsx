"use client";

import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import Button from "../ui/Button/Button";

const HeroSection = () => {
  useScrollRestoration();

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src="/images/home/hero-desktop.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          className={styles.heroBackgroundImage}
          sizes="100vw"
          quality={85}
        />
        <Image
          src="/images/home/hero-mobile.png"
          alt=""
          fill
          className={styles.heroBackgroundImageMobile}
          sizes="100vw"
          quality={85}
        />
        <div className={styles.overlay} />
        <div className={styles.gradient} />
      </div>
      <div className={styles.heroContent}>
        <p className={styles.title}>NEW COLLECTION</p>
        <Button href="/catalog" variant="primary" className={styles.cta}>
          Перейти в каталог
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
