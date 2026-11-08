"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  type ApiCatalogCategory,
} from "../api/catalog/catalogApi";

import { useLazyGetCategoriesQuery } from "../store/api";

type CatalogCategoriesContextValue = {
  categories: ApiCatalogCategory[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const CatalogCategoriesContext =
  createContext<CatalogCategoriesContextValue | null>(null);

type CatalogCategoriesProviderProps = {
  children: ReactNode;
  initialCategories?: ApiCatalogCategory[];
};

export const CatalogCategoriesProvider = ({
  children,
  initialCategories = [],
}: CatalogCategoriesProviderProps) => {
  const [loadCategories] = useLazyGetCategoriesQuery();
  const [categories, setCategories] = useState<ApiCatalogCategory[]>(
    initialCategories
  );
  const [isLoading, setIsLoading] = useState(initialCategories.length === 0);
  const [error, setError] = useState<string | null>(null);
  const categoriesRef = useRef(categories);
  categoriesRef.current = categories;

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const next = await loadCategories(undefined, false).unwrap();
      if (next.length > 0) {
        setCategories(next);
      } else if (categoriesRef.current.length === 0) {
        setError("Не удалось загрузить категории");
      }
    } catch {
      if (categoriesRef.current.length === 0) {
        setError("Не удалось загрузить категории");
      }
    } finally {
      setIsLoading(false);
    }
  }, [loadCategories]);

  useEffect(() => {
    if (initialCategories.length > 0) return;
    void refresh();
  }, [initialCategories.length, refresh]);

  const value = useMemo(
    () => ({
      categories,
      isLoading,
      error,
      refresh,
    }),
    [categories, isLoading, error, refresh]
  );

  return (
    <CatalogCategoriesContext.Provider value={value}>
      {children}
    </CatalogCategoriesContext.Provider>
  );
};

export const useCatalogCategories = (): CatalogCategoriesContextValue => {
  const ctx = useContext(CatalogCategoriesContext);
  if (!ctx) {
    throw new Error(
      "useCatalogCategories must be used within CatalogCategoriesProvider"
    );
  }
  return ctx;
};
