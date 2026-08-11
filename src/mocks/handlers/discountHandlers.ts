import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../config";

const MOCK_PROMO_CODES: Record<string, string> = {
  SALE10: "499.00",
  WELCOME: "300.00",
};

export const createDiscountHandlers = () => {
  const base = getMockApiBase();

  return [
    http.post(`${base}/api/discounts/promo/:code/`, async ({ params, request }) => {
      const code = String(params.code ?? "")
        .trim()
        .toUpperCase();
      const body = (await request.json().catch(() => ({}))) as {
        previous_promo_code?: string | null;
      };

      const discount = MOCK_PROMO_CODES[code];
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
