import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../config";
import {
  filterMockCatalogProducts,
  getMockProductDetail,
  MOCK_CATALOG_CATEGORIES,
  MOCK_CATALOG_COLORS,
  MOCK_CATALOG_SIZES,
} from "../data/catalog";

export const createCatalogHandlers = () => {
  const base = getMockApiBase();

  return [
    http.get(`${base}/api/catalog/`, ({ request }) => {
      const url = new URL(request.url);
      const category = url.searchParams.get("category");
      const isNewParam = url.searchParams.get("is_new");
      const is_new =
        isNewParam === "true" ? true : isNewParam === "false" ? false : null;

      return HttpResponse.json(
        filterMockCatalogProducts({ category, is_new })
      );
    }),

    http.get(`${base}/api/catalog/categories/`, () =>
      HttpResponse.json(MOCK_CATALOG_CATEGORIES)
    ),

    http.get(`${base}/api/catalog/colors/`, () =>
      HttpResponse.json(MOCK_CATALOG_COLORS)
    ),

    http.get(`${base}/api/catalog/sizes/`, () =>
      HttpResponse.json(MOCK_CATALOG_SIZES)
    ),

    http.get(`${base}/api/catalog/:slug/:colorSlug/`, ({ params }) => {
      const slug = String(params.slug);
      const detail = getMockProductDetail(slug);
      if (!detail) {
        return HttpResponse.json({ detail: "Not found" }, { status: 404 });
      }
      return HttpResponse.json(detail.images);
    }),

    http.get(`${base}/api/catalog/:slug/`, ({ params }) => {
      const slug = String(params.slug);
      const detail = getMockProductDetail(slug);
      if (!detail) {
        return HttpResponse.json({ detail: "Not found" }, { status: 404 });
      }
      return HttpResponse.json(detail);
    }),
  ];
};
