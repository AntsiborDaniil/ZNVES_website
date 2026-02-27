"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import LoadingStub from "../../../components/LoadingStub/LoadingStub";
import { fetchProductWithWarehouse } from "../../../api/product/productApi";
import type { ProductDetail } from "../../../types/products";
import type { ApiWarehouseItem } from "../../../api/product/productApi";

type ProductPageClientProps = {
  slug: string;
};

const ProductPageClient = ({ slug }: ProductPageClientProps) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [warehouseItems, setWarehouseItems] = useState<ApiWarehouseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductWithWarehouse(slug);
        if (!data) {
          notFound();
        }
        setProduct(data.product);
        setWarehouseItems(data.warehouseItems);
      } catch (error) {
        console.error("Error loading product:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (isLoading) {
    return <LoadingStub label="Загрузка товара…" />;
  }

  if (!product) {
    notFound();
  }

  return (
    <ProductPageView product={product} warehouseItems={warehouseItems} />
  );
};

export default ProductPageClient;

