"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const previousRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        return () => {
            window.history.scrollRestoration = previousRestoration;
        };
    }, []);

    const handleCatalogClick = () => {
        if (typeof document === "undefined") {
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
