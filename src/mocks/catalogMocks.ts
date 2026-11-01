import type { ApiProduct } from "../types/api";
import type { ApiProductDetail } from "../api/product/productApi";
import type {
  ApiCatalogCategory,
  ApiCatalogColor,
  ApiCatalogSize,
} from "../api/catalog/catalogApi";
import type { CatalogApiParams } from "../types/api";
import {
  filterMockCatalogProducts,
  getMockProductDetail,
  MOCK_CATALOG_CATEGORIES,
  MOCK_CATALOG_COLORS,
  MOCK_CATALOG_SIZES,
} from "./data/catalog";

export const getMockCatalogList = (params: CatalogApiParams = {}): ApiProduct[] =>
  filterMockCatalogProducts({
    category: params.category ?? null,
    is_new: params.is_new ?? null,
  });

/** DRF-подобная страница для infinite scroll в dev:mock / e2e. */
export const getMockCatalogPage = (
  params: CatalogApiParams = {}
): {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProduct[];
} => {
  const list = getMockCatalogList(params);
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.page_size ?? 12);
  const start = (page - 1) * pageSize;
  const results = list.slice(start, start + pageSize);
  const hasNext = start + pageSize < list.length;

  return {
    count: list.length,
    next: hasNext ? `mock://catalog?page=${page + 1}` : null,
    previous: page > 1 ? `mock://catalog?page=${page - 1}` : null,
    results,
  };
};

export const getMockCatalogCategories = (): ApiCatalogCategory[] => MOCK_CATALOG_CATEGORIES;

export const getMockCatalogColors = (): ApiCatalogColor[] => MOCK_CATALOG_COLORS;

export const getMockCatalogSizes = (): ApiCatalogSize[] => MOCK_CATALOG_SIZES;

export const getMockProductDetailBySlug = (slug: string): ApiProductDetail | null =>
  getMockProductDetail(slug);
