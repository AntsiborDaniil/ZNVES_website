import CatalogPage from "../../components/CatalogPage/CatalogPage";
import {
  fetchCatalogCategories,
  resolveCategorySlug,
} from "../../api/catalog/catalogApi";
import { fetchNewInProducts } from "../../api/new-in/newInApi";

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

  const [initialProducts, initialCategories] = await Promise.all([
    fetchNewInProducts(categorySlug),
    fetchCatalogCategories(),
  ]);

  return (
    <CatalogPage
      title="NEW IN"
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialCategoryParam={categoryParam ?? null}
    />
  );
}
