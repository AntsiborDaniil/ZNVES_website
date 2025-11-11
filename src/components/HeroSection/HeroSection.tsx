"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const previousRestorationRef = useRef<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      previousRestorationRef.current = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      if (typeof window !== "undefined" && previousRestorationRef.current) {
        window.history.scrollRestoration = previousRestorationRef.current;
      }
    };
  }, []);

  const handleCatalogClick = () => {
    if (!isMounted) {
      return;
    }

    const catalogSection = document.getElementById("catalog-section");
    catalogSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <button
          className={styles.catalogButton}
          onClick={handleCatalogClick}
          type="button"
        >
          catalog
        </button>
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
      </div>
    </section>
  );
};

export default HeroSection;
