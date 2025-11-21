import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import {
  catalogProducts,
  newInProducts,
  getProductById,
} from "../../../data/products";
import { fetchProductByIdServer } from "../../../services/catalogService.server";
import type { ProductDetail } from "../../../types/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = true;

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  // Сначала пытаемся найти в статических данных (для обратной совместимости)
  let product: ProductDetail | undefined = getProductById(productId);

  // Если не найдено в статических данных, получаем из API
  if (!product) {
    const apiProduct = await fetchProductByIdServer(productId);
    if (apiProduct) {
      // Преобразуем CatalogProduct в ProductDetail с дефолтными значениями
      product = {
        ...apiProduct,
        sku: `API-${apiProduct.id}`,
        defaultSize: "m",
        availableSizes: ["xxs", "xs", "s", "m", "l", "xl"],
        availableColors: [],
        sections: [
          {
            id: "description",
            title: "Описание",
            content: apiProduct.title,
          },
        ],
      };
    }
  }

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
};

export default ProductPage;
