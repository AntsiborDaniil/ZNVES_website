import CatalogPage from "../../components/CatalogPage/CatalogPage";
import {
  CATALOG_PAGE_SIZE,
  fetchCatalogCategories,
  fetchCatalogProductsPageByCategory,
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

  const [firstPage, initialCategories] = await Promise.all([
    fetchCatalogProductsPageByCategory(categorySlug, 1, CATALOG_PAGE_SIZE),
    fetchCatalogCategories(),
  ]);

  return (
    <CatalogPage
      title="CATALOG"
      initialProducts={firstPage.products}
      initialCategories={initialCategories}
      initialCategoryParam={categoryParam ?? null}
      initialHasMore={firstPage.hasMore}
    />
  );
}
