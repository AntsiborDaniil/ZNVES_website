"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";

const HeroSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useScrollRestoration();

    useEffect(() => {
        setIsMounted(true);
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
