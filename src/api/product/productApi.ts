// API для страницы товара

import type { ProductDetail } from "../../types/products";
import type { ProductColorOption } from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";

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

export type ApiWarehouseItem = {
  id: string;
  color?: string;
  color_slug?: string;
  size?: string;
  size_slug?: string;
  quantity: number;
};

export type ApiProductDetail = {
  slug?: string;
  name: string;
  /** Цена: число (руб) или строка */
  price: string | number;
  description: string;
  is_new: boolean;
  images: string[];
  sizes: ApiProductSize[];
  colors: ApiProductColor[];
  warehouse_items: ApiWarehouseItem[];
  /** Описание нанесения */
  print_application?: string;
  /** Описание размеров / размерная сетка */
  sizes_table?: string;
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

// Преобразование API ответа в ProductDetail (только данные с ручки, без доп. опций)
const transformApiProduct = (
  apiProduct: ApiProductDetail,
  slugFromUrl?: string
): ProductDetail => {
  const baseUrl = API_BASE_URL;
  const slug = apiProduct.slug ?? slugFromUrl ?? "";

  const images = (apiProduct.images ?? []).map((img) => {
    if (typeof img !== "string") return "";
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
  });

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

  const category = extractCategoryFromSlug(slug) || "T-shirts";
  const id = hashString(slug || apiProduct.name);

  const sectionEntries: Array<{ id: string; title: string; content: string }> = [
    {
      id: "description",
      title: "Описание",
      content: apiProduct.description || "Описание товара отсутствует.",
    },
  ];

  if (apiProduct.print_application?.trim()) {
    sectionEntries.push({
      id: "print_application",
      title: "Нанесение",
      content: apiProduct.print_application.trim(),
    });
  }
  if (apiProduct.sizes_table?.trim()) {
    sectionEntries.push({
      id: "sizes_table",
      title: "Размерная сетка",
      content: apiProduct.sizes_table.trim(),
    });
  }
  if (apiProduct.model_params?.trim()) {
    sectionEntries.push({
      id: "model_params",
      title: "Параметры модели",
      content: apiProduct.model_params.trim(),
    });
  }
  if (apiProduct.composition_and_care?.trim()) {
    sectionEntries.push({
      id: "composition_and_care",
      title: "Состав и уход",
      content: apiProduct.composition_and_care.trim(),
    });
  }
  if (apiProduct.delivery_info?.trim()) {
    sectionEntries.push({
      id: "delivery_info",
      title: "Доставка",
      content: apiProduct.delivery_info.trim(),
    });
  }
  if (apiProduct.return_info?.trim()) {
    sectionEntries.push({
      id: "return_info",
      title: "Возврат",
      content: apiProduct.return_info.trim(),
    });
  }

  const sections = sectionEntries;

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
  const url = `${CATALOG_API_URL}${slug}/`;
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
        const url = `${CATALOG_API_URL}${slug}/`;
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
  const url = `${CATALOG_API_URL}${productSlug}/${colorSlug}/`;
  const baseUrl = API_BASE_URL;
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

