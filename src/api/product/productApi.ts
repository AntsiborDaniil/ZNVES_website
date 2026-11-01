// API для страницы товара

import type {
  ProductAccordionSection,
  ProductAccordionTable,
  ProductColorOption,
  ProductDetail,
} from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";
import { resolveApiImageUrl } from "../../lib/imageUrl";
import {
  resolveGalleryImages,
  type ApiProductImage,
} from "../../lib/productImages";
import { shouldUseMocks } from "../../lib/useMocks";

const CATALOG_API_URL = `${API_BASE_URL}/api/catalog/`;

// Типы для API ответа
export type ApiProductSize = {
  slug: string;
  value: string;
};

export type ApiProductColor = {
  slug: string;
  value: string;
  hex: string;
};

/** Размерная сетка: бек отдаёт готовые заголовки и строки ячеек */
export type ApiSizesTable = {
  columns: string[];
  rows: string[][];
};

export type ApiWarehouseItem = {
  id: string;
  color?: string;
  color_slug?: string;
  size?: string;
  size_slug?: string;
  quantity: number;
  /** Вес единицы товара в граммах (для расчёта доставки в виджете) */
  weight?: number;
};

export type ApiProductDetail = {
  slug?: string;
  name: string;
  /** Цена: число (руб) или строка */
  price: string | number;
  description: string;
  is_new: boolean;
  images: ApiProductImage[];
  sizes: ApiProductSize[];
  colors: ApiProductColor[];
  warehouse_items: ApiWarehouseItem[];
  /** Описание нанесения */
  print_application?: string;
  /** Размерная сетка (раньше приходила строкой — поддерживаем оба формата) */
  sizes_table?: ApiSizesTable | string;
  /** Параметры модели */
  model_params?: string;
  /** Состав и уход */
  composition_and_care?: string;
  /** Информация о доставке */
  delivery_info?: string;
  /** Информация о возврате */
  return_info?: string;
};

// Кеш для запросов
const cache = new Map<string, { data: ProductDetail; timestamp: number }>();
const rawCache = new Map<string, { data: ApiProductDetail; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Дедупликация одновременных запросов по одному slug
const inFlightRaw = new Map<string, Promise<ApiProductDetail | null>>();
const inFlightBySlug = new Map<string, Promise<ProductDetail | null>>();
const inFlightImages = new Map<string, Promise<string[]>>();

// Текстовое поле с ручки: всё, что не строка, считаем отсутствующим (чтобы смена типа на беке не роняла страницу)
const toText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const toCell = (value: unknown): string =>
  typeof value === "string" || typeof value === "number" ? String(value).trim() : "";

// Размерная сетка { columns, rows }: пустые ячейки показываем прочерком, строки выравниваем по числу колонок
const toSizesTable = (value: unknown): ProductAccordionTable | null => {
  if (typeof value !== "object" || value === null) return null;
  const { columns, rows } = value as Partial<Record<keyof ApiSizesTable, unknown>>;
  if (!Array.isArray(columns) || !Array.isArray(rows)) return null;

  const headers = columns.map(toCell);
  if (headers.length === 0) return null;

  const cells = rows
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => headers.map((_, index) => toCell(row[index])))
    .filter((row) => row.some(Boolean))
    .map((row) => row.map((cell) => cell || "—"));
  if (cells.length === 0) return null;

  return { columns: headers, rows: cells };
};

// Преобразование API ответа в ProductDetail (только данные с ручки, без доп. опций)
const transformApiProduct = (
  apiProduct: ApiProductDetail,
  slugFromUrl?: string
): ProductDetail => {
  const baseUrl = API_BASE_URL;
  const slug = apiProduct.slug ?? slugFromUrl ?? "";

  const images = resolveGalleryImages(apiProduct.images, baseUrl).filter(Boolean);

  const priceValue =
    typeof apiProduct.price === "number"
      ? apiProduct.price
      : parseFloat(String(apiProduct.price ?? "").replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  // Только размеры с ручки
  const availableSizes = (apiProduct.sizes ?? []).map((size) => size.slug);
  const defaultSize = availableSizes[0] ?? "";

  // Только цвета с ручки
  const availableColors: ProductColorOption[] = (apiProduct.colors ?? []).map((color) => ({
    label: color.value,
    value: color.slug,
    hex: color.hex,
  }));
  const defaultColor = availableColors[0]?.value ?? "";

  const category = "";
  const id = hashString(slug || apiProduct.name);

  const sections: ProductAccordionSection[] = [
    {
      id: "description",
      title: "Описание",
      content: toText(apiProduct.description) || "Описание товара отсутствует.",
    },
  ];

  const pushTextSection = (id: string, title: string, value: unknown) => {
    const content = toText(value);
    if (content) sections.push({ id, title, content });
  };

  pushTextSection("print_application", "Нанесение", apiProduct.print_application);

  const sizesTable = toSizesTable(apiProduct.sizes_table);
  if (sizesTable) {
    sections.push({ id: "sizes_table", title: "Размерная сетка", content: "", table: sizesTable });
  } else {
    pushTextSection("sizes_table", "Размерная сетка", apiProduct.sizes_table);
  }

  pushTextSection("model_params", "Параметры модели", apiProduct.model_params);
  pushTextSection("composition_and_care", "Состав и уход", apiProduct.composition_and_care);
  pushTextSection("delivery_info", "Доставка", apiProduct.delivery_info);
  pushTextSection("return_info", "Возврат", apiProduct.return_info);

  return {
    id,
    slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue: Math.round(priceValue),
    images,
    isNew: apiProduct.is_new ?? false,
    category,
    color: defaultColor,
    size: defaultSize,
    sortOrder: 0,
    sku: slug || apiProduct.name,
    defaultSize,
    availableSizes,
    availableColors,
    sections,
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

const fetchProductBySlugInternal = async (slug: string): Promise<ProductDetail | null> => {
  if (shouldUseMocks()) {
    const { getMockProductDetailBySlug } = await import("../../mocks/catalogMocks");
    const data = getMockProductDetailBySlug(slug);
    if (!data) return null;
    const transformedProduct = transformApiProduct(data, slug);
    cache.set(slug, { data: transformedProduct, timestamp: Date.now() });
    return transformedProduct;
  }

  const url = `${CATALOG_API_URL}${slug}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 5 * 60 },
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data: ApiProductDetail = await response.json();
  const transformedProduct = transformApiProduct(data, slug);
  cache.set(slug, { data: transformedProduct, timestamp: Date.now() });
  return transformedProduct;
};

/** Получение товара по slug с кешем и дедупликацией одновременных запросов */
export const fetchProductBySlug = async (slug: string): Promise<ProductDetail | null> => {
  const cached = cache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) return cached.data;

  let promise = inFlightBySlug.get(slug);
  if (!promise) {
    promise = fetchProductBySlugInternal(slug).finally(() => inFlightBySlug.delete(slug));
    inFlightBySlug.set(slug, promise);
  }
  return promise;
};

/** Получение товара с warehouse_items для страницы и добавления в корзину */
export const fetchProductWithWarehouse = async (
  slug: string
): Promise<{ product: ProductDetail; warehouseItems: ApiWarehouseItem[] } | null> => {
  const raw = await fetchCatalogProductRaw(slug);
  if (!raw) return null;
  const product = transformApiProduct(raw, slug);
  return {
    product,
    warehouseItems: raw.warehouse_items || [],
  };
};

/** Сырой ответ каталога по slug (warehouse_items и т.д.) — для чекаута, с кешем и дедупликацией */
export const fetchCatalogProductRaw = async (slug: string): Promise<ApiProductDetail | null> => {
  const cached = rawCache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) return cached.data;

  let promise = inFlightRaw.get(slug);
  if (!promise) {
    promise = (async () => {
      try {
        if (shouldUseMocks()) {
          const { getMockProductDetailBySlug } = await import("../../mocks/catalogMocks");
          const data = getMockProductDetailBySlug(slug);
          if (!data) return null;
          rawCache.set(slug, { data, timestamp: Date.now() });
          return data;
        }

        const url = `${CATALOG_API_URL}${slug}/`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          next: { revalidate: 5 * 60 },
        });
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error(`API error: ${response.status}`);
        }
        const data: ApiProductDetail = await response.json();
        rawCache.set(slug, { data, timestamp: Date.now() });
        return data;
      } finally {
        inFlightRaw.delete(slug);
      }
    })();
    inFlightRaw.set(slug, promise);
  }
  return promise;
};

// Кеш для изображений по цвету
const colorImagesCache = new Map<string, { data: string[]; timestamp: number }>();
const COLOR_IMAGES_CACHE_DURATION = 5 * 60 * 1000; // 5 минут

const fetchProductImagesByColorInternal = async (
  productSlug: string,
  colorSlug: string
): Promise<string[]> => {
  const url = `${CATALOG_API_URL}${productSlug}/${colorSlug}/`;
  const baseUrl = API_BASE_URL;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 5 * 60 },
  });
  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const imagePaths: string[] = await response.json();
  const images = imagePaths.map((img) => resolveApiImageUrl(img, baseUrl));
  colorImagesCache.set(`${productSlug}-${colorSlug}`, { data: images, timestamp: Date.now() });
  return images;
};

/** Изображения товара по цвету — кеш и дедупликация одновременных запросов */
export const fetchProductImagesByColor = async (
  productSlug: string,
  colorSlug: string
): Promise<string[]> => {
  const cacheKey = `${productSlug}-${colorSlug}`;
  const cached = colorImagesCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < COLOR_IMAGES_CACHE_DURATION) return cached.data;

  let promise = inFlightImages.get(cacheKey);
  if (!promise) {
    promise = fetchProductImagesByColorInternal(productSlug, colorSlug)
      .catch((err) => {
        return [];
      })
      .finally(() => inFlightImages.delete(cacheKey));
    inFlightImages.set(cacheKey, promise);
  }
  return promise;
};

