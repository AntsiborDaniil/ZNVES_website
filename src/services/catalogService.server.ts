import type { CatalogProduct } from "../types/products";

// Типы для API ответа (совпадают с /api/catalog)
type ApiProduct = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  images: string[];
  colors?: { slug: string; value: string; hex: string }[];
  sizes?: { slug: string; value: string }[];
  variants?: { color_slug: string; size_slugs: string[] }[];
};

type CatalogApiParams = {
  category?: string;
  is_new?: boolean;
};

import { API_BASE_URL } from "../lib/apiConfig";

const getApiBaseUrl = (): string => API_BASE_URL;

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
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const colors = apiProduct.colors ?? [];
  const sizes = apiProduct.sizes ?? [];
  const defaultColor = colors[0]?.slug ?? "";
  const defaultSize = sizes[0]?.slug ?? "";
  const variants = apiProduct.variants ?? undefined;

  return {
    id: generateId(apiProduct.slug),
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formatPrice(apiProduct.price),
    priceValue,
    images: processImages(apiProduct.images),
    isNew: apiProduct.is_new,
    category: category || "All",
    color: defaultColor,
    size: defaultSize,
    colors: colors.length > 0 ? colors : undefined,
    sizes: sizes.length > 0 ? sizes : undefined,
    variants,
    sortOrder: index,
  };
};

// Серверная функция для получения каталога (для SSR)
export async function fetchCatalogServer(
  params: CatalogApiParams = {}
): Promise<CatalogProduct[]> {
  const API_BASE_URL = getApiBaseUrl();
  const url = new URL(`${API_BASE_URL}/api/catalog/`);

  if (params.category) {
    url.searchParams.append("category", params.category);
  }
  if (params.is_new !== undefined) {
    url.searchParams.append("is_new", params.is_new.toString());
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // На сервере можно использовать кеширование Next.js
      next: { revalidate: 300 }, // Revalidate каждые 5 минут
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiProducts: ApiProduct[] = await response.json();

    // Преобразуем данные
    const catalogProducts = apiProducts.map(transformApiProduct);

    return catalogProducts;
  } catch (error) {
    console.error("Error fetching catalog on server:", error);
    throw error;
  }
}

// Функция для получения продукта по ID из API
export async function fetchProductByIdServer(
  id: number
): Promise<CatalogProduct | null> {
  try {
    // Получаем все продукты и ищем нужный по ID
    const allProducts = await fetchCatalogServer({});
    const product = allProducts.find((p) => p.id === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching product by id on server:", error);
    return null;
  }
}
