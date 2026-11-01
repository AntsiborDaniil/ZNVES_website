// API для слайдеров на главной странице

import type { ApiProduct, CatalogApiParams } from "../../types/api";
import type { CatalogProduct } from "../../types/products";
import { API_BASE_URL } from "../../lib/apiConfig";
import { resolveCardImages } from "../../lib/productImages";
import { shouldUseMocks } from "../../lib/useMocks";

const CATALOG_API_URL = `${API_BASE_URL}/api/catalog/`;

// Кеш для запросов
const cache = new Map<string, { data: CatalogProduct[]; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 минут

// Преобразование API ответа в CatalogProduct
const transformApiProduct = (apiProduct: ApiProduct, index: number): CatalogProduct => {
  const images = resolveCardImages(apiProduct.images, API_BASE_URL);

  // Парсим цену
  const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

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

// Функция для получения товаров каталога
export const fetchCatalogProducts = async (
  params: CatalogApiParams = {}
): Promise<CatalogProduct[]> => {
  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);
  
  // Проверяем кеш
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  if (shouldUseMocks()) {
    const { getMockCatalogList } = await import("../../mocks/catalogMocks");
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

    // Новинки для Bestsellers — короткий TTL; пустой ISR-кеш иначе «залипает»
    const revalidateSeconds = params.is_new ? 60 : 15 * 60;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiProduct[] = await response.json();
    
    const transformedProducts = data.map((product, index) =>
      transformApiProduct(product, index)
    );

    // Не кешируем пустой ответ — иначе Bestsellers «залипает» без новинок
    if (transformedProducts.length > 0) {
      cache.set(cacheKey, {
        data: transformedProducts,
        timestamp: Date.now(),
      });
    }

    return transformedProducts;
  } catch (error) {
    // Возвращаем пустой массив в случае ошибки
    return [];
  }
};

// Функция для получения новых товаров (для слайдера NEW IN)
export const fetchNewInProducts = async (): Promise<CatalogProduct[]> => {
  return fetchCatalogProducts({
    is_new: true,
  });
};

// Функция для получения всех товаров каталога (для слайдера CATALOG)
export const fetchAllCatalogProducts = async (): Promise<CatalogProduct[]> => {
  return fetchCatalogProducts({});
};

