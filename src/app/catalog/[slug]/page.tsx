import ProductPageClient from "./ProductPageClient";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Для статического экспорта требуется generateStaticParams
// Пытаемся получить список товаров для генерации страниц
// Если API недоступен на этапе сборки, возвращаем пустой массив
export const generateStaticParams = async () => {
  try {
    // Пытаемся получить все товары из API для генерации страниц
    const API_BASE_URL = "http://158.160.115.103:8000/api/catalog/";
    const response = await fetch(`${API_BASE_URL}`, {
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
    console.warn("Could not fetch products for static generation:", error);
  }

  // Возвращаем пустой массив, если не удалось получить товары
  return [];
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  return <ProductPageClient slug={slug} />;
};

export default ProductPage;
