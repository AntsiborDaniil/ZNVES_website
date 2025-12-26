// API для страницы товара

import type { ProductDetail } from "../../types/products";
import type { ProductColorOption } from "../../types/products";

const API_BASE_URL = "http://158.160.115.103:8000/api/catalog/";

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
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Преобразование API ответа в ProductDetail
const transformApiProduct = (apiProduct: ApiProductDetail): ProductDetail => {
  const baseUrl = "http://158.160.115.103:8000";
  
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

// Функция для получения товара по slug
export const fetchProductBySlug = async (
  slug: string
): Promise<ProductDetail | null> => {
  const cacheKey = slug;
  const cached = cache.get(cacheKey);
  
  // Проверяем кеш
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = `${API_BASE_URL}${slug}/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiProductDetail = await response.json();
    
    const transformedProduct = transformApiProduct(data);

    // Сохраняем в кеш
    cache.set(cacheKey, {
      data: transformedProduct,
      timestamp: Date.now(),
    });

    return transformedProduct;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

