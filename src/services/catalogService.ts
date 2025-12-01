export type ApiProduct = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  images: string[];
};

export type CatalogApiParams = {
  category?: string;
  is_new?: boolean;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000";

export const fetchCatalogProducts = async (
  params?: CatalogApiParams
): Promise<ApiProduct[]> => {
  const url = new URL(`${API_BASE_URL}/api/catalog/`);

  if (params?.category) {
    // Убеждаемся, что категория в правильном формате (единственное число, нижний регистр)
    const normalizedCategory = params.category.toLowerCase().trim();
    url.searchParams.append("category", normalizedCategory);
  }

  if (params?.is_new !== undefined) {
    url.searchParams.append("is_new", params.is_new.toString());
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch catalog products: ${response.statusText}`);
  }

  const data: ApiProduct[] = await response.json();
  return data;
};

export type ApiProductDetail = {
  slug: string;
  name: string;
  price: string;
  description: string;
  is_new: boolean;
  images: string[];
  sizes: Array<{
    slug: string;
    value: string;
  }>;
  colors: Array<{
    slug: string;
    value: string;
    hex: string;
  }>;
  warehouse_items: Array<{
    id: string;
    color: string;
    size: string;
    quantity: number;
  }>;
};

export const fetchProductBySlug = async (
  slug: string
): Promise<ApiProductDetail> => {
  // Формируем URL правильно - используем базовый URL и добавляем путь
  const cleanSlug = slug.trim();
  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  const path = `/api/catalog/${cleanSlug}/`;
  const url = new URL(path, baseUrl);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const data: ApiProductDetail = await response.json();
  return data;
};
