"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";

const HeroSection = () => {
  useScrollRestoration();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <Link href="/catalog" className={styles.catalogButton}>
          catalog
        </Link>
      </div>
      <div className={styles.heroBackground}>
        <Image
          src="/images/hero-background.png"
          alt="Hero Background"
          fill
          priority
          className={styles.heroBackgroundImage}
          sizes="100vw"
          quality={85}
        />
        <Image
          src="/images/hero-background-2.png"
          alt="Hero Background overlay"
          fill
          priority
          className={styles.heroBackgroundImage2}
          sizes="100vw"
          quality={85}
        />
        <Image
          src="/images/heroMobile.png"
          alt="Hero Background Mobile"
          fill
          priority
          className={styles.heroBackgroundImageMobile}
          sizes="100vw"
          quality={85}
        />
      </div>
    </section>
  );
};

export default HeroSection;
