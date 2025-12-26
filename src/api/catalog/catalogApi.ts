// API для страницы каталога

import type { ApiProduct, CatalogApiParams } from "../../types/api";
import type { CatalogProduct } from "../../types/products";

const API_BASE_URL = "http://158.160.115.103:8000/api/catalog/";

// Кеш для запросов
const cache = new Map<string, { data: CatalogProduct[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Преобразование API ответа в CatalogProduct
const transformApiProduct = (apiProduct: ApiProduct, index: number): CatalogProduct => {
  const baseUrl = "http://158.160.115.103:8000";
  
  const images = apiProduct.images.map((img) => {
    if (img.startsWith("http")) {
      return img;
    }
    return img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
  });

  const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  const category = extractCategoryFromSlug(apiProduct.slug) || "T-shirts";

  // Генерируем стабильный ID на основе slug
  const id = hashString(apiProduct.slug) || index + 1;

  return {
    id,
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue,
    images,
    isNew: apiProduct.is_new,
    category,
    color: "green",
    size: "m",
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

// Нормализация категории для API
const normalizeCategoryForApi = (category: string): string | undefined => {
  if (category === "All") return undefined;
  
  const categoryMap: Record<string, string> = {
    "Pants": "pants",
    "Jeans": "jeans",
    "T-shirts": "t-shirt",
    "Zip hoodies": "zip hoodies",
    "Jackets": "jackets",
    "Hoodies": "hoodies",
    "Shorts": "shorts",
  };
  
  return categoryMap[category] || category.toLowerCase();
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

  try {
    const url = new URL(API_BASE_URL);
    
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
    console.error("Error fetching catalog products:", error);
    return [];
  }
};

// Функция для получения товаров с учетом категории из query параметров
export const fetchCatalogProductsByCategory = async (
  category?: string
): Promise<CatalogProduct[]> => {
  const normalizedCategory = category ? normalizeCategoryForApi(category) : undefined;
  
  return fetchCatalogProducts({
    category: normalizedCategory,
  });
};

// Экспорт функции нормализации для использования в компонентах
export { normalizeCategoryForApi };

