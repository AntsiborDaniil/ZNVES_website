# Требования для интеграции Яндекс.Доставки и СДЭК

## 📋 Что нужно получить от БЕКЕНДЕРОВ

### 1. API-ключи и учетные данные

#### Для СДЭК:

-   ✅ **Account** (номер аккаунта в СДЭК)
-   ✅ **Secure Password** (пароль для API)
-   ✅ **Тестовые данные** (если есть тестовый аккаунт):
    -   Test Account
    -   Test Secure Password

#### Для Яндекс.Доставки:

-   ✅ **OAuth токен** или **API ключ**
-   ✅ **Campaign ID** (ID магазина в Яндекс.Доставке)
-   ✅ **Client ID** и **Client Secret** (если используется OAuth)

### 2. Backend API эндпоинты

Бекендеры должны создать следующие эндпоинты:

#### СДЭК:

```
POST /api/delivery/cdek/calculate
Body: {
  from: { city: string, address?: string },
  to: { city: string, address?: string, postal_code?: string },
  packages: Array<{ weight: number, length: number, width: number, height: number }>,
  tariff_code?: number
}
Response: {
  price: number,
  delivery_min: number, // дней
  delivery_max: number, // дней
  tariff_code: number
}

GET /api/delivery/cdek/pvz?city={city_name}
Response: Array<{
  code: string,
  name: string,
  address: string,
  location: { lat: number, lon: number },
  work_time: string,
  address_comment?: string
}>

POST /api/delivery/cdek/create-order
Body: {
  order_number: string,
  recipient: { name: string, phone: string, email?: string },
  address: { city: string, street: string, house: string, apartment?: string, postal_code?: string },
  pvz_code?: string, // если доставка в ПВЗ
  packages: Array<{ weight: number, length: number, width: number, height: number }>,
  tariff_code: number
}
Response: {
  order_uuid: string,
  cdek_number: string,
  status: string
}
```

#### Яндекс.Доставка:

```
POST /api/delivery/yandex/calculate
Body: {
  from: { city: string, address?: string },
  to: { city: string, address?: string, postal_code?: string },
  packages: Array<{ weight: number, length: number, width: number, height: number }>,
  delivery_type?: string // "express" | "standard"
}
Response: {
  price: number,
  delivery_min: number, // дней
  delivery_max: number, // дней
  delivery_type: string
}

GET /api/delivery/yandex/pvz?city={city_name}
Response: Array<{
  id: string,
  name: string,
  address: string,
  location: { lat: number, lon: number },
  work_time: string,
  phones?: string[]
}>

POST /api/delivery/yandex/create-order
Body: {
  order_number: string,
  recipient: { name: string, phone: string, email?: string },
  address: { city: string, street: string, house: string, apartment?: string, postal_code?: string },
  pvz_id?: string, // если доставка в ПВЗ
  packages: Array<{ weight: number, length: number, width: number, height: number }>,
  delivery_type: string
}
Response: {
  order_id: string,
  yandex_order_id: string,
  status: string
}
```

### 3. Переменные окружения

Бекендеры должны настроить `.env` файл:

```env
# СДЭК
CDEK_ACCOUNT=your_account_number
CDEK_SECURE_PASSWORD=your_secure_password
CDEK_API_URL=https://api.cdek.ru/v2

# Яндекс.Доставка
YANDEX_DELIVERY_TOKEN=your_oauth_token
YANDEX_CAMPAIGN_ID=your_campaign_id
YANDEX_API_URL=https://b2b.taxi.yandex.ru/b2b/cargo/integration

# Адрес отправителя
SENDER_CITY=Москва
SENDER_ADDRESS=полный адрес склада
SENDER_POSTAL_CODE=123456
SENDER_LOCATION_LAT=55.7558
SENDER_LOCATION_LON=37.6173
```

### 4. Документация по API

-   ✅ Ссылки на официальную документацию СДЭК API
-   ✅ Ссылки на официальную документацию Яндекс.Доставка API
-   ✅ Примеры запросов/ответов
-   ✅ Коды ошибок и их обработка

---

## 🏢 Что нужно получить от ЗАКАЗЧИКА (отправителя доставки)

### 1. Данные о складе/магазине (точка отправления)

-   ✅ **Город отправления** (например: "Москва")
-   ✅ **Полный адрес склада** (улица, дом, корпус)
-   ✅ **Почтовый индекс** склада
-   ✅ **Координаты склада** (широта, долгота) - опционально, но желательно
-   ✅ **Название компании** (для оформления отправления)
-   ✅ **ИНН** (если требуется для СДЭК/Яндекс)

### 2. Данные о товарах

Для каждого товара в каталоге:

-   ✅ **Вес** (в граммах) - обязательно!
-   ✅ **Габариты** (длина × ширина × высота в см) - обязательно!
-   ✅ **Стоимость товара** (уже есть в системе)

**Пример:**

```json
{
    "id": 1,
    "title": "HOODIE",
    "weight": 500, // граммы
    "dimensions": {
        "length": 30, // см
        "width": 25, // см
        "height": 5 // см
    }
}
```

### 3. Настройки доставки

-   ✅ **Какие тарифы СДЭК использовать?**
    -   До двери (код тарифа)
    -   До ПВЗ (код тарифа)
    -   Экспресс-доставка (код тарифа)
-   ✅ **Какие типы доставки Яндекс использовать?**

    -   Стандартная
    -   Экспресс

-   ✅ **Минимальная сумма заказа для бесплатной доставки?** (если есть)
-   ✅ **Города, куда доставляем?** (все или ограниченный список)
-   ✅ **Комментарии/инструкции для курьеров?** (если есть стандартные)

### 4. Бизнес-логика

-   ✅ **Что делать, если адрес недоступен для доставки?**

    -   Показать ошибку?
    -   Предложить альтернативный адрес?
    -   Предложить только ПВЗ?

-   ✅ **Когда создавать заказ в системе доставки?**

    -   Сразу при оформлении заказа?
    -   После оплаты?
    -   Вручную администратором?

-   ✅ **Нужна ли интеграция с системой учета заказов?**
    -   Куда сохранять номер заказа СДЭК/Яндекс?
    -   Нужны ли webhook'и для отслеживания статусов?

### 5. Тестовые данные

-   ✅ **Тестовый адрес для проверки** (город, улица, дом)
-   ✅ **Тестовый номер телефона** (для проверки создания заказа)

---

## 💻 Что нужно сделать ФРОНТЕНДЕРУ (вам)

### 1. Обновить типы данных

Добавить в `src/types/products.ts`:

```typescript
export type ProductDimensions = {
    weight: number; // граммы
    length: number; // см
    width: number; // см
    height: number; // см
};

export type ProductDetail = CatalogProduct & {
    // ... существующие поля
    dimensions?: ProductDimensions; // добавить это
};
```

### 2. Обновить данные о товарах

В `src/data/products.ts` добавить `dimensions` для каждого товара.

### 3. Создать сервисы для работы с API

Создать файлы:

-   `src/services/deliveryService.ts` - общий сервис доставки
-   `src/services/cdekService.ts` - работа с СДЭК API
-   `src/services/yandexDeliveryService.ts` - работа с Яндекс.Доставка API

### 4. Обновить форму checkout

В `src/app/checkout/page.tsx`:

-   ✅ Добавить поле "Почтовый индекс"
-   ✅ Добавить выбор ПВЗ (если выбран способ доставки до ПВЗ)
-   ✅ Добавить динамический расчет стоимости доставки
-   ✅ Добавить отображение сроков доставки
-   ✅ Добавить индикаторы загрузки
-   ✅ Добавить обработку ошибок

### 5. Создать компоненты

-   ✅ `src/components/DeliveryPVZSelector/PVZSelector.tsx` - выбор ПВЗ
-   ✅ `src/components/DeliveryCalculator/DeliveryCalculator.tsx` - расчет стоимости
-   ✅ Обновить `src/components/Map/Map.tsx` - показать ПВЗ на карте

### 6. Обновить состояние формы

Добавить в `formData`:

```typescript
{
  // ... существующие поля
  postalCode: string,
  selectedPVZ: {
    code: string,
    name: string,
    address: string,
    location: { lat: number, lon: number }
  } | null,
  deliveryPrice: number,
  deliveryDays: { min: number, max: number }
}
```

### 7. Обработка создания заказа

При `handleSubmitOrder`:

-   ✅ Вызвать API для создания заказа в системе доставки
-   ✅ Сохранить номер заказа доставки
-   ✅ Показать его в модалке успеха

### 8. Обработка ошибок

-   ✅ Если адрес недоступен - показать сообщение
-   ✅ Если расчет не удался - показать фиксированную цену
-   ✅ Если создание заказа не удалось - показать ошибку

---

## 📝 Чек-лист для старта работы

### От бекендеров:

-   [ ] API ключи СДЭК (Account + Secure Password)
-   [ ] API ключи Яндекс.Доставка (Token + Campaign ID)
-   [ ] Backend API эндпоинты готовы и протестированы
-   [ ] Переменные окружения настроены
-   [ ] Документация по API предоставлена

### От заказчика:

-   [ ] Адрес склада (город, адрес, индекс)
-   [ ] Вес и габариты всех товаров
-   [ ] Выбранные тарифы доставки
-   [ ] Бизнес-логика определена
-   [ ] Тестовые данные для проверки

### От фронтендера:

-   [ ] Типы данных обновлены
-   [ ] Данные о товарах дополнены весом/габаритами
-   [ ] Сервисы для работы с API созданы
-   [ ] Форма checkout обновлена
-   [ ] Компоненты для ПВЗ созданы
-   [ ] Интеграция протестирована

---

## 🚀 Порядок работы

1. **Получить от заказчика:** вес и габариты товаров
2. **Получить от бекендеров:** API ключи и эндпоинты
3. **Фронтендер:** обновить данные товаров
4. **Фронтендер:** создать сервисы и компоненты
5. **Фронтендер:** интегрировать в checkout
6. **Тестирование:** проверить на тестовых данных
7. **Деплой:** запустить в продакшн

---

## ⚠️ Важные моменты

1. **Безопасность:** API ключи должны быть только на бекенде, никогда не передавать их на фронтенд!
2. **Ошибки:** Все запросы к API доставки должны обрабатываться с try/catch
3. **Fallback:** Если расчет не удался, показывать фиксированную цену
4. **UX:** Показывать индикаторы загрузки при расчете стоимости
5. **Валидация:** Проверять, что адрес заполнен перед расчетом стоимости
