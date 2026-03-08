"use client";

import { useEffect } from "react";
import { preloadCatalogFilters } from "../../api/catalog/catalogApi";

/** При монтировании предзагружает категории, цвета и размеры в кеш — на странице каталога фильтры появятся без задержки. */
export default function PreloadCatalogFilters() {
  useEffect(() => {
    preloadCatalogFilters();
  }, []);
  return null;
}
