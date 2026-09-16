// API для страницы каталога

import type { ApiProduct, CatalogApiParams } from "../../types/api";
import type { CatalogProduct } from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";
import { resolveCardImages } from "../../lib/productImages";
import { shouldUseMocks } from "../../mocks/config";
import {
  getMockCatalogCategories,
  getMockCatalogColors,
  getMockCatalogList,
  getMockCatalogSizes,
} from "../../mocks/catalogMocks";

const CATALOG_API_URL = `${API_BASE_URL}/api/catalog/`;

// Типы ответов ручек категорий, цветов и размеров
export type ApiCatalogCategory = {
  slug: string;
  name: string;
};

/** Подпись категории в UI — только name с /categories/ */
export function getCatalogCategoryLabel(category: ApiCatalogCategory): string {
  return category.name;
}

const normalizeCategoryKey = (value: string): string =>
  decodeURIComponent(value).trim().toLowerCase().replace(/_/g, "-");

/**
 * Query-параметр category → slug для API.
 * Без хардкода: значение из URL уходит как есть (после trim/lower).
 */
export function resolveCategorySlug(value: string): string | null {
  const trimmed = decodeURIComponent(value).trim();
  if (!trimmed || trimmed.toLowerCase() === "all") {
    return null;
  }
  return normalizeCategoryKey(trimmed);
}

/** Найти категорию по slug или name из ответа /categories/ */
export function findCatalogCategory(
  value: string,
  categories: ApiCatalogCategory[]
): ApiCatalogCategory | undefined {
  const key = normalizeCategoryKey(value);
  return categories.find(
    (category) =>
      normalizeCategoryKey(category.slug) === key ||
      normalizeCategoryKey(category.name) === key
  );
}

/** Подпись категории: name из /categories/, иначе сам slug */
export function getCategoryDisplayName(
  value: string,
  categories: ApiCatalogCategory[] = []
): string {
  const fromApi = findCatalogCategory(value, categories);
  if (fromApi?.name) {
    return fromApi.name;
  }

  const slug = resolveCategorySlug(value);
  return slug ?? "";
}

export function buildCatalogCategoryHref(slug: string): string {
  return `/catalog?category=${encodeURIComponent(slug)}`;
}

export type ApiCatalogColor = {
  slug: string;
  value: string;
  hex: string;
};

export type ApiCatalogSize = {
  slug: string;
  value: string;
};

// Кеш для запросов
const cache = new Map<string, { data: CatalogProduct[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Преобразование API ответа в CatalogProduct
const transformApiProduct = (apiProduct: ApiProduct, index: number): CatalogProduct => {
  const baseUrl = API_BASE_URL;

  const images = resolveCardImages(apiProduct.images, baseUrl);

  const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  // Категория для фильтров берётся только из /categories/ + query slug, не из эвристик
  const category = "";

  // Генерируем стабильный ID на основе slug
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
    category,
    color: defaultColor,
    size: defaultSize,
    colors: colors.length > 0 ? colors : undefined,
    sizes: sizes.length > 0 ? sizes : undefined,
    variants,
    sortOrder: index,
  };
};

// Простая функция хеширования для генерации ID из slug
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Функция для получения товаров каталога с фильтрами
export const fetchCatalogProducts = async (
  params: CatalogApiParams = {}
): Promise<CatalogProduct[]> => {
  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  if (shouldUseMocks()) {
    const data = getMockCatalogList(params);
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
    
    if (params.category) {
      url.searchParams.set("category", params.category);
    }
    
    if (params.is_new !== undefined) {
      url.searchParams.set("is_new", params.is_new.toString());
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
  } catch (error) {
    return [];
  }
};

/** Товары каталога; `category` — slug как с /categories/, без маппинга */
export const fetchCatalogProductsByCategory = async (
  category?: string
): Promise<CatalogProduct[]> => {
  const slug = category?.trim();
  if (!slug || slug.toLowerCase() === "all") {
    return fetchCatalogProducts({});
  }

  return fetchCatalogProducts({
    category: normalizeCategoryKey(slug),
  });
};

// Кеш для категорий, цветов и размеров (один запрос на сессию, TTL 5 мин)
const FILTERS_CACHE_DURATION = 5 * 60 * 1000;
let categoriesCacheState: { data: ApiCatalogCategory[]; timestamp: number } | null = null;
let colorsCacheState: { data: ApiCatalogColor[]; timestamp: number } | null = null;
let sizesCacheState: { data: ApiCatalogSize[]; timestamp: number } | null = null;

// Получение списка категорий для фильтров (с in-memory кешем)
export const fetchCatalogCategories = async (): Promise<ApiCatalogCategory[]> => {
  if (categoriesCacheState && Date.now() - categoriesCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return categoriesCacheState.data;
  }
  if (shouldUseMocks()) {
    const list = getMockCatalogCategories();
    categoriesCacheState = { data: list, timestamp: Date.now() };
    return list;
  }
  try {
    const response = await fetch(`${CATALOG_API_URL}categories/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as ApiCatalogCategory[];
    const list = Array.isArray(data) ? data : [];
    categoriesCacheState = { data: list, timestamp: Date.now() };
    return list;
  } catch (error) {
    return categoriesCacheState?.data ?? [];
  }
};

// Получение списка цветов для фильтров (с in-memory кешем)
export const fetchCatalogColors = async (): Promise<ApiCatalogColor[]> => {
  if (colorsCacheState && Date.now() - colorsCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return colorsCacheState.data;
  }
  if (shouldUseMocks()) {
    const data = getMockCatalogColors();
    colorsCacheState = { data, timestamp: Date.now() };
    return data;
  }
  try {
    const response = await fetch(`${CATALOG_API_URL}colors/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    colorsCacheState = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    return colorsCacheState?.data ?? [];
  }
};

// Получение списка размеров для фильтров (с in-memory кешем)
export const fetchCatalogSizes = async (): Promise<ApiCatalogSize[]> => {
  if (sizesCacheState && Date.now() - sizesCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return sizesCacheState.data;
  }
  if (shouldUseMocks()) {
    const data = getMockCatalogSizes();
    sizesCacheState = { data, timestamp: Date.now() };
    return data;
  }
  try {
    const response = await fetch(`${CATALOG_API_URL}sizes/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    sizesCacheState = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    return sizesCacheState?.data ?? [];
  }
};

// Предзагрузка категорий и фильтров (заполняет in-memory кеш для быстрого отклика на /catalog и /new-in)
export const preloadCatalogFilters = (): void => {
  void fetchCatalogCategories();
  void fetchCatalogColors();
  void fetchCatalogSizes();
};

