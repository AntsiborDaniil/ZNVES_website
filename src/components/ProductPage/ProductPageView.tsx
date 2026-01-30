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
import { useWindowSize } from "../../hooks/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchProductImagesByColor } from "../../api/product/productApi";

type ProductPageViewProps = {
  product: ProductDetail;
};

const ProductPageView = ({ product }: ProductPageViewProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors[0]?.value ?? ""
  );
  const [currentImages, setCurrentImages] = useState<string[]>(product.images);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [isColorListOpen, setIsColorListOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [isSizeListOpen, setIsSizeListOpen] = useState(false);
  const sizePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorListOpen(false);
      }
      if (
        sizePickerRef.current &&
        !sizePickerRef.current.contains(event.target as Node)
      ) {
        setIsSizeListOpen(false);
      }
    };

    if (isColorListOpen || isSizeListOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorListOpen, isSizeListOpen]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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

  // Загрузка изображений при изменении цвета
  useEffect(() => {
    const loadImagesByColor = async () => {
      if (!product.slug || !selectedColor) {
        // Если нет slug или цвета, используем базовые изображения
        setCurrentImages(product.images);
        return;
      }

      setIsLoadingImages(true);
      try {
        const colorImages = await fetchProductImagesByColor(
          product.slug,
          selectedColor
        );
        
        // Если получили изображения, используем их, иначе используем базовые
        if (colorImages.length > 0) {
          setCurrentImages(colorImages);
        } else {
          setCurrentImages(product.images);
        }
      } catch (error) {
        console.error("Error loading images by color:", error);
        // В случае ошибки используем базовые изображения
        setCurrentImages(product.images);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImagesByColor();
  }, [product.slug, selectedColor, product.images]);

  const handleToggleSection = (id: string) => {
    setSelectedSection(id);
    setOpenSection((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (
      selectedSection !== null &&
      !product.sections.some((section) => section.id === selectedSection)
    ) {
      setSelectedSection(null);
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
              {width && width < 1025 ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  // @ts-ignore
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className={styles.imageSlider}
                >
                  {currentImages.map((image, index) => (
                    <SwiperSlide key={image + index}>
                      <div className={styles.imageSlide}>
                        <div className={styles.imageSlideInner}>
                          <img
                            src={image}
                            alt={`${product.title} — фото ${index + 1}`}
                            className={styles.mainImage}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={styles.imageColumn}>
                  {currentImages.map((image, index) => (
                    <div key={image + index} className={styles.imageSlide}>
                      <div className={styles.imageSlideInner}>
                        <img
                          src={image}
                          alt={`${product.title} — фото ${index + 1}`}
                          className={styles.mainImage}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <span className={styles.price}>{product.price}</span>
            </div>

            <div className={styles.variantGroup}>
              <div className={styles.variantGroupRow}>
                <div
                  className={`${styles.variantRow} ${styles.variantRowCompact}`}
                >
                  <label className={styles.label}>Цвет</label>
                  <div
                    className={`${styles.colorPickerWrapper} ${
                      isColorListOpen ? styles.colorPickerWrapperOpen : ""
                    } ${
                      selectedColorOption.hex === "#ffffff" ||
                      selectedColorOption.hex === "#fff"
                        ? styles.colorPickerWrapperWhite
                        : ""
                    }`}
                    ref={colorPickerRef}
                  >
                    <button
                      type="button"
                      className={styles.sizePickerButton}
                      onClick={() => setIsColorListOpen((prev) => !prev)}
                      aria-label="Выбрать цвет"
                      style={colorSelectStyle}
                    >
                      <span className={styles.colorPickerButtonDot} />
                      <span className={styles.colorPickerButtonText}>
                        {selectedColorOption.label}
                      </span>
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.colorPickerArrow}
                      >
                        <path
                          d="M1 1l6 6 6-6"
                          stroke="#525252"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    {isColorListOpen && (
                      <ul className={styles.colorList}>
                        {colorOptions.map((color) => {
                          const isSelected = selectedColor === color.value;
                          return (
                            <li
                              key={color.value}
                              className={styles.colorListItem}
                            >
                              <button
                                type="button"
                                className={`${styles.colorListItemButton} ${
                                  isSelected
                                    ? styles.colorListItemButtonSelected
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelectedColor(color.value);
                                  setIsColorListOpen(false);
                                }}
                                aria-label={`Выбрать цвет ${color.label}`}
                              >
                                <span
                                  className={styles.colorListItemDot}
                                  style={{
                                    backgroundColor: color.hex ?? "#d1cdcb",
                                    border:
                                      color.hex === "#ffffff" ||
                                      color.hex === "#fff"
                                        ? "1px solid #d4d1cb"
                                        : "1px solid #ffffff80",
                                  }}
                                />
                                <span className={styles.colorListItemLabel}>
                                  {color.label}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.variantRow} ${styles.variantRowCompact}`}
                >
                  <label className={styles.label}>Размер</label>
                  <div
                    className={`${styles.sizePickerWrapper} ${
                      isSizeListOpen ? styles.sizePickerWrapperOpen : ""
                    }`}
                    ref={sizePickerRef}
                  >
                    <button
                      type="button"
                      className={styles.sizePickerButton}
                      onClick={() => setIsSizeListOpen((prev) => !prev)}
                      aria-label="Выбрать размер"
                    >
                      <span className={styles.sizePickerButtonText}>
                        {selectedSize.toUpperCase()}
                      </span>
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.sizePickerArrow}
                      >
                        <path
                          d="M1 1l6 6 6-6"
                          stroke="#525252"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    {isSizeListOpen && (
                      <ul className={styles.sizeList}>
                        {product.availableSizes.map((size) => {
                          const isSelected = selectedSize === size;
                          return (
                            <li key={size} className={styles.sizeListItem}>
                              <button
                                type="button"
                                className={`${styles.sizeListItemButton} ${
                                  isSelected
                                    ? styles.sizeListItemButtonSelected
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelectedSize(size);
                                  setIsSizeListOpen(false);
                                }}
                                aria-label={`Выбрать размер ${size}`}
                              >
                                {isSelected && (
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={styles.sizeListItemCheckmark}
                                  >
                                    <path
                                      d="M13 4L6 11L3 8"
                                      stroke="#525252"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                                {!isSelected && (
                                  <span
                                    className={styles.sizeListItemPlaceholder}
                                  />
                                )}
                                <span className={styles.sizeListItemLabel}>
                                  {size.toUpperCase()}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.countAndBuy}>
                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={() => {
                    const catalogProduct = toCatalogProduct(product);
                    addItem(catalogProduct, selectedSize, selectedColor, 1);
                    showToast("Добавлено в корзину");
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
                        isOpen ? styles.accordionButtonSelected : ""
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
        <ProductDisplaySection
          title="BESTSELLER"
          showShopNow={false}
          isBestseller={true}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPageView;
