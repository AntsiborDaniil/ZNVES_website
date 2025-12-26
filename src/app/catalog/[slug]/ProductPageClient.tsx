"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import { fetchProductBySlug } from "../../../api/product/productApi";
import type { ProductDetail } from "../../../types/products";

type ProductPageClientProps = {
  slug: string;
};

const ProductPageClient = ({ slug }: ProductPageClientProps) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const productData = await fetchProductBySlug(slug);
        if (!productData) {
          notFound();
        }
        setProduct(productData);
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
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        Загрузка...
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
};

export default ProductPageClient;

