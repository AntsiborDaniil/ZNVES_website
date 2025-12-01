import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  fetchProductBySlug,
  type ApiProductDetail,
} from "../services/catalogService";
import type { ProductDetail } from "../types/products";

// Функция для преобразования API продукта в ProductDetail
const transformApiProductDetailToProductDetail = (
  apiProduct: ApiProductDetail
): ProductDetail => {
  // Преобразуем slug в числовой id для совместимости с существующим кодом
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

  // Преобразуем размеры
  const availableSizes = apiProduct.sizes.map((size) => size.slug);

  // Преобразуем цвета
  const availableColors: Array<{ label: string; value: string; hex?: string }> =
    apiProduct.colors.map((color) => ({
      label: color.value,
      value: color.slug,
      hex: color.hex,
    }));

  // Определяем доступные размеры и цвета на основе warehouse_items
  const availableSizeColorCombinations = apiProduct.warehouse_items
    .filter((item) => item.quantity > 0)
    .map((item) => ({ size: item.size, color: item.color }));

  // Выбираем размер и цвет по умолчанию из доступных комбинаций
  const defaultSizeColor = availableSizeColorCombinations[0];
  const defaultSize = defaultSizeColor?.size || availableSizes[0] || "";
  const defaultColor =
    defaultSizeColor?.color || availableColors[0]?.value || "";

  // Создаем секции для аккордеона (можно расширить позже)
  const sections: Array<{ id: string; title: string; content: string }> = [
    {
      id: "description",
      title: "Описание",
      content: apiProduct.description || "Описание товара",
    },
  ];

  return {
    id: numericId,
    slug: apiProduct.slug,
    title: apiProduct.name,
    price: formattedPrice,
    priceValue: priceValue,
    images: fullImageUrls,
    isNew: apiProduct.is_new,
    category: "", // API не возвращает категорию
    color: defaultColor,
    size: defaultSize,
    sortOrder: 0,
    sku: apiProduct.slug, // Используем slug как SKU
    defaultSize: defaultSize,
    availableSizes: availableSizes,
    availableColors: availableColors,
    sections: sections,
  };
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    select: (data: ApiProductDetail) =>
      transformApiProductDetailToProductDetail(data),
    enabled: !!slug, // Запрос выполняется только если slug есть
    placeholderData: keepPreviousData, // Показываем предыдущие данные во время загрузки
  });
};
