/**
 * Barrel только для тестов/e2e.
 * Не импортировать из клиентских API/компонентов — HMR Turbopack ломается
 * на толстых re-export графах (`env`/`config`).
 */
export { MOCK_AUTH_CODE, MOCK_CHECKOUT_AUTOFILL, MOCK_DEV_USER } from "./data/account";
export {
  MOCK_ORDER_STATUSES,
  MOCK_INITIAL_ORDERS,
} from "./data/orders";
export {
  MOCK_PROMO_CODES,
  MOCK_PROMO_CODE_LIST,
  getMockPromoDiscount,
} from "./data/promos";
export { getMockApiBase } from "./apiBase";

import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "./data/account";
import { MOCK_PROMO_CODE_LIST, MOCK_PROMO_CODES } from "./data/promos";

export const getMockModeBanner = (): string => {
  const promos = MOCK_PROMO_CODE_LIST.map(
    (p) => `${p.code} (−${p.discount} ₽)`
  ).join(", ");

  return [
    "[ZNVES mocks] Режим dev:mock активен.",
    `ЛК: ${MOCK_DEV_USER.email} / ${MOCK_DEV_USER.password}, код ${MOCK_AUTH_CODE}`,
    `Промокоды: ${promos}`,
    "Прод: npm run dev (без NEXT_PUBLIC_USE_MOCKS).",
    "Проверка флага в браузере: window.__ZNVES_USE_MOCKS__",
  ].join("\n");
};

export const MOCK_PROMO_CODE_MAP: Record<string, string> = Object.fromEntries(
  Object.values(MOCK_PROMO_CODES).map((p) => [p.code, p.discount])
);
