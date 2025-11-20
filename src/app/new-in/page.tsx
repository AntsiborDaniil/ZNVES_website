import CatalogPage from "../../components/CatalogPage/CatalogPage";
import { fetchCatalogServer } from "../../services/catalogService.server";
import CatalogPageClient from "../../components/CatalogPage/CatalogPageClient";

// Server Component - загружает данные на сервере
export default async function NewIn() {
  let products;

  try {
    products = await fetchCatalogServer({ is_new: true });
  } catch (error) {
    console.error("Error loading new in products:", error);
    products = [];
  }

  return <CatalogPageClient title="NEW IN" initialProducts={products} />;
}
