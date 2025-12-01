"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import { useProductBySlug } from "../../../hooks/useProductBySlug";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductPage = ({ params }: ProductPageProps) => {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      setSlug(id);
    });
  }, [params]);

  const { data: product, isError, isLoading } = useProductBySlug(slug);

  if (!slug) {
    return null;
  }

  if (isError) {
    notFound();
  }

  if (isLoading || !product) {
    return null;
  }

  return <ProductPageView product={product} />;
};

export default ProductPage;
