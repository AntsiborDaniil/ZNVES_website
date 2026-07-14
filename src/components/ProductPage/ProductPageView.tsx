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
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  fetchProductImagesByColor,
  type ApiWarehouseItem,
} from "../../api/product/productApi";
import { fetchCatalogColors } from "../../api/catalog/catalogApi";

type ProductPageViewProps = {
  product: ProductDetail;
  warehouseItems?: ApiWarehouseItem[];
};

const findWarehouseItem = (
  warehouseItems: ApiWarehouseItem[],
  colorSlug: string,
  sizeSlug: string
): ApiWarehouseItem | null => {
  const item = warehouseItems.find((wi) => {
    const wiColor = (wi.color ?? wi.color_slug ?? "").toLowerCase().trim();
    const wiSize = (wi.size ?? wi.size_slug ?? "").toLowerCase().trim();
    return wiColor === colorSlug && wiSize === sizeSlug;
  });
  if (!item || (item.quantity ?? 0) <= 0) return null;
  return item;
};

const ProductPageView = ({
  product,
  warehouseItems = [],
}: ProductPageViewProps) => {
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
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>({});

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Соответствие цветов и размеров по warehouse: только комбинации с quantity > 0
  const colorToSizesFromWarehouse = useMemo(() => {
    const map = new Map<string, Set<string>>();
    warehouseItems.forEach((wi) => {
      if ((wi.quantity ?? 0) <= 0) return;
      const c = (wi.color ?? wi.color_slug ?? "").toLowerCase().trim();
      const s = (wi.size ?? wi.size_slug ?? "").toLowerCase().trim();
      if (!c) return;
      if (!map.has(c)) map.set(c, new Set());
      map.get(c)!.add(s);
    });
    return map;
  }, [warehouseItems]);

  // Цвета, у которых есть хотя бы один размер в наличии (по warehouse)
  const colorOptions = useMemo(() => {
    const withStock = product.availableColors.filter((opt) => {
      const key = (opt.value ?? "").toLowerCase().trim();
      return colorToSizesFromWarehouse.has(key) && (colorToSizesFromWarehouse.get(key)?.size ?? 0) > 0;
    });
    if (withStock.length > 0) return withStock;
    if (warehouseItems.length > 0) return [];
    return product.availableColors;
  }, [product.availableColors, colorToSizesFromWarehouse, warehouseItems.length]);

  // Размеры, доступные для выбранного цвета (по warehouse)
  const availableSizesForSelectedColor = useMemo(() => {
    const key = (selectedColor ?? "").toLowerCase().trim();
    const set = colorToSizesFromWarehouse.get(key);
    if (!set || set.size === 0) {
      return warehouseItems.length > 0 ? [] : product.availableSizes;
    }
    const list = Array.from(set);
    return product.availableSizes.filter((s) => list.includes((s ?? "").toLowerCase().trim()));
  }, [
    selectedColor,
    colorToSizesFromWarehouse,
    product.availableSizes,
    warehouseItems.length,
  ]);

  useEffect(() => {
    fetchCatalogColors().then((colors) => {
      const map: Record<string, string> = {};
      colors.forEach((c) => {
        map[c.slug] = c.value;
      });
      setColorSlugToLabel(map);
    });
  }, []);

  useEffect(() => {
    const inProduct = product.availableColors.some((color) => color.value === selectedColor);
    const inOptions = colorOptions.some((c) => c.value === selectedColor);
    if (!inProduct) {
      setSelectedColor(product.availableColors[0]?.value ?? "");
    } else if (!inOptions && colorOptions.length > 0) {
      setSelectedColor(colorOptions[0]?.value ?? "");
    }
  }, [product.availableColors, colorOptions, selectedColor]);

  // Синхронизация размера с доступными для выбранного цвета (по warehouse)
  useEffect(() => {
    const key = (selectedColor ?? "").toLowerCase().trim();
    const allowed = colorToSizesFromWarehouse.get(key);
    const normalizedSelected = (selectedSize ?? "").toLowerCase().trim();
    if (allowed && allowed.size > 0 && !allowed.has(normalizedSelected)) {
      const first = product.availableSizes.find((s) => allowed.has((s ?? "").toLowerCase().trim()));
      setSelectedSize(first ?? Array.from(allowed)[0] ?? product.availableSizes[0] ?? "");
    } else if (!product.availableSizes.includes(selectedSize)) {
      setSelectedSize(product.availableSizes[0] ?? "");
    }
  }, [selectedColor, selectedSize, colorToSizesFromWarehouse, product.availableSizes]);

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

  const selectedWarehouseItem = useMemo(
    () =>
      findWarehouseItem(
        warehouseItems,
        (selectedColor ?? "").toLowerCase().trim(),
        (selectedSize ?? "").toLowerCase().trim()
      ),
    [warehouseItems, selectedColor, selectedSize]
  );

  const hasWarehouseData = warehouseItems.length > 0;
  const isFullyOutOfStock =
    hasWarehouseData && colorToSizesFromWarehouse.size === 0;
  const canAddToCart = !!selectedWarehouseItem;

  const addButtonLabel = !hasWarehouseData
    ? "Нет данных о наличии"
    : isFullyOutOfStock || !canAddToCart
      ? "Нет в наличии"
      : "Добавить в корзину";

  const handleAddToCart = useCallback(() => {
    if (!selectedWarehouseItem) {
      showToast(
        !hasWarehouseData
          ? "Товар недоступен для заказа"
          : "Выбранный размер или цвет отсутствует на складе"
      );
      return;
    }

    addItem(
      toCatalogProduct(product),
      selectedSize,
      selectedColor,
      1,
      selectedWarehouseItem.id,
      colorSlugToLabel[selectedColor] ??
        selectedColorOption.label ??
        selectedColor
    );
    showToast("Добавлено в корзину");
  }, [
    addItem,
    colorSlugToLabel,
    hasWarehouseData,
    product,
    selectedColor,
    selectedColorOption.label,
    selectedSize,
    selectedWarehouseItem,
    showToast,
  ]);

  return (
    <div className={styles.page}>
      <Header variant="green" />
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.gallery} aria-live="polite">
            <div className={styles.imageViewport}>
              <div className={styles.imageSliderWrap}>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
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
                            loading={index <= 2 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.imageColumn}>
                {currentImages.map((image, index) => (
                  <div key={image + index} className={styles.imageSlide}>
                    <div className={styles.imageSlideInner}>
                      <img
                        src={image}
                        alt={`${product.title} — фото ${index + 1}`}
                        className={styles.mainImage}
                        loading={index <= 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <span className={styles.price}>{product.price}</span>
            </div>

            <div className={styles.variantGroup}>
              <div className={styles.variantGroupRow}>
                {colorOptions.length > 0 && (
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
                )}
                {availableSizesForSelectedColor.length > 0 && (
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
                        {availableSizesForSelectedColor.map((size) => {
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
                )}
              </div>
              <div className={styles.countAndBuy}>
                <button
                  type="button"
                  className={`${styles.addToCartButton} ${
                    !canAddToCart ? styles.addToCartButtonDisabled : ""
                  }`}
                  disabled={!canAddToCart}
                  aria-disabled={!canAddToCart}
                  onClick={handleAddToCart}
                >
                  {addButtonLabel}
                </button>
                {selectedWarehouseItem &&
                  selectedWarehouseItem.quantity <= 3 && (
                    <p className={styles.stockHint}>Осталось мало</p>
                  )}
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
