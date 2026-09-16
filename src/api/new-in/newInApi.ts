// API для страницы new in

import type { ApiProduct } from "../../types/api";
import type { CatalogProduct } from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";
import { resolveCardImages } from "../../lib/productImages";
import { shouldUseMocks } from "../../mocks/config";
import { getMockCatalogList } from "../../mocks/catalogMocks";

const CATALOG_API_URL = `${API_BASE_URL}/api/catalog/`;

// Кеш для запросов
const cache = new Map<string, { data: CatalogProduct[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

const normalizeCategorySlug = (category?: string): string | undefined => {
  const slug = category?.trim().toLowerCase().replace(/_/g, "-");
  if (!slug || slug === "all") return undefined;
  return slug;
};

// Преобразование API ответа в CatalogProduct
const transformApiProduct = (apiProduct: ApiProduct, index: number): CatalogProduct => {
  const images = resolveCardImages(apiProduct.images, API_BASE_URL);

  const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  const id = hashString(apiProduct.slug) || index + 1;

  const colors = apiProduct.colors ?? [];
  const sizes = apiProduct.sizes ?? [];
  const defaultColor = colors[0]?.slug ?? "";
  const defaultSize = sizes[0]?.slug ?? "";
  const variants = apiProduct.variants ?? undefined;

  return {
    id,
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue,
    images,
    isNew: apiProduct.is_new,
    category: "",
    color: defaultColor,
    size: defaultSize,
    colors: colors.length > 0 ? colors : undefined,
    sizes: sizes.length > 0 ? sizes : undefined,
    variants,
    sortOrder: index,
  };
};

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

/** Новинки; `category` — slug с /categories/, без хардкод-маппинга */
export const fetchNewInProducts = async (
  category?: string
): Promise<CatalogProduct[]> => {
  const categorySlug = normalizeCategorySlug(category);
  const cacheKey = JSON.stringify({ category: categorySlug, is_new: true });
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  if (shouldUseMocks()) {
    const data = getMockCatalogList({
      category: categorySlug,
      is_new: true,
    });
    const transformedProducts = data.map((product, index) =>
      transformApiProduct(product, index)
    );
    cache.set(cacheKey, {
      data: transformedProducts,
      timestamp: Date.now(),
    });
    return transformedProducts;
  }

  try {
    const url = new URL(CATALOG_API_URL);

    url.searchParams.set("is_new", "true");

    if (categorySlug) {
      url.searchParams.set("category", categorySlug);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiProduct[] = await response.json();

    const transformedProducts = data.map((product, index) =>
      transformApiProduct(product, index)
    );

    cache.set(cacheKey, {
      data: transformedProducts,
      timestamp: Date.now(),
    });

    return transformedProducts;
  } catch {
    return [];
  }
};
