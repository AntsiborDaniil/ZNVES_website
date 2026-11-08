// API для страницы каталога

import type { ApiProduct, CatalogApiParams } from "../../types/api";
import type { CatalogProduct } from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";
import { fetchWithTimeout } from "../../lib/fetchWithTimeout";
import { resolveCardImages } from "../../lib/productImages";
import { shouldUseMocks } from "../../lib/useMocks";

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

/** Размер первой/следующей порции каталога (SSR + infinite scroll). */
export const CATALOG_PAGE_SIZE = 12;

export type CatalogPageResult = {
  products: CatalogProduct[];
  /** Есть ли ещё страницы на бэке (DRF next / полный page_size). */
  hasMore: boolean;
  page: number;
  pageSize: number;
  total: number | null;
  /** `full` — бэк отдал весь список массивом (пагинацию игнорирует). */
  mode: "paged" | "full";
};

// Кеш страниц каталога
const cache = new Map<string, { result: CatalogPageResult; timestamp: number }>();
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

const isApiProductArray = (value: unknown): value is ApiProduct[] =>
  Array.isArray(value) &&
  (value.length === 0 ||
    (typeof value[0] === "object" &&
      value[0] !== null &&
      "slug" in value[0]));

type DrfCatalogPage = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: ApiProduct[];
};

const isDrfCatalogPage = (value: unknown): value is DrfCatalogPage =>
  typeof value === "object" &&
  value !== null &&
  "results" in value &&
  Array.isArray((value as DrfCatalogPage).results);

const parseCatalogPayload = (
  data: unknown,
  page: number,
  pageSize: number,
  sortOffset: number
): CatalogPageResult => {
  if (isDrfCatalogPage(data)) {
    const products = data.results.map((product, index) =>
      transformApiProduct(product, sortOffset + index)
    );
    const hasMore =
      data.next != null && data.next !== ""
        ? true
        : typeof data.count === "number"
          ? page * pageSize < data.count
          : products.length >= pageSize;

    return {
      products,
      hasMore,
      page,
      pageSize,
      total: typeof data.count === "number" ? data.count : null,
      mode: "paged",
    };
  }

  if (isApiProductArray(data)) {
    // Плоский массив = бэкенд отдал всю выборку разом (пагинацию игнорирует)
    const products = data.map((product, index) =>
      transformApiProduct(product, sortOffset + index)
    );
    return {
      products,
      hasMore: false,
      page: 1,
      pageSize,
      total: products.length,
      mode: "full",
    };
  }

  return {
    products: [],
    hasMore: false,
    page,
    pageSize,
    total: 0,
    mode: "full",
  };
};

/** Одна страница каталога (SSR / infinite scroll). */
export const fetchCatalogProductsPage = async (
  params: CatalogApiParams = {}
): Promise<CatalogPageResult> => {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.page_size ?? CATALOG_PAGE_SIZE);
  const sortOffset = (page - 1) * pageSize;
  const requestParams: CatalogApiParams = {
    ...params,
    page,
    page_size: pageSize,
  };
  const cacheKey = JSON.stringify(requestParams);
  const cached = cache.get(cacheKey);

  if (typeof window === "undefined" && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.result;
  }

  if (shouldUseMocks()) {
    const { getMockCatalogPage } = await import("../../mocks/catalogMocks");
    const payload = getMockCatalogPage(requestParams);
    const parsed = parseCatalogPayload(payload, page, pageSize, sortOffset);
    if (typeof window === "undefined") cache.set(cacheKey, {
      result: parsed,
      timestamp: Date.now(),
    });
    return parsed;
  }

  try {
    const url = new URL(CATALOG_API_URL);

    if (params.category) {
      url.searchParams.set("category", params.category);
    }

    if (params.is_new !== undefined) {
      url.searchParams.set("is_new", params.is_new.toString());
    }

    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", String(pageSize));

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 5 * 60 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    const parsed = parseCatalogPayload(data, page, pageSize, sortOffset);

    // Защита от «фейковой» пагинации: page>1 снова те же slug → стоп
    if (page > 1 && parsed.mode === "full") {
      return { ...parsed, products: [], hasMore: false };
    }

    if (typeof window === "undefined") cache.set(cacheKey, {
      result: parsed,
      timestamp: Date.now(),
    });

    return parsed;
  } catch {
    if (typeof window !== "undefined") throw new Error("Не удалось загрузить товары. Повторите попытку.");
    return {
      products: [],
      hasMore: false,
      page,
      pageSize,
      total: null,
      mode: "full",
    };
  }
};

/** Все товары по фильтрам (без пагинации UI) — для мест, где нужен полный список. */
export const fetchCatalogProducts = async (
  params: CatalogApiParams = {}
): Promise<CatalogProduct[]> => {
  // Без page — одна выгрузка как раньше (бэк может отдать весь массив)
  const { page: _page, page_size: _pageSize, ...rest } = params;
  const result = await fetchCatalogProductsPage({
    ...rest,
    page: 1,
    page_size: params.page_size ?? 500,
  });
  return result.products;
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

export const fetchCatalogProductsPageByCategory = async (
  category?: string,
  page = 1,
  pageSize = CATALOG_PAGE_SIZE
): Promise<CatalogPageResult> => {
  const slug = category?.trim();
  if (!slug || slug.toLowerCase() === "all") {
    return fetchCatalogProductsPage({ page, page_size: pageSize });
  }

  return fetchCatalogProductsPage({
    category: normalizeCategoryKey(slug),
    page,
    page_size: pageSize,
  });
};

// Кеш для категорий, цветов и размеров (один запрос на сессию, TTL 5 мин)
const FILTERS_CACHE_DURATION = 5 * 60 * 1000;
let categoriesCacheState: { data: ApiCatalogCategory[]; timestamp: number } | null = null;
let colorsCacheState: { data: ApiCatalogColor[]; timestamp: number } | null = null;
let sizesCacheState: { data: ApiCatalogSize[]; timestamp: number } | null = null;

// Получение списка категорий для фильтров (с in-memory кешем)
export const fetchCatalogCategories = async (): Promise<ApiCatalogCategory[]> => {
  if (typeof window === "undefined" && categoriesCacheState && Date.now() - categoriesCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return categoriesCacheState.data;
  }
  if (shouldUseMocks()) {
    const { getMockCatalogCategories } = await import("../../mocks/catalogMocks");
    const list = getMockCatalogCategories();
    if (typeof window === "undefined") categoriesCacheState = { data: list, timestamp: Date.now() };
    return list;
  }
  try {
    const response = await fetchWithTimeout(`${CATALOG_API_URL}categories/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 5 * 60 },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as ApiCatalogCategory[];
    const list = Array.isArray(data) ? data : [];
    if (typeof window === "undefined") categoriesCacheState = { data: list, timestamp: Date.now() };
    return list;
  } catch (error) {
    return categoriesCacheState?.data ?? [];
  }
};

// Получение списка цветов для фильтров (с in-memory кешем)
export const fetchCatalogColors = async (): Promise<ApiCatalogColor[]> => {
  if (typeof window === "undefined" && colorsCacheState && Date.now() - colorsCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return colorsCacheState.data;
  }
  if (shouldUseMocks()) {
    const { getMockCatalogColors } = await import("../../mocks/catalogMocks");
    const data = getMockCatalogColors();
    if (typeof window === "undefined") colorsCacheState = { data, timestamp: Date.now() };
    return data;
  }
  try {
    const response = await fetchWithTimeout(`${CATALOG_API_URL}colors/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 5 * 60 },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (typeof window === "undefined") colorsCacheState = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    return colorsCacheState?.data ?? [];
  }
};

// Получение списка размеров для фильтров (с in-memory кешем)
export const fetchCatalogSizes = async (): Promise<ApiCatalogSize[]> => {
  if (typeof window === "undefined" && sizesCacheState && Date.now() - sizesCacheState.timestamp < FILTERS_CACHE_DURATION) {
    return sizesCacheState.data;
  }
  if (shouldUseMocks()) {
    const { getMockCatalogSizes } = await import("../../mocks/catalogMocks");
    const data = getMockCatalogSizes();
    if (typeof window === "undefined") sizesCacheState = { data, timestamp: Date.now() };
    return data;
  }
  try {
    const response = await fetchWithTimeout(`${CATALOG_API_URL}sizes/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 5 * 60 },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (typeof window === "undefined") sizesCacheState = { data, timestamp: Date.now() };
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

