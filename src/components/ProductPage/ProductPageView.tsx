"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Button from "../ui/Button/Button";
import type { ProductDetail } from "../../types/products";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../ui/ToastProvider/ToastProvider";
import { toCatalogProduct } from "../../data/products";
import styles from "./ProductPageView.module.css";
import ProductDisplaySection from "../ProductDisplaySection/ProductDisplaySection";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import {
  fetchProductImagesByColor,
  type ApiWarehouseItem,
} from "../../api/product/productApi";
import {
  fetchCatalogCategories,
  fetchCatalogColors,
  getCategoryDisplayName,
  resolveCategorySlug,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import {
  getBreadcrumbOrigin,
} from "../../lib/productNavigation";

type ProductPageViewProps = {
  product: ProductDetail;
  warehouseItems?: ApiWarehouseItem[];
};

const MAX_VISIBLE_THUMBS = 7;

const isLightHex = (hex?: string) => {
  const value = (hex ?? "").toLowerCase();
  return value === "#fff" || value === "#ffffff" || value === "white";
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
  const searchParams = useSearchParams();
  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors[0]?.value ?? ""
  );
  const [currentImages, setCurrentImages] = useState<string[]>(product.images);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [isSizeGuideOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>({});
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallerySwiperRef = useRef<SwiperInstance | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const colorOptions = useMemo(() => {
    const withStock = product.availableColors.filter((opt) => {
      const key = (opt.value ?? "").toLowerCase().trim();
      return colorToSizesFromWarehouse.has(key) && (colorToSizesFromWarehouse.get(key)?.size ?? 0) > 0;
    });
    if (withStock.length > 0) return withStock;
    if (warehouseItems.length > 0) return [];
    return product.availableColors;
  }, [product.availableColors, colorToSizesFromWarehouse, warehouseItems.length]);

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
    fetchCatalogCategories().then(setCatalogCategories);
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

  useEffect(() => {
    const loadImagesByColor = async () => {
      if (!product.slug || !selectedColor) {
        setCurrentImages(product.images);
        return;
      }

      setIsLoadingImages(true);
      try {
        const colorImages = await fetchProductImagesByColor(
          product.slug,
          selectedColor
        );

        if (colorImages.length > 0) {
          setCurrentImages(colorImages);
        } else {
          setCurrentImages(product.images);
        }
      } catch {
        setCurrentImages(product.images);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImagesByColor();
  }, [product.slug, selectedColor, product.images]);

  useEffect(() => {
    setActiveImageIndex(0);
    gallerySwiperRef.current?.slideTo(0);
  }, [currentImages]);

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
    showToast(`${product.title} добавлено в корзину`);
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

  const hasOverflow = currentImages.length > MAX_VISIBLE_THUMBS;
  const overflowCount = hasOverflow
    ? currentImages.length - (MAX_VISIBLE_THUMBS - 1)
    : 0;
  const visibleThumbs =
    overflowCount > 0
      ? currentImages.slice(0, MAX_VISIBLE_THUMBS)
      : currentImages;

  const goToImage = (index: number) => {
    setActiveImageIndex(index);
    gallerySwiperRef.current?.slideTo(index);
  };

  const fromParam = searchParams?.get("from");
  const categoryParam = searchParams?.get("category");
  const origin = getBreadcrumbOrigin(fromParam);
  // Категория из query, иначе — из данных товара (slug/category), без фейкового "t-shirt"
  const rawCategory = categoryParam?.trim() || product.category?.trim() || "";
  const categorySlug = rawCategory ? resolveCategorySlug(rawCategory) : null;
  const categoryLabel = categorySlug
    ? getCategoryDisplayName(categorySlug, catalogCategories)
    : null;
  const categoryHref =
    categorySlug == null
      ? null
      : fromParam === "new-in"
        ? `/new-in?category=${encodeURIComponent(categorySlug)}`
        : `/catalog?category=${encodeURIComponent(categorySlug)}`;
  const productLabel = product.title;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href={origin.href} className={styles.breadcrumbLink}>
            {origin.label}
          </Link>
          {categoryLabel && categoryHref && (
            <>
              <span className={styles.breadcrumbSep} aria-hidden>
                /
              </span>
              <Link href={categoryHref} className={styles.breadcrumbLink}>
                {categoryLabel}
              </Link>
            </>
          )}
          <span className={styles.breadcrumbSep} aria-hidden>
            /
          </span>
          <span className={styles.breadcrumbCurrent}>{productLabel}</span>
        </nav>

        <section className={styles.content}>
          <div className={styles.gallery} aria-live="polite">
            <div className={styles.imageSliderWrap}>
              <div className={styles.heroWrap}>
                {currentImages.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.galleryArrow} ${styles.galleryPrev}`}
                    aria-label="Предыдущее фото"
                    onClick={() => gallerySwiperRef.current?.slidePrev()}
                  >
                    <Image
                      src="/images/product/gallery-arrow.svg"
                      alt=""
                      width={6}
                      height={11}
                      className={styles.galleryArrowIcon}
                      unoptimized
                    />
                  </button>
                )}
                {createElement(
                  Swiper as ComponentType<Record<string, unknown>>,
                  {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    className: styles.imageSlider,
                    onSwiper: (swiper: SwiperInstance) => {
                      gallerySwiperRef.current = swiper;
                    },
                    onSlideChange: (swiper: SwiperInstance) => {
                      setActiveImageIndex(swiper.activeIndex);
                    },
                  },
                  currentImages.map((image, index) => (
                    <SwiperSlide key={image + index}>
                      <div className={styles.heroSlide}>
                        <img
                          src={image}
                          alt={`${product.title} — фото ${index + 1}`}
                          className={styles.heroImage}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                )}
                {currentImages.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.galleryArrow} ${styles.galleryNext}`}
                    aria-label="Следующее фото"
                    onClick={() => gallerySwiperRef.current?.slideNext()}
                  >
                    <Image
                      src="/images/product/gallery-arrow.svg"
                      alt=""
                      width={6}
                      height={11}
                      className={styles.galleryArrowIcon}
                      unoptimized
                    />
                  </button>
                )}
              </div>
              <div className={styles.thumbs} role="tablist" aria-label="Фотографии товара">
                {visibleThumbs.map((image, index) => {
                  const isLastOverflow =
                    overflowCount > 0 && index === visibleThumbs.length - 1;
                  return (
                    <button
                      key={image + index}
                      type="button"
                      className={`${styles.thumb} ${
                        activeImageIndex === index ? styles.thumbActive : ""
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={
                        isLastOverflow
                          ? `Ещё ${overflowCount} фото`
                          : `Фото ${index + 1}`
                      }
                    >
                      <img src={image} alt="" className={styles.thumbImage} />
                      {isLastOverflow && (
                        <span className={styles.thumbMore}>+{overflowCount}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={`${styles.imageGrid} ${
                isLoadingImages ? styles.imageGridLoading : ""
              }`}
            >
              {currentImages.map((image, index) => (
                <div key={image + index} className={styles.imageCell}>
                  <img
                    src={image}
                    alt={`${product.title} — фото ${index + 1}`}
                    className={styles.gridImage}
                    loading={index <= 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.heading}>
              <h1 className={styles.title}>{product.title}</h1>
              <span className={styles.price}>{product.price}</span>
            </div>

            <div className={styles.variantGroup}>
              {colorOptions.length > 0 && (
                <div className={styles.variantRow}>
                  <span className={styles.label}>Выбрать цвет</span>
                  <div className={styles.swatches}>
                    {colorOptions.map((color) => {
                      const isSelected = selectedColor === color.value;
                      return (
                        <button
                          key={color.value}
                          type="button"
                          className={`${styles.swatch} ${
                            isSelected ? styles.swatchSelected : ""
                          }`}
                          onClick={() => setSelectedColor(color.value)}
                          aria-label={`Выбрать цвет ${color.label}`}
                          aria-pressed={isSelected}
                        >
                          <span
                            className={`${styles.swatchFill} ${
                              isLightHex(color.hex) ? styles.swatchFillLight : ""
                            }`}
                            style={{ backgroundColor: color.hex ?? "#d1cdcb" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {availableSizesForSelectedColor.length > 0 && (
                <div className={styles.variantRow}>
                  <span className={styles.label}>Выбрать размер</span>
                  <div className={styles.sizeChips}>
                    {availableSizesForSelectedColor.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          className={`${styles.sizeChip} ${
                            isSelected ? styles.sizeChipSelected : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                          aria-pressed={isSelected}
                          aria-label={`Выбрать размер ${size}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={styles.countAndBuy}>
                <Button
                  variant="dark"
                  fullWidth
                  disabled={!canAddToCart}
                  aria-disabled={!canAddToCart}
                  onClick={handleAddToCart}
                >
                  {addButtonLabel}
                </Button>
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
                return (
                  <div key={section.id} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={styles.accordionButton}
                      onClick={() => handleToggleSection(section.id)}
                      aria-expanded={isOpen}
                    >
                      {section.title}
                      <span className={styles.accordionIcon} aria-hidden>
                        <Image
                          src={
                            isOpen
                              ? "/images/product/minus.svg"
                              : "/images/product/plus.svg"
                          }
                          alt=""
                          width={16}
                          height={isOpen ? 2 : 16}
                          className={
                            isOpen ? styles.accordionMinus : styles.accordionPlus
                          }
                          unoptimized
                        />
                      </span>
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
          title="Вам также может понравиться"
          showShopNow={false}
          headerAlign="center"
          navFrom="catalog"
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPageView;
