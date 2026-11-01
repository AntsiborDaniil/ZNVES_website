# LAST_STAGE

Дата: 2026-11-01

## Что сделано

### 1. Hero-видео: cover + центрирование + мобильный ролик

**Проблема:** видео в hero заполняло блок так, что кадр визуально «съезжал» по вертикали относительно области на экране.

**Решение:**

- cover через `object-fit: cover` + `object-position: center center` на весь контейнер (`inset: 0`, `width/height: 100%`)
- отдельный ролик для мобилки: `public/videos/home/hero-mobile-v2.mp4` (из `IMG_7357.MOV`)
- desktop: `public/videos/home/hero-desktop-v2.mp4`
- выбор источника по `(max-width: 768px)`

Видео заполняет viewport без искажения и обрезается равномерно от центра.

**Файлы:**

- `src/components/HeroSection/HeroSection.module.css`
- `src/components/HeroSection/HeroSection.tsx`
- `public/videos/home/hero-mobile-v2.mp4`
- `public/videos/home/hero-desktop-v2.mp4`

### 2. Модалка подтверждения данных перед оформлением заказа

**Поведение:** при нажатии «Оформить заказ» в корзине сначала проходит валидация формы, затем открывается модалка с проверкой введённых данных. Создание заказа / оплата стартуют только после «Оформить заказ» в модалке.

**В модалке показываются:**

- получатель (ФИО)
- телефон
- email
- способ доставки
- адрес (ПВЗ или курьерский)
- другой получатель (если указан)
- способ оплаты
- итоговая сумма

Кнопки: «Оформить заказ» / «Изменить данные» (закрывает модалку и возвращает к форме).

**Файлы:**

- `src/components/OrderConfirmModal/OrderConfirmModal.tsx` — новый компонент
- `src/components/OrderConfirmModal/OrderConfirmModal.module.css` — стили в духе существующих модалок
- `src/components/CheckoutForm/CheckoutForm.tsx` — показ модалки после валидации, submit по подтверждению
- `src/components/CheckoutForm/test/CheckoutForm.e2e.spec.ts` — e2e учитывает шаг подтверждения

### 3. Промокод больше не слетает при правках формы

**Проблема:** после активации промокода он сбрасывался при изменении данных, не связанных с добавлением товара (ФИО, адрес, доставка и т.п.).

**Причина:** в `CartModal` при каждом открытии/ремоунте вызывался `setAppliedPromo(null)`.

**Решение:**

- при открытии корзины больше не чистим `appliedPromo` — только локальные ошибки ввода; поле подставляется из активного промокода
- в `CartContext` сброс промокода только при реальном изменении состава/количества корзины (по signature позиций), с toast

**Файлы:**

- `src/components/CartModal/CartModal.tsx`
- `src/contexts/CartContext.tsx`
- `src/contexts/test/CartContext.unit.test.tsx`

### 4. `dev:mock`: промокоды, автозаполнение, ЛК со всеми статусами

**Разделение режимов:**

| Команда | API |
|--------|-----|
| `npm run dev` / `dev:prod-api` | реальный прод-API |
| `npm run dev:mock` | MSW + локальные мок-данные |

Подробности: `src/mocks/README.md`.

**Что добавлено/усилено:**

- промокоды `SALE10`, `WELCOME`, `ZNVES500`, `BIG1000` (`data/promos.ts`)
- автозаполнение checkout без логина (`MOCK_CHECKOUT_AUTOFILL`, только при `shouldUseMocks()`)
- ЛК: `dev@znves.ru` / `password123`, код `123456`
- заказы: Ожидает оплаты / Оплачен / Доставляется / Доставлен / Отменён
- баннер в консоли при старте MSW; worker не стартует без флага
- e2e стартует через `dev:mock`

**Файлы:**

- `src/mocks/data/promos.ts`, `account.ts`, `orders.ts`
- `src/mocks/config.ts`, `browser.ts`, `handlers/discountHandlers.ts`
- `src/mocks/README.md`
- `src/components/CheckoutForm/CheckoutForm.tsx`
- `src/components/AccountPage/Orders/Orders.tsx`
- `package.json`, `playwright.config.ts`

## Как проверить

1. Главная: hero-видео на desktop/mobile — кадр по центру области, без «съезда» вверх/вниз.
2. На мобилке (≤768px) должен играть `hero-mobile-v2.mp4` (ролик из `IMG_7357.MOV`).
3. Корзина → заполнить данные → «Оформить заказ» → должна появиться модалка подтверждения.
4. «Изменить данные» — возврат к форме без создания заказа.
5. «Оформить заказ» в модалке — создание заказа / переход к оплате как раньше.
6. Активировать промокод → менять ФИО/телефон/доставку — промокод остаётся.
7. Добавить/удалить товар или изменить количество — промокод сбрасывается с toast.
8. `npm run dev:mock` → форма checkout уже заполнена; `SALE10` применяется; ЛК показывает все статусы заказов.
9. `npm run dev` → пустая форма, реальный API, без MSW-баннера.
10. `dev:mock`: логин `dev@znves.ru` / `password123` + код `123456` → `/account` открывается; F5 не разлогинивает (сессия в localStorage).
11. Проверка моков в браузере: `window.__ZNVES_USE_MOCKS__` (не `process.env` — в Console `process` нет). Auth/promo работают напрямую через store, даже если Service Worker пустой.
