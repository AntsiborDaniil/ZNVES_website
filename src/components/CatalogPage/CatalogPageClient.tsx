"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import CatalogPage from "./CatalogPage";
import { fetchCatalog, prefetchCatalog } from "../../services/catalogService";
import type { CatalogProduct } from "../../types/products";

type CatalogPageClientProps = {
  title: string;
  initialProducts: CatalogProduct[];
};

const CatalogPageClient = ({
  title,
  initialProducts,
}: CatalogPageClientProps) => {
  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category");

  // Обновляем продукты при изменении категории (клиентская навигация)
  useEffect(() => {
    const updateProducts = async () => {
      const params: { category?: string } = {};
      if (
        categoryParam &&
        categoryParam !== "All" &&
        categoryParam.toLowerCase() !== "all"
      ) {
        params.category = categoryParam;
      }

      // Используем оптимистичное обновление - показываем кеш сразу
      startTransition(async () => {
        try {
          const fetchedProducts = await fetchCatalog(params, {
            optimistic: true,
          });
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error loading products:", error);
        }
      });
    };

    // Проверяем, изменилась ли категория
    const currentCategory = categoryParam || "All";
    const initialCategory = initialProducts[0]?.category || "All";

    // Если категория изменилась, обновляем данные
    if (currentCategory !== initialCategory) {
      updateProducts();
    }
  }, [categoryParam, initialProducts]);

  // Prefetch при наведении на ссылки категорий
  useEffect(() => {
    const prefetchCategories = async () => {
      const categories = [
        "Pants",
        "Jeans",
        "T-shirts",
        "Zip hoodies",
        "Jackets",
        "Hoodies",
        "Shorts",
      ];

      // Предзагружаем данные для всех категорий в фоне
      categories.forEach((category) => {
        void prefetchCatalog({ category: category.toLowerCase() });
      });
    };

    // Запускаем prefetch через небольшую задержку, чтобы не блокировать основной рендер
    const timeoutId = setTimeout(prefetchCategories, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <CatalogPage title={title} products={products} isLoading={isPending} />
  );
};

export default CatalogPageClient;
