"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
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

const ProductGallerySwiper = dynamic(
  () => import("./ProductGallerySwiper"),
  { ssr: false }
);

type ProductPageViewProps = {
  product: ProductDetail;
  warehouseItems?: ApiWarehouseItem[];
};

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSizeGuideOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>({});
  const [catalogCategories, setCatalogCategories] = useState<ApiCatalogCategory[]>([]);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showLightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev == null || currentImages.length === 0) return prev;
      return (prev - 1 + currentImages.length) % currentImages.length;
    });
  }, [currentImages.length]);

  const showLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev == null || currentImages.length === 0) return prev;
      return (prev + 1) % currentImages.length;
    });
  }, [currentImages.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [currentImages]);

  useEffect(() => {
    if (lightboxIndex == null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showLightboxPrev();
      if (event.key === "ArrowRight") showLightboxNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showLightboxPrev, showLightboxNext]);

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

  const { width } = useWindowSize();

  const adjustSectionHeights = useCallback(() => {
    const isDesktop = width >= 1025;
    const desktopMaxPx =
      typeof window !== "undefined"
        ? Math.max(200, Math.round(window.innerHeight * 0.4))
        : 320;

    product.sections.forEach((section) => {
      const element = contentRefs.current[section.id];
      if (!element) {
        return;
      }

      if (openSection === section.id) {
        // Сбросить кап, чтобы корректно измерить полную высоту контента
        element.style.overflowY = "hidden";
        element.style.maxHeight = "none";
        const fullHeight = element.scrollHeight;

        if (isDesktop && fullHeight > desktopMaxPx) {
          element.style.maxHeight = `${desktopMaxPx}px`;
          element.style.overflowY = "auto";
        } else {
          element.style.maxHeight = `${fullHeight}px`;
          element.style.overflowY = "hidden";
        }
      } else {
        element.style.maxHeight = "0px";
        element.style.overflowY = "hidden";
      }
    });
  }, [openSection, product.sections, width]);

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
            <ProductGallerySwiper
              images={currentImages}
              productTitle={product.title}
            />

            <div
              className={`${styles.imageGrid} ${
                isLoadingImages ? styles.imageGridLoading : ""
              }`}
            >
              {currentImages.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  className={styles.imageCell}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Открыть фото ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} — фото ${index + 1}`}
                    fill
                    sizes="(min-width: 1025px) 30vw, 0px"
                    className={styles.gridImage}
                    priority={index <= 1}
                  />
                </button>
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

      {lightboxIndex != null && currentImages[lightboxIndex] && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} — фото ${lightboxIndex + 1}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            ×
          </button>
          {currentImages.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(event) => {
                  event.stopPropagation();
                  showLightboxPrev();
                }}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(event) => {
                  event.stopPropagation();
                  showLightboxNext();
                }}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </>
          )}
          <Image
            src={currentImages[lightboxIndex]}
            alt={`${product.title} — фото ${lightboxIndex + 1}`}
            width={1200}
            height={1600}
            className={styles.lightboxImage}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPageView;
