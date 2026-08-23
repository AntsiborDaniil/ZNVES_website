import { resolveCategorySlug } from "../api/catalog/catalogApi";

export type ProductNavFrom = "home" | "catalog" | "new-in";

type BuildProductHrefOptions = {
  from?: ProductNavFrom;
  category?: string | null;
};

/** Ссылка на карточку товара с параметрами для хлебных крошек */
export const buildProductHref = (
  slug: string | number,
  options: BuildProductHrefOptions = {}
): string => {
  const path = `/catalog/${slug}`;
  const params = new URLSearchParams();

  if (options.from) {
    params.set("from", options.from);
  }

  const category = options.category?.trim();
  if (category) {
    const slug = resolveCategorySlug(category);
    if (slug) {
      params.set("category", slug);
    }
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
};

export const formatBreadcrumbLabel = (value: string): string =>
  decodeURIComponent(value).replace(/-/g, " ").trim().toUpperCase();

export const getBreadcrumbOrigin = (
  from: string | null
): { label: string; href: string } => {
  switch (from) {
    case "home":
      return { label: "Главная", href: "/" };
    case "new-in":
      return { label: "Новинки", href: "/new-in" };
    case "catalog":
    default:
      return { label: "Каталог", href: "/catalog" };
  }
};
