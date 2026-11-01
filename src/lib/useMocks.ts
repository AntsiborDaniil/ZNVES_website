/**
 * Единственный источник флага моков для API/UI.
 * Живёт вне `src/mocks/*`, чтобы HMR Turbopack не ломал app-client.
 *
 * true  → `npm run dev:mock` (NEXT_PUBLIC_USE_MOCKS=true)
 * false → `npm run dev` / production
 *
 * Важно: в DevTools Console нельзя писать `process.env...` —
 * `process` в браузере нет. Смотрите `window.__ZNVES_USE_MOCKS__`
 * (выставляется MockProvider) или баннер `[ZNVES mocks]`.
 */
export const shouldUseMocks = (): boolean => {
  const flag = process.env.NEXT_PUBLIC_USE_MOCKS;
  return flag === "true" || flag === "1";
};
