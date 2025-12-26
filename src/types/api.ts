// Типы для API ответов

export type ApiProduct = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  images: string[];
};

export type CatalogApiParams = {
  category?: string;
  is_new?: boolean;
};

