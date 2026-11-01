# Mocks: prod vs `dev:mock`

Чёткое разделение режимов.

| Команда | `NEXT_PUBLIC_USE_MOCKS` | API |
|--------|-------------------------|-----|
| `npm run dev` | не задан / false | **реальный** `api.znves.ru` (прод) |
| `npm run dev:prod-api` | `false` | **реальный** API + снятие SW моков |
| `npm run dev:mock` | `true` | **MSW** + локальные store/data |
| `npm run build` / `start` | не задан | **реальный** API |
| vitest / playwright | `true` (в конфиге) | MSW |

Флаг: `process.env.NEXT_PUBLIC_USE_MOCKS === "true"`  
→ `src/lib/useMocks.ts` → `shouldUseMocks()`  
→ также прокинут в клиент через `next.config.js` → `env`.

В DevTools **нельзя** писать `process.env...` (`process is not defined`).  
Проверка флага: `window.__ZNVES_USE_MOCKS__` или лог `[ZNVES] mocks ON/OFF`.

API-клиенты (auth, catalog, orders, promo) при моках ходят в store **напрямую**, без обязательного MSW.  
MSW — доп. перехват network; если SW пустой, ЛК/промо всё равно работают.

## Что мокается в `dev:mock`

### Промокоды (`data/promos.ts`)

| Код | Скидка |
|-----|--------|
| `SALE10` | 499 ₽ |
| `WELCOME` | 300 ₽ |
| `ZNVES500` | 500 ₽ |
| `BIG1000` | 1000 ₽ |

Любой другой код → 404 «Промокод не найден».

### Автозаполнение checkout (`data/account.ts`)

В mock-режиме форма корзины стартует с тестовыми ФИО / телефоном / email / адресом ПВЗ  
(`MOCK_CHECKOUT_AUTOFILL`). В `npm run dev` поля пустые.

После логина в ЛК те же данные подставляются из профиля (`MOCK_DEV_USER`).

### Личный кабинет

- **Логин:** `dev@znves.ru` / `password123`
- **Код подтверждения:** `123456`
- **Заказы:** по одному на каждый статус  
  `Ожидает оплаты` · `Оплачен` · `Доставляется` · `Доставлен` · `Отменён`  
  (`data/orders.ts`)

**Сессия без cross-origin cookie:** браузер не ставит `Set-Cookie` с `api.znves.ru` на `localhost`.  
В mock-режиме токен пишется в `localStorage` (`znves:mock-access-session`) + `document.cookie` на origin страницы; handlers читают его через `resolveSessionToken`. После F5 сессия ЛК сохраняется.

## Границы безопасности

1. MSW worker стартует **только** при `shouldUseMocks() === true` (`browser.ts`).
2. При обычном `dev` `MockProvider` **снимает** `mockServiceWorker.js`, чтобы не перехватывать прод-API.
3. Часть API (`home`, `catalog`, `orders`) при моках может отдавать данные из store напрямую — тоже только под флагом.

## Быстрая проверка

```bash
npm run dev:mock
# консоль: баннер с логином и промокодами
# корзина → форма уже заполнена, SALE10 активируется
# /account → вход → все статусы заказов
```
