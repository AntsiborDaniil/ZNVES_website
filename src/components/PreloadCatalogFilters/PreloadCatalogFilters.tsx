"use client";

import { useGetCategoriesQuery, useGetColorsQuery, useGetSizesQuery } from "../../store/api";

/** Прогреваем общий RTK-кеш фильтров каталога. */
export default function PreloadCatalogFilters() {
  useGetCategoriesQuery();
  useGetColorsQuery();
  useGetSizesQuery();
  return null;
}
