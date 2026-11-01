import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../apiBase";
import { getMockPromoDiscount } from "../data/promos";

export const createDiscountHandlers = () => {
  const base = getMockApiBase();

  return [
    http.post(`${base}/api/discounts/promo/:code/`, async ({ params, request }) => {
      const rawCode = String(params.code ?? "");
      const code = rawCode.trim().toUpperCase();
      const body = (await request.json().catch(() => ({}))) as {
        previous_promo_code?: string | null;
        order_total?: string;
        cart_items?: unknown[];
      };

      const discount = getMockPromoDiscount(code);
      if (!discount) {
        return HttpResponse.json(
          {
            promo_code: null,
            discount: "0.00",
            error: "Промокод не найден",
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        promo_code: code,
        discount,
        prev_promo_code: body.previous_promo_code ?? null,
      });
    }),
  ];
};
