import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";
import { API_BASE_URL } from "../../../lib/apiConfig";
import {
  fetchProductBySlug,
  fetchProductWithWarehouse,
} from "../../../api/product/productApi";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await fetchProductBySlug(slug);
    if (!product) {
      return { title: "Товар не найден" };
    }

    const descriptionSection = product.sections.find(
      (section) => section.id === "description"
    );
    const rawDescription = descriptionSection?.content ?? product.title;
    const description = rawDescription.replace(/\s+/g, " ").trim().slice(0, 160);
    const image = product.images[0];

    return {
      title: product.title,
      description,
      openGraph: {
        title: product.title,
        description,
        ...(image ? { images: [{ url: image, alt: product.title }] } : {}),
      },
    };
  } catch {
    return { title: "Товар" };
  }
}

export const generateStaticParams = async () => {
  try {
    const catalogUrl = `${API_BASE_URL}/api/catalog/`;
    const response = await fetch(catalogUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (response.ok) {
      const products = await response.json();
      if (!Array.isArray(products)) return [];
      return products.map((product: { slug: string }) => ({
        slug: product.slug,
      }));
    }
  } catch {
    // build без API — пустой список, страницы по запросу
  }

  return [];
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  // SSR: товар в HTML сразу — на мобилке нет пустого «Загрузка…» до client fetch
  const data = await fetchProductWithWarehouse(slug);

  if (!data) {
    notFound();
  }

  return (
    <ProductPageClient
      slug={slug}
      initialProduct={data.product}
      initialWarehouseItems={data.warehouseItems}
    />
  );
};

export default ProductPage;
