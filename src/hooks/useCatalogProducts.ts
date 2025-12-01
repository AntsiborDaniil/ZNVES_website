import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  fetchCatalogProducts,
  type ApiProduct,
} from "../services/catalogService";
import type { CatalogProduct } from "../types/products";
import type { CatalogApiParams } from "../services/catalogService";

// Функция для преобразования API продукта в CatalogProduct
const transformApiProductToCatalogProduct = (
  apiProduct: ApiProduct,
  index: number
): CatalogProduct => {
  // Преобразуем slug в числовой id для совместимости с существующим кодом
  // Используем хеш от slug для получения стабильного числового id
  const numericId = Math.abs(
    apiProduct.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  // Форматируем цену (без копеек)
  const priceValue = parseFloat(apiProduct.price);
  const formattedPrice = `${Math.round(priceValue).toLocaleString("ru-RU")} ₽`;

  // Преобразуем относительные пути изображений в полные URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000";
  const fullImageUrls = apiProduct.images.map((img) => {
    if (img.startsWith("http")) {
      return img;
    }
    return `${API_BASE_URL}${img}`;
  });

  return {
    id: numericId,
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue: priceValue,
    images: fullImageUrls,
    isNew: apiProduct.is_new,
    category: "", // API не возвращает категорию, нужно будет добавить позже
    color: "", // API не возвращает цвет, нужно будет добавить позже
    size: "", // API не возвращает размер, нужно будет добавить позже
    sortOrder: index,
  };
};

export const useCatalogProducts = (params?: CatalogApiParams) => {
  return useQuery({
    queryKey: ["catalogProducts", params],
    queryFn: () => fetchCatalogProducts(params),
    select: (data: ApiProduct[]) =>
      data.map((product, index) =>
        transformApiProductToCatalogProduct(product, index)
      ),
    placeholderData: keepPreviousData, // Показываем предыдущие данные во время загрузки
  });
};
