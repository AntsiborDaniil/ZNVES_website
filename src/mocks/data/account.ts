/**
 * Тестовый профиль ЛК + автозаполнение checkout.
 * Доступно только в `npm run dev:mock`.
 *
 * Вход: email / password, код `MOCK_AUTH_CODE`.
 */
export const MOCK_AUTH_CODE = "123456";

export const MOCK_DEV_USER = {
  email: "dev@znves.ru",
  password: "password123",
  first_name: "Екатерина",
  last_name: "Смирнова",
  phone_number: "+79991234567",
  delivery_data: {
    cdek_full_pvz_address: "Москва, ул. Тверская, 12, ПВЗ СДЭК",
    yandex_full_pvz_address: "Москва, Пятницкая ул., 8, ПВЗ Яндекс",
    city: "Москва",
    street: "Арбат",
    house: "25",
    apartment: "12",
    floor: "3",
    intercom: "12К",
    comment: "Позвонить за 10 минут",
  },
} as const;

/**
 * Стартовые значения формы оформления заказа в mock-режиме
 * (гость без логина тоже видит заполненные поля).
 */
export const MOCK_CHECKOUT_AUTOFILL = {
  firstName: MOCK_DEV_USER.first_name,
  lastName: MOCK_DEV_USER.last_name,
  phone: MOCK_DEV_USER.phone_number,
  email: MOCK_DEV_USER.email,
  deliveryFirstName: MOCK_DEV_USER.first_name,
  deliveryLastName: MOCK_DEV_USER.last_name,
  deliveryPhone: MOCK_DEV_USER.phone_number,
  deliveryEmail: MOCK_DEV_USER.email,
  city: MOCK_DEV_USER.delivery_data.city,
  street: MOCK_DEV_USER.delivery_data.street,
  house: MOCK_DEV_USER.delivery_data.house,
  apartment: MOCK_DEV_USER.delivery_data.apartment,
  floor: MOCK_DEV_USER.delivery_data.floor,
  entrance: "",
  intercom: MOCK_DEV_USER.delivery_data.intercom,
  pickupCity: MOCK_DEV_USER.delivery_data.city,
  postalCode: "",
  pvzAddress: MOCK_DEV_USER.delivery_data.cdek_full_pvz_address,
  deliveryType: "cdek" as const,
  deliveryMethod: "pickup" as const,
  paymentMethod: "sberbank" as const,
  differentRecipient: false,
  deliveryComment: MOCK_DEV_USER.delivery_data.comment,
};
