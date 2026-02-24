// Типы для API ответов

export type ApiProductColor = {
  slug: string;
  value: string;
  hex: string;
};

export type ApiProductSize = {
  slug: string;
  value: string;
};

/** Вариант товара: конкретная комбинация цвет + доступные размеры для этого цвета */
export type ApiProductVariant = {
  color_slug: string;
  size_slugs: string[];
};

export type ApiProduct = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  images: string[];
  colors?: ApiProductColor[];
  sizes?: ApiProductSize[];
  /** Реальные комбинации цвет+размер (для строгой фильтрации). Если есть — фильтр «красный + S» покажет только товары, у которых у красного есть размер S */
  variants?: ApiProductVariant[];
};

export type CatalogApiParams = {
  category?: string;
  is_new?: boolean;
};

// Реэкспорт типов для детальной страницы товара (ApiProductSize и ApiProductColor уже объявлены выше)
export type { ApiProductDetail, ApiWarehouseItem } from "../api/product/productApi";

