import { Suspense } from "react";
import CatalogPageClient from "../../components/CatalogPage/CatalogPageClient";
import { fetchCatalogServer } from "../../services/catalogService.server";

// Server Component - загружает данные на сервере
async function CatalogContent({ category }: { category: string | null }) {
  const params: { category?: string } = {};
  if (category && category !== "All" && category.toLowerCase() !== "all") {
    params.category = category;
  }

  let products;
  try {
    products = await fetchCatalogServer(params);
  } catch (error) {
    console.error("Error loading catalog products:", error);
    products = [];
  }

  return <CatalogPageClient title="CATALOG" initialProducts={products} />;
}

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || null;

  return (
    <Suspense
      fallback={
        <div style={{ padding: "2rem", textAlign: "center" }}>Загрузка...</div>
      }
    >
      <CatalogContent category={category} />
    </Suspense>
  );
}
