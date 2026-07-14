import type { MetadataRoute } from "next";
import { getSiteUrl, ROBOTS_DISALLOW_PATHS } from "../lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...ROBOTS_DISALLOW_PATHS],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
