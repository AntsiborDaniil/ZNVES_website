/**
 * Промокоды только для `npm run dev:mock` (MSW).
 * В `npm run dev` / production запросы идут на реальный `/api/discounts/promo/`.
 */
export type MockPromoCode = {
  code: string;
  discount: string;
  description: string;
};

export const MOCK_PROMO_CODES: Record<string, MockPromoCode> = {
  SALE10: {
    code: "SALE10",
    discount: "499.00",
    description: "Скидка 499 ₽",
  },
  WELCOME: {
    code: "WELCOME",
    discount: "300.00",
    description: "Приветственная скидка 300 ₽",
  },
  ZNVES500: {
    code: "ZNVES500",
    discount: "500.00",
    description: "Скидка 500 ₽",
  },
  BIG1000: {
    code: "BIG1000",
    discount: "1000.00",
    description: "Скидка 1000 ₽",
  },
};

/** Список кодов для подсказок / документации */
export const MOCK_PROMO_CODE_LIST = Object.values(MOCK_PROMO_CODES);

export const getMockPromoDiscount = (rawCode: string): string | null => {
  const code = rawCode.trim().toUpperCase();
  return MOCK_PROMO_CODES[code]?.discount ?? null;
};
