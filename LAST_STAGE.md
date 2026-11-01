# LAST_STAGE

Дата: 2026-11-01

## Статус сейчас

Каталог на SSR снова отдаёт товары. Hero на мобилке/десктопе разведён по роликам. Ниже — что уже в коде, что болит, и что дожали в этой итерации.

---

## 1. Каталог: «не все товары» / подгрузка

### Факт по API

`GET https://api.znves.ru/api/catalog/` сейчас отдаёт **ровно 12 товаров** (плоский JSON-массив). Параметры `page`, `page_size`, `limit`, `offset` **не увеличивают** выдачу — бэкенд просто игнорирует пагинацию. Пока на API только 12 SKU, фронт больше показать не может.

### Что сделано на фронте

- SSR для `/catalog` и `/new-in`: товары и категории приходят с сервера → первая отрисовка не пустая.
- `CatalogCategoriesProvider` в layout — категории в Header/Burger без отдельного клиентского «пустого» старта.
- Soft-refresh после SSR: пустой ответ клиента **не затирает** уже показанные SSR-товары.
- `fetchWithTimeout` (AbortController, ~25s) вместо `AbortSignal.timeout` (ломался в Safari).
- **Прогрессивный рендер сетки:** сначала 8 карточек, дальше +8 по `IntersectionObserver` (sentinel + `rootMargin`). Когда API начнёт отдавать десятки позиций — подгрузка уже готова; сейчас догрузит оставшиеся 4 из 12 без лишней сети на картинки ниже fold.

### Что нужно с бэка (если «все» = больше 12)

- Пагинированный ответ (`count` + `results` / `next`) или снятие лимита на list.
- Фронт сможет дергать следующую страницу в том же sentinel-flow.

**Файлы:** `src/app/catalog/page.tsx`, `src/app/new-in/page.tsx`, `src/components/CatalogPage/CatalogPageContent.tsx`, `src/api/catalog/catalogApi.ts`, `src/lib/fetchWithTimeout.ts`, `src/contexts/CatalogCategoriesContext.tsx`

---

## 2. Hero-видео: loop и «само ставится на паузу»

### Причина паузы

- `visibilitychange` / `pagehide` на iOS срабатывают при скролле, сворачивании вкладки и иногда при UI chrome — код **снимал `src`** или ставил `pause()`.
- `HERO_RELEASE_EVENT` стрелял слишком широко (`lastPath === "/"` **или** путь каталога), из‑за чего ролик мог гаситься даже при навигации вокруг home.

### Что сделано

- Убраны pause/release по `visibilitychange` / `pagehide`.
- Release только при **уходе с `/`**: `lastPath === "/" && pathname !== "/"`.
- На `pause` при `document.visibilityState === "visible"` — принудительный `play()` (muted + loop + playsInline).
- Слушатели `ended` / `canplay` / `loadeddata` снова поднимают воспроизведение.
- Mobile: отложенный старт после `load` + idle (~2s), постер сразу; Save-Data / 2g — только постер.
- Desktop: `hero-desktop-v4.mp4`, `preload="auto"`.
- Mobile: `hero-mobile-v3.mp4` + `hero-mobile-poster.jpg`, `preload="metadata"`.

**Файлы:** `src/components/HeroSection/HeroSection.tsx`, `src/components/NavigationTracker/NavigationTracker.tsx`

**Ассеты:** `public/videos/home/hero-desktop-v4.mp4`, `public/videos/home/hero-mobile-v3.mp4`, `public/images/home/hero-mobile-poster.jpg`

---

## 3. Fallback карточек (красивее)

### Было

Blur полупрозрачного/пустого `next/image` — серое пятно без структуры.

### Стало

- Shimmer-плейсхолдер внутри слайда картинки, пока кадр не `onLoad` / DOM-complete.
- Картинка fade-in (`opacity 0 → 1`), без blur-fallback.
- `CatalogSkeleton` — более мягкий градиентный shimmer под сетку 4/3/2.

**Файлы:** `src/components/ProductCard/ProductCard.tsx`, `ProductCard.module.css`, `CatalogSkeleton.module.css`

---

## 4. Оптимизация загрузки карточек и видео

### Карточки

- В grid сначала монтируется активный/первый кадр; остальные — после desktop-hover (или уже загруженные).
- `imagePriority` для первых 4 карточек в каталоге (`eager` + `fetchPriority=high`).
- Остальные — `lazy`.
- `quality={70}` в grid, `80` в слайдерах.
- Узкие `sizes` для grid: `48vw` / `30vw` / `22vw`.
- Прогрессивный mount карточек (см. §1) снижает пик одновременных image-request.

### Видео

- Mobile не качает desktop-ролик (MQ + touch-phone).
- Старт mobile-ролика после window.load + delay + idle — сеть свободна для каталога/LCP.
- При уходе с главной — `releaseVideo` (pause + clear src), чтобы каталог не конкурировал с hero.
- На главной loop не рвём pagehide/visibility.

---

## 5. Прочее уже в проде / рядом

- Курьер Яндекса скрыт в UI checkout / personal data / delivery-payment (закомментирован).
- `MOCK_HOME_PAGE` — dynamic import, чтобы билд без моков не падал.
- Деплой сайта: **Vercel** с `master` (Timeweb App Platform для ZNVES не используется; там другой проект).

---

## Как проверить

1. `/` desktop: hero loop без самопаузы при скролле; уход в каталог — видео отпускает сеть.
2. `/` mobile: сначала постер, через ~2s+idle стартует `hero-mobile-v3`; loop держится.
3. `/catalog`: сразу сетка (SSR); shimmer на карточках → fade-in фото; при >8 SKU — догрузка по скроллу.
4. Медленная сеть: скелетон каталога и shimmer карточек выглядят ровно, без «мыльного» blur.
5. API по-прежнему 12 позиций — в «All» должно быть 12, не «обрезанный» клиентский сброс.

---

## Открытые зависимости от бэка

| Тема | Нужно |
|------|--------|
| Больше товаров в каталоге | Пагинация или снятие лимита list API |
| Ещё легче mobile hero | Опционально: HLS / ещё меньший CRF / отдельный short loop |

---

## Ключевые пути этой итерации

- `src/components/HeroSection/HeroSection.tsx`
- `src/components/NavigationTracker/NavigationTracker.tsx`
- `src/components/ProductCard/ProductCard.tsx` + `.module.css`
- `src/components/CatalogPage/CatalogPageContent.tsx`
- `src/components/CatalogPage/CatalogSkeleton.module.css`
- `LAST_STAGE.md` (этот файл)
