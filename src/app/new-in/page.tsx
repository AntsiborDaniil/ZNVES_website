import CatalogPage from "../../components/CatalogPage/CatalogPage";
import {
  CATALOG_PAGE_SIZE,
  fetchCatalogCategories,
  fetchCatalogProductsPage,
  resolveCategorySlug,
} from "../../api/catalog/catalogApi";

type NewInRouteProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function NewIn({ searchParams }: NewInRouteProps) {
  const params = await searchParams;
  const raw = params.category;
  const categoryParam = Array.isArray(raw) ? raw[0] : raw;
  const categorySlug =
    categoryParam == null
      ? undefined
      : resolveCategorySlug(categoryParam) ?? undefined;

  const [firstPage, initialCategories] = await Promise.all([
    fetchCatalogProductsPage({
      is_new: true,
      category: categorySlug,
      page: 1,
      page_size: CATALOG_PAGE_SIZE,
    }),
    fetchCatalogCategories(),
  ]);

  return (
    <CatalogPage
      title="NEW IN"
      initialProducts={firstPage.products}
      initialCategories={initialCategories}
      initialCategoryParam={categoryParam ?? null}
      initialHasMore={firstPage.hasMore}
    />
  );
}
