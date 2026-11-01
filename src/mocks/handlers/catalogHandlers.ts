import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../apiBase";
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
      const pageParam = url.searchParams.get("page");
      const pageSizeParam = url.searchParams.get("page_size");
      const list = filterMockCatalogProducts({ category, is_new });

      // С page/page_size — DRF-пейджинг (как будет на проде при большой выдаче)
      if (pageParam != null || pageSizeParam != null) {
        const page = Math.max(1, Number(pageParam) || 1);
        const pageSize = Math.max(1, Number(pageSizeParam) || 12);
        const start = (page - 1) * pageSize;
        const results = list.slice(start, start + pageSize);
        const hasNext = start + pageSize < list.length;
        return HttpResponse.json({
          count: list.length,
          next: hasNext ? `${url.pathname}?page=${page + 1}&page_size=${pageSize}` : null,
          previous:
            page > 1 ? `${url.pathname}?page=${page - 1}&page_size=${pageSize}` : null,
          results,
        });
      }

      return HttpResponse.json(list);
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
