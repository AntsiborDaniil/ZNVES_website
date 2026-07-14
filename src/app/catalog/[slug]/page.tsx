import type { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";
import { API_BASE_URL } from "../../../lib/apiConfig";
import { fetchProductBySlug } from "../../../api/product/productApi";

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

// Для статического экспорта требуется generateStaticParams
// Пытаемся получить список товаров для генерации страниц
// Если API недоступен на этапе сборки, возвращаем пустой массив
export const generateStaticParams = async () => {
  try {
    // Пытаемся получить все товары из API для генерации страниц
    const catalogUrl = `${API_BASE_URL}/api/catalog/`;
    const response = await fetch(catalogUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // На этапе сборки используем кеш
      cache: "force-cache",
    });

    if (response.ok) {
      const products = await response.json();
      // Возвращаем slug всех товаров
      return products.map((product: { slug: string }) => ({
        slug: product.slug,
      }));
    }
  } catch (error) {
    // Если API недоступен на этапе сборки, возвращаем пустой массив
    // Страницы будут обрабатываться на клиенте через клиентскую навигацию
  }

  // Возвращаем пустой массив, если не удалось получить товары
  return [];
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  return <ProductPageClient slug={slug} />;
};

export default ProductPage;
