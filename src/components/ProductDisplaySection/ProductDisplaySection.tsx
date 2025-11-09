"use client";

/* eslint-disable @next/next/no-img-element */
import {
    createElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductDisplaySection.module.css";
import {
    catalogProducts as catalogProductsData,
    newInProducts as newInProductsData,
    toCatalogProduct,
} from "../../data/products";
import type { CatalogProduct } from "../../types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { Swiper as SwiperInstance } from "swiper";

type ActiveArrow = "prev" | "next" | null;

type ProductDisplaySectionProps = {
    title: string;
    showShopNow: boolean;
    id?: string;
};

const homepageNewInProducts: CatalogProduct[] =
    newInProductsData.map(toCatalogProduct);

const homepageCatalogProducts: CatalogProduct[] =
    catalogProductsData.map(toCatalogProduct);

const ProductDisplaySection = ({
    title,
    showShopNow,
    id,
}: ProductDisplaySectionProps) => {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeArrow, setActiveArrow] = useState<ActiveArrow>(null);
    const [maxVisible, setMaxVisible] = useState(4);
    const [spaceBetween, setSpaceBetween] = useState(30);
    const router = useRouter();
    const hasPrefetchedProductsRef = useRef(false);
    const hasPrefetchedShopNowRef = useRef(false);

    useEffect(() => {
        const updateMaxVisible = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                setMaxVisible(1);
                setSpaceBetween(12);
            } else if (width <= 768) {
                setMaxVisible(2);
                setSpaceBetween(16);
            } else if (width <= 1200) {
                setMaxVisible(3);
                setSpaceBetween(20);
            } else {
                setMaxVisible(4);
                setSpaceBetween(30);
            }
        };

        updateMaxVisible();
        window.addEventListener("resize", updateMaxVisible);
        return () => window.removeEventListener("resize", updateMaxVisible);
    }, []);

    const products = useMemo<CatalogProduct[]>(() => {
        return title === "NEW IN"
            ? homepageNewInProducts
            : homepageCatalogProducts;
    }, [title]);

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
        setActiveArrow("prev");
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
        setActiveArrow("next");
    };

    const canNavigate = products.length > maxVisible;

    const shopNowHref =
        title === "NEW IN"
            ? "/new-in"
            : title === "CATALOG"
            ? "/catalog"
            : "/catalog";

    const handleSwiper = useCallback((swiper: SwiperInstance) => {
        swiperRef.current = swiper;
    }, []);

    const handleBeforeInit = useCallback((swiper: SwiperInstance) => {
        const params = swiper.params as unknown as Record<string, unknown>;
        params.preloadImages = false;
        params.lazy = {
            enabled: true,
            loadOnTransitionStart: false,
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        };
    }, []);

    useEffect(() => {
        if (hasPrefetchedProductsRef.current) {
            return;
        }

        const prefetchCount = Math.min(products.length, 6);
        const routesToPrefetch = products
            .slice(0, prefetchCount)
            .map((product) => `/catalog/${product.id}`);

        routesToPrefetch.forEach((route) => {
            void router.prefetch(route);
        });

        hasPrefetchedProductsRef.current = true;
    }, [products, router]);

    useEffect(() => {
        if (hasPrefetchedShopNowRef.current || !showShopNow) {
            return;
        }

        void router.prefetch(shopNowHref);
        hasPrefetchedShopNowRef.current = true;
    }, [router, shopNowHref, showShopNow]);

    return (
        <section id={id} className={styles.section}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.headerRight}>
                    {showShopNow && (
                        <Link href={shopNowHref} className={styles.shopNow}>
                            SHOP NOW
                            <img
                                src="/images/catalogs/shopArrow.png"
                                alt="Arrow Right"
                                className={styles.shopArrow}
                            />
                        </Link>
                    )}

                    {canNavigate && (
                        <div className={styles.arrows}>
                            <button
                                className={`${styles.arrowButton} ${
                                    activeArrow === "prev"
                                        ? styles.arrowButtonActive
                                        : styles.arrowButtonInactive
                                }`}
                                onClick={handlePrev}
                                aria-label="Previous"
                                type="button"
                            >
                                <svg
                                    width="45"
                                    height="40"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    className={
                                        activeArrow === "prev"
                                            ? styles.arrowSvgActive
                                            : styles.arrowSvgInactive
                                    }
                                >
                                    <path d="M12 15l-5-5 5-5" />
                                </svg>
                            </button>
                            <button
                                className={`${styles.arrowButton} ${
                                    activeArrow === "next"
                                        ? styles.arrowButtonActive
                                        : styles.arrowButtonInactive
                                }`}
                                onClick={handleNext}
                                aria-label="Next"
                                type="button"
                            >
                                <svg
                                    width="45"
                                    height="45"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    className={
                                        activeArrow === "next"
                                            ? styles.arrowSvgActive
                                            : styles.arrowSvgInactive
                                    }
                                >
                                    <path d="M8 15l5-5-5-5" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.sliderContainer}>
                {createElement(
                    Swiper as any,
                    {
                        className: styles.slider,
                        modules: [FreeMode],
                        freeMode: {
                            enabled: true,
                            momentum: true,
                            momentumRatio: 0.35,
                            minimumVelocity: 0.08,
                        },
                        spaceBetween,
                        slidesPerView: maxVisible,
                        loop: products.length > maxVisible,
                        speed: 600,
                        watchSlidesProgress: true,
                        onSwiper: handleSwiper,
                        onBeforeInit: handleBeforeInit,
                        lazy: {
                            enabled: true,
                            loadOnTransitionStart: false,
                            loadPrevNext: true,
                            loadPrevNextAmount: 2,
                        },
                    },
                    products.map((product) => (
                        <SwiperSlide
                            key={product.id}
                            className={styles.slideItem}
                        >
                            <Link
                                href={`/catalog/${product.id}`}
                                className={styles.slideLink}
                                aria-label={`Перейти к товару ${product.title}`}
                            >
                                <ProductCard
                                    title={product.title}
                                    price={product.price}
                                    images={product.images}
                                    isNew={product.isNew}
                                />
                            </Link>
                        </SwiperSlide>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductDisplaySection;
