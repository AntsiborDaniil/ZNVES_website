"use client";

import CatalogPage from "../../components/CatalogPage/CatalogPage";
import { useCatalogProducts } from "../../hooks/useCatalogProducts";
import { useSearchParams } from "next/navigation";

const Catalog = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category");

  // Декодируем категорию из URL и нормализуем (убираем лишние пробелы, приводим к нижнему регистру)
  const normalizedCategory = categoryParam
    ? decodeURIComponent(categoryParam).toLowerCase().trim()
    : undefined;

  const { data: products = [] } = useCatalogProducts({
    category: normalizedCategory,
  });

  return <CatalogPage title="CATALOG" products={products} />;
};

export default Catalog;
