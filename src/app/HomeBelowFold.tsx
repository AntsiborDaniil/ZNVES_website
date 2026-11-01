import ProductDisplaySection, {
  BESTSELLERS_MAX_PRODUCTS,
} from "../components/ProductDisplaySection/ProductDisplaySection";
import CatalogCollage from "../components/CatalogCollage/CatalogCollage";
import {
  fetchNewInProducts,
  fetchAllCatalogProducts,
  toCoverOnlyProducts,
} from "../api/home/catalogApi";
import { fetchHomePage } from "../api/home/homeApi";

/** Bestsellers — отдельный RSC-чанк, не блокирует hero. */
export async function HomeBestsellers() {
  const products = await fetchNewInProducts();
  const limited = toCoverOnlyProducts(
    products.slice(0, BESTSELLERS_MAX_PRODUCTS)
  );

  return (
    <ProductDisplaySection
      title="Bestsellers"
      showShopNow
      isBestseller
      maxProducts={BESTSELLERS_MAX_PRODUCTS}
      navFrom="home"
      initialProducts={limited}
    />
  );
}

/** Catalog collage — только 4 карточки, параллельно с bestsellers. */
export async function HomeCatalogCollage() {
  const [homePage, catalogProducts] = await Promise.all([
    fetchHomePage(),
    fetchAllCatalogProducts(),
  ]);

  return (
    <CatalogCollage
      products={toCoverOnlyProducts(catalogProducts.slice(0, 4))}
      featuredImage={homePage.catalog_featured_image}
    />
  );
}
