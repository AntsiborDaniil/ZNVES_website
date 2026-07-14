import type { MetadataRoute } from "next";
import { API_BASE_URL } from "../lib/apiConfig";
import { getSiteUrl, STATIC_SITEMAP_PATHS } from "../lib/siteConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_PATHS.map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })
  );

  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const response = await fetch(`${API_BASE_URL}/api/catalog/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
    });

    if (response.ok) {
      const products: Array<{ slug?: string }> = await response.json();
      productEntries = products
        .filter((product): product is { slug: string } => Boolean(product.slug))
        .map((product) => ({
          url: `${siteUrl}/catalog/${product.slug}`,
          lastModified: new Date(),
        }));
    }
  } catch {
    // API может быть недоступен на этапе сборки
  }

  return [...staticEntries, ...productEntries];
}
