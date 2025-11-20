"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import type { ProductDetail } from "../../types/products";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../ui/ToastProvider/ToastProvider";
import { toCatalogProduct } from "../../data/products";
import styles from "./ProductPageView.module.css";
import ProductDisplaySection from "../ProductDisplaySection/ProductDisplaySection";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import { useWindowSize } from "../../hooks/useWindowSize";

type ProductPageViewProps = {
  product: ProductDetail;
};

const ProductPageView = ({ product }: ProductPageViewProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors[0]?.value ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(() => {
    return product.sections.length > 0 ? product.sections[0]?.id ?? null : null;
  });
  const [selectedSection, setSelectedSection] = useState<string | null>(() => {
    return product.sections.length > 0 ? product.sections[0]?.id ?? null : null;
  });

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (
      !product.availableColors.some((color) => color.value === selectedColor)
    ) {
      setSelectedColor(product.availableColors[0]?.value ?? "");
    }
  }, [product.availableColors, selectedColor]);

  useEffect(() => {
    if (!product.availableSizes.includes(selectedSize)) {
      setSelectedSize(product.availableSizes[0] ?? "");
    }
  }, [product.availableSizes, selectedSize]);

  const handleToggleSection = (id: string) => {
    setSelectedSection(id);
    setOpenSection((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!product.sections.some((section) => section.id === selectedSection)) {
      const fallbackId = product.sections[0]?.id ?? null;
      setSelectedSection(fallbackId);
      setOpenSection(fallbackId);
    }
  }, [product.sections, selectedSection]);

  const adjustSectionHeights = useCallback(() => {
    product.sections.forEach((section) => {
      const element = contentRefs.current[section.id];
      if (!element) {
        return;
      }

      if (openSection === section.id) {
        element.style.maxHeight = `${element.scrollHeight}px`;
      } else {
        element.style.maxHeight = "0px";
      }
    });
  }, [openSection, product.sections]);

  const { width } = useWindowSize();

  useEffect(() => {
    adjustSectionHeights();
  }, [adjustSectionHeights, width]);

  const colorOptions = useMemo(
    () => product.availableColors,
    [product.availableColors]
  );

  const selectedColorOption = useMemo(() => {
    return (
      colorOptions.find((option) => option.value === selectedColor) ??
      colorOptions[0] ?? { hex: "#d1cdcb" }
    );
  }, [colorOptions, selectedColor]);

  const sizeGuideSection = useMemo(() => {
    return product.sections.find((section) => section.id === "size-chart");
  }, [product.sections]);

  const colorSelectStyle = useMemo(
    () =>
      ({
        "--color-dot": selectedColorOption.hex ?? "#d1cdcb",
      } as CSSProperties),
    [selectedColorOption]
  );

  return (
    <div className={styles.page}>
      <Header variant="green" />
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.gallery} aria-live="polite">
            <div className={styles.imageViewport}>
              <Swiper
                direction="vertical"
                slidesPerView={1}
                spaceBetween={36}
                speed={720}
                freeMode={{
                  enabled: true,
                  sticky: false,
                  momentum: true,
                  momentumRatio: 0.32,
                  momentumVelocityRatio: 0.55,
                }}
                mousewheel={{
                  forceToAxis: true,
                  releaseOnEdges: true,
                  sensitivity: 1.15,
                  thresholdDelta: 6,
                }}
                modules={[Mousewheel, FreeMode]}
                onSlideChange={(swiperInstance: { activeIndex: number }) =>
                  setActiveIndex(swiperInstance.activeIndex)
                }
                className={styles.imageSlider}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide
                    key={image + index}
                    className={styles.slideWrapper}
                  >
                    <div className={styles.imageSlide}>
                      <div className={styles.imageSlideInner}>
                        <img
                          src={image}
                          alt={`${product.title} — фото ${index + 1}`}
                          className={styles.mainImage}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <span className={styles.price}>{product.price}</span>
            </div>

            <div className={styles.variantGroup}>
              <div
                className={`${styles.variantRow} ${styles.variantRowCompact}`}
              >
                <label className={styles.label} htmlFor="size-select">
                  Размер
                </label>
                <select
                  id="size-select"
                  className={`${styles.select} ${styles.sizeSelect}`}
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                >
                  {product.availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.variantRow} ${styles.variantRowCompact}`}
              >
                <label className={styles.label} htmlFor="color-select">
                  Цвет
                </label>
                <div
                  className={styles.colorSelectWrapper}
                  style={colorSelectStyle}
                >
                  <select
                    id="color-select"
                    className={`${styles.select} ${styles.colorSelect}`}
                    value={selectedColor}
                    onChange={(event) => setSelectedColor(event.target.value)}
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className={styles.sizeWeb}
                  onClick={() => setIsSizeGuideOpen((prev) => !prev)}
                >
                  Размерная сетка
                </button>
              </div>
              <div className={styles.countAndBuy}>
                <div className={styles.variantRow}>
                  <div className={styles.quantityRow}>
                    <button
                      type="button"
                      className={styles.quantityControl}
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={quantity === 1}
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.quantityControl}
                      onClick={() => setQuantity((prev) => prev + 1)}
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={() => {
                    const catalogProduct = toCatalogProduct(product);
                    addItem(
                      catalogProduct,
                      selectedSize,
                      selectedColor,
                      quantity
                    );
                    showToast("Товар добавлен в корзину");
                  }}
                >
                  Добавить в корзину
                </button>
              </div>

              {isSizeGuideOpen && sizeGuideSection && (
                <div className={styles.sizeGuideContent}>
                  <h3 className={styles.sizeGuideTitle}>
                    {sizeGuideSection.title}
                  </h3>
                  {sizeGuideSection.content
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index} className={styles.sizeGuideText}>
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </div>

            <div className={styles.accordion}>
              {product.sections.map((section) => {
                const isOpen = openSection === section.id;
                const isSelected = selectedSection === section.id;
                return (
                  <div key={section.id} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={`${styles.accordionButton} ${
                        isSelected ? styles.accordionButtonSelected : ""
                      } ${isOpen ? styles.accordionButtonOpen : ""}`}
                      onClick={() => handleToggleSection(section.id)}
                      aria-expanded={isOpen}
                    >
                      {section.title}
                      <Image
                        className={styles.accordionIcon}
                        src="/images/catalogs/diogonal.png"
                        alt="accordion-icon"
                        width={36}
                        height={36}
                      />
                    </button>
                    <div
                      ref={(node) => {
                        contentRefs.current[section.id] = node;
                      }}
                      className={`${styles.accordionContent} ${
                        isOpen ? styles.accordionContentOpen : ""
                      }`}
                      aria-hidden={!isOpen}
                    >
                      <div className={styles.accordionContentInner}>
                        {section.content.split("\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <div className={styles.suggestions}>
        <ProductDisplaySection title="BESTSELLER" showShopNow={false} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPageView;
