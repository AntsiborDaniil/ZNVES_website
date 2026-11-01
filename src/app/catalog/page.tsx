import CatalogPage from "../../components/CatalogPage/CatalogPage";
import {
  fetchCatalogCategories,
  fetchCatalogProductsByCategory,
  resolveCategorySlug,
} from "../../api/catalog/catalogApi";

type CatalogRouteProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function Catalog({ searchParams }: CatalogRouteProps) {
  const params = await searchParams;
  const raw = params.category;
  const categoryParam = Array.isArray(raw) ? raw[0] : raw;
  const categorySlug =
    categoryParam == null
      ? undefined
      : resolveCategorySlug(categoryParam) ?? undefined;

  const [initialProducts, initialCategories] = await Promise.all([
    fetchCatalogProductsByCategory(categorySlug),
    fetchCatalogCategories(),
  ]);

  return (
    <CatalogPage
      title="CATALOG"
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialCategoryParam={categoryParam ?? null}
    />
  );
}
