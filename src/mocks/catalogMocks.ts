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

export const getMockCatalogCategories = (): ApiCatalogCategory[] => MOCK_CATALOG_CATEGORIES;

export const getMockCatalogColors = (): ApiCatalogColor[] => MOCK_CATALOG_COLORS;

export const getMockCatalogSizes = (): ApiCatalogSize[] => MOCK_CATALOG_SIZES;

export const getMockProductDetailBySlug = (slug: string): ApiProductDetail | null =>
  getMockProductDetail(slug);
