// API для страницы товара

import type { ProductDetail } from "../../types/products";
import type { ProductColorOption } from "../../types/products";

const API_BASE_URL = "http://62.84.115.11:8000/api/catalog/";

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

export type ApiWarehouseItem = {
  id: string;
  color: string;
  size: string;
  quantity: number;
};

export type ApiProductDetail = {
  slug: string;
  name: string;
  price: string;
  description: string;
  is_new: boolean;
  images: string[];
  sizes: ApiProductSize[];
  colors: ApiProductColor[];
  warehouse_items: ApiWarehouseItem[];
};

// Кеш для запросов
const cache = new Map<string, { data: ProductDetail; timestamp: number }>();
const rawCache = new Map<string, { data: ApiProductDetail; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Дедупликация одновременных запросов по одному slug
const inFlightRaw = new Map<string, Promise<ApiProductDetail | null>>();
const inFlightBySlug = new Map<string, Promise<ProductDetail | null>>();
const inFlightImages = new Map<string, Promise<string[]>>();

// Преобразование API ответа в ProductDetail
const transformApiProduct = (apiProduct: ApiProductDetail): ProductDetail => {
  const baseUrl = "http://62.84.115.11:8000";
  
  // Преобразуем изображения, добавляя базовый URL если нужно
  const images = apiProduct.images.map((img) => {
    if (img.startsWith("http")) {
      return img;
    }
    return img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
  });

  // Парсим цену
  const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  // Преобразуем размеры
  const availableSizes = apiProduct.sizes.map((size) => size.slug);
  const defaultSize = availableSizes[0] || "m";

  // Преобразуем цвета
  const availableColors: ProductColorOption[] = apiProduct.colors.map((color) => ({
    label: color.value,
    value: color.slug,
    hex: color.hex,
  }));

  // Определяем категорию из slug
  const category = extractCategoryFromSlug(apiProduct.slug) || "T-shirts";

  // Генерируем ID из slug
  const id = hashString(apiProduct.slug);

  // Создаем секции для аккордеона
  const sections = [
    {
      id: "description",
      title: "Описание",
      content: apiProduct.description || "Описание товара отсутствует.",
    },
  ];

  return {
    id,
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue: Math.round(priceValue),
    images,
    isNew: apiProduct.is_new,
    category,
    color: availableColors[0]?.value || "green",
    size: defaultSize,
    sortOrder: 0,
    sku: apiProduct.slug,
    defaultSize,
    availableSizes,
    availableColors,
    sections,
  };
};

// Извлечение категории из slug
const extractCategoryFromSlug = (slug: string): string | null => {
  const slugLower = slug.toLowerCase();
  
  if (slugLower.includes("pant") || slugLower.includes("брюк")) return "Pants";
  if (slugLower.includes("jean")) return "Jeans";
  if (slugLower.includes("t-shirt") || slugLower.includes("футболк")) return "T-shirts";
  if (slugLower.includes("zip") && slugLower.includes("hood")) return "Zip hoodies";
  if (slugLower.includes("jacket")) return "Jackets";
  if (slugLower.includes("hoodie")) return "Hoodies";
  if (slugLower.includes("short")) return "Shorts";
  
  return null;
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
  const url = `${API_BASE_URL}${slug}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data: ApiProductDetail = await response.json();
  const transformedProduct = transformApiProduct(data);
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

/** Сырой ответ каталога по slug (warehouse_items и т.д.) — для чекаута, с кешем и дедупликацией */
export const fetchCatalogProductRaw = async (slug: string): Promise<ApiProductDetail | null> => {
  const cached = rawCache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) return cached.data;

  let promise = inFlightRaw.get(slug);
  if (!promise) {
    promise = (async () => {
      try {
        const url = `${API_BASE_URL}${slug}/`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
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
  const url = `${API_BASE_URL}${productSlug}/${colorSlug}/`;
  const baseUrl = "http://62.84.115.11:8000";
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const imagePaths: string[] = await response.json();
  const images = imagePaths.map((img) =>
    img.startsWith("http") ? img : img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`
  );
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
        console.error("Error fetching product images by color:", err);
        return [];
      })
      .finally(() => inFlightImages.delete(cacheKey));
    inFlightImages.set(cacheKey, promise);
  }
  return promise;
};

