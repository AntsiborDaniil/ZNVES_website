import { preload } from "react-dom";
import ProductDisplaySection, {
  BESTSELLERS_MAX_PRODUCTS,
} from "../components/ProductDisplaySection/ProductDisplaySection";
import CatalogCollage from "../components/CatalogCollage/CatalogCollage";
import {
  fetchNewInProducts,
  fetchAllCatalogProducts,
} from "../api/home/catalogApi";
import { fetchHomePage } from "../api/home/homeApi";

const HOME_COVER_PRELOAD_COUNT = 4;

/** Bestsellers — отдельный RSC-чанк, не блокирует hero. */
export async function HomeBestsellers() {
  const products = await fetchNewInProducts();
  const limited = products.slice(0, BESTSELLERS_MAX_PRODUCTS);

  // Прогрев origin covers до гидрации карточек (параллельно с next/image priority)
  for (const product of limited.slice(0, HOME_COVER_PRELOAD_COUNT)) {
    const cover = product.images[0];
    if (cover) {
      preload(cover, { as: "image" });
    }
  }

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
      products={catalogProducts.slice(0, 4)}
      featuredImage={homePage.catalog_featured_image}
    />
  );
}
