"use client";

import type { CatalogProduct } from "../types/products";

// Типы для API ответа
type ApiProduct = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  images: string[];
};

type CatalogApiParams = {
  category?: string;
  is_new?: boolean;
};

// Кеш для запросов (в памяти)
const cache = new Map<string, { data: CatalogProduct[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Map для отслеживания активных запросов (защита от дублирования)
const activeRequests = new Map<string, Promise<CatalogProduct[]>>();

// Ключи для localStorage
const STORAGE_KEY_PREFIX = "catalog_cache_";
const STORAGE_TIMESTAMP_PREFIX = "catalog_timestamp_";

// Функции для работы с персистентным кешем
const getStorageKey = (cacheKey: string): string =>
  `${STORAGE_KEY_PREFIX}${cacheKey}`;
const getTimestampKey = (cacheKey: string): string =>
  `${STORAGE_TIMESTAMP_PREFIX}${cacheKey}`;

const loadFromStorage = (cacheKey: string): CatalogProduct[] | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(getStorageKey(cacheKey));
    const timestamp = localStorage.getItem(getTimestampKey(cacheKey));

    if (!data || !timestamp) return null;

    const timestampNum = parseInt(timestamp, 10);
    if (Date.now() - timestampNum > CACHE_DURATION) {
      // Кеш устарел, удаляем
      localStorage.removeItem(getStorageKey(cacheKey));
      localStorage.removeItem(getTimestampKey(cacheKey));
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading from storage:", error);
    return null;
  }
};

const saveToStorage = (cacheKey: string, data: CatalogProduct[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(getStorageKey(cacheKey), JSON.stringify(data));
    localStorage.setItem(getTimestampKey(cacheKey), Date.now().toString());
  } catch (error) {
    console.error("Error saving to storage:", error);
    // Если localStorage переполнен, очищаем старые записи
    try {
      const keys = Object.keys(localStorage);
      const catalogKeys = keys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));
      if (catalogKeys.length > 50) {
        // Удаляем самые старые
        catalogKeys.slice(0, 10).forEach((key) => {
          const cacheKey = key.replace(STORAGE_KEY_PREFIX, "");
          localStorage.removeItem(getStorageKey(cacheKey));
          localStorage.removeItem(getTimestampKey(cacheKey));
        });
        // Пробуем снова
        localStorage.setItem(getStorageKey(cacheKey), JSON.stringify(data));
        localStorage.setItem(getTimestampKey(cacheKey), Date.now().toString());
      }
    } catch (e) {
      console.error("Failed to clean storage:", e);
    }
  }
};

// Получаем базовый URL из переменной окружения
const getApiBaseUrl = (): string => {
  if (typeof window === "undefined") {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000"
    );
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000";
};

// Форматирование цены
const formatPrice = (priceString: string): string => {
  const price = parseFloat(priceString);
  if (isNaN(price)) {
    return "0 ₽";
  }
  return `${price.toLocaleString("ru-RU")} ₽`;
};

// Преобразование изображений - добавляем базовый URL
const processImages = (images: string[]): string[] => {
  if (!images || images.length === 0) {
    return ["/images/catalogs/placeholder.png"];
  }
  const baseUrl = getApiBaseUrl();
  return images.map((image) => {
    // Если путь уже полный URL, возвращаем как есть
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    // Иначе добавляем базовый URL
    return `${baseUrl}${image}`;
  });
};

// Преобразование данных из API в формат CatalogProduct
const transformApiProduct = (
  apiProduct: ApiProduct,
  index: number
): CatalogProduct => {
  const priceValue = parseFloat(apiProduct.price) || 0;

  // Пытаемся извлечь категорию из slug или name
  // Например, "jacket-FFA" -> "Jackets", "t-shirt_embargo" -> "T-shirts"
  let category = "";
  const slugLower = apiProduct.slug.toLowerCase();
  if (slugLower.includes("jacket") || slugLower.includes("куртка")) {
    category = "Jackets";
  } else if (slugLower.includes("t-shirt") || slugLower.includes("футболка")) {
    category = "T-shirts";
  } else if (slugLower.includes("hoodie") || slugLower.includes("худи")) {
    if (slugLower.includes("zip")) {
      category = "Zip hoodies";
    } else {
      category = "Hoodies";
    }
  } else if (slugLower.includes("pants") || slugLower.includes("штаны")) {
    category = "Pants";
  } else if (slugLower.includes("jeans") || slugLower.includes("джинсы")) {
    category = "Jeans";
  } else if (slugLower.includes("shorts") || slugLower.includes("шорты")) {
    category = "Shorts";
  }

  // Генерируем стабильный ID на основе slug
  const generateId = (slug: string): number => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      const char = slug.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  return {
    id: generateId(apiProduct.slug),
    title: apiProduct.name,
    price: formatPrice(apiProduct.price),
    priceValue,
    images: processImages(apiProduct.images),
    isNew: apiProduct.is_new,
    category: category || "All",
    color: "", // API не предоставляет цвет
    size: "", // API не предоставляет размер
    sortOrder: index,
  };
};

// Генерация ключа кеша на основе параметров
const getCacheKey = (params: CatalogApiParams): string => {
  const parts: string[] = [];
  if (params.category) {
    parts.push(`category:${params.category}`);
  }
  if (params.is_new !== undefined) {
    parts.push(`is_new:${params.is_new}`);
  }
  return parts.length > 0 ? parts.join("|") : "all";
};

// Проверка валидности кеша
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Основная функция для получения каталога
export const fetchCatalog = async (
  params: CatalogApiParams = {},
  options: { optimistic?: boolean } = {}
): Promise<CatalogProduct[]> => {
  const cacheKey = getCacheKey(params);
  const { optimistic = true } = options;

  // 1. Проверяем кеш в памяти
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }

  // 2. Проверяем персистентный кеш (оптимистичное обновление)
  if (optimistic && typeof window !== "undefined") {
    const storageData = loadFromStorage(cacheKey);
    if (storageData) {
      // Восстанавливаем в памяти
      cache.set(cacheKey, {
        data: storageData,
        timestamp: Date.now(),
      });
      return storageData;
    }
  }

  // 3. Проверяем, есть ли уже активный запрос с такими же параметрами
  const activeRequest = activeRequests.get(cacheKey);
  if (activeRequest) {
    return activeRequest;
  }

  // Создаем новый запрос
  const requestPromise = (async () => {
    try {
      // Обращаемся напрямую к бэкенду
      const apiBaseUrl = getApiBaseUrl();
      const url = new URL(`${apiBaseUrl}/api/catalog/`);

      if (params.category) {
        url.searchParams.append("category", params.category);
      }
      if (params.is_new !== undefined) {
        url.searchParams.append("is_new", params.is_new.toString());
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiProducts: ApiProduct[] = await response.json();

      // Преобразуем данные
      const catalogProducts = apiProducts.map(transformApiProduct);

      // Сохраняем в кеш (память и localStorage)
      const cacheData = {
        data: catalogProducts,
        timestamp: Date.now(),
      };
      cache.set(cacheKey, cacheData);
      saveToStorage(cacheKey, catalogProducts);

      // Удаляем из активных запросов
      activeRequests.delete(cacheKey);

      return catalogProducts;
    } catch (error) {
      // Удаляем из активных запросов при ошибке
      activeRequests.delete(cacheKey);
      console.error("Error fetching catalog:", error);
      throw error;
    }
  })();

  // Сохраняем активный запрос
  activeRequests.set(cacheKey, requestPromise);

  return requestPromise;
};

// Функция для параллельной загрузки нескольких запросов
export const fetchCatalogMultiple = async (
  paramsList: CatalogApiParams[]
): Promise<CatalogProduct[][]> => {
  const promises = paramsList.map((params) => fetchCatalog(params));
  return Promise.all(promises);
};

// Функция для очистки кеша (опционально)
export const clearCatalogCache = (): void => {
  cache.clear();
  activeRequests.clear();

  // Очищаем localStorage
  if (typeof window !== "undefined") {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (
          key.startsWith(STORAGE_KEY_PREFIX) ||
          key.startsWith(STORAGE_TIMESTAMP_PREFIX)
        ) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
};

// Функция для предзагрузки данных (prefetching)
export const prefetchCatalog = async (
  params: CatalogApiParams = {}
): Promise<void> => {
  const cacheKey = getCacheKey(params);

  // Если данные уже в кеше, не делаем запрос
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return;
  }

  // Если есть активный запрос, не создаем новый
  if (activeRequests.has(cacheKey)) {
    return;
  }

  // Запускаем запрос в фоне
  void fetchCatalog(params, { optimistic: true });
};
