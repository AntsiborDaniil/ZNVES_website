"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../data/products";
import Map from "../Map/Map";
import styles from "../../app/checkout/page.module.css";

interface CheckoutFormProps {
  onOrderSubmit?: (orderNumber: string) => void;
  showRightColumn?: boolean;
  className?: string;
}

const CheckoutForm = ({
  onOrderSubmit,
  showRightColumn = true,
  className = "",
}: CheckoutFormProps) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryPhone: "",
    deliveryEmail: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    floor: "",
    entrance: "",
    intercom: "",
    pickupCity: "",
    postalCode: "",
    pvzAddress: "",
    deliveryType: "cdek",
    deliveryMethod: "pickup",
    paymentMethod: "sberbank",
    agreeToOffer: false,
    agreeToPrivacy: false,
    differentRecipient: false,
  });
  const [mapSearchValue, setMapSearchValue] = useState("");
  const isUpdatingFromMapRef = useRef(false);
  const lastGeocodedAddressRef = useRef<string>("");

  // Устанавливаем город "Москва" при выборе курьерской доставки
  useEffect(() => {
    if (formData.deliveryMethod === "yandex") {
      setFormData((prev) => ({
        ...prev,
        city: "Москва",
      }));
    }
  }, [formData.deliveryMethod]);

  // Цены доставки
  const deliveryPrices = {
    pickup: 0,
    yandex: 300,
  };

  // Расчет итоговой суммы
  const calculateTotal = () => {
    const itemsTotal = getTotalPrice();
    const deliveryPrice =
      deliveryPrices[formData.deliveryMethod as keyof typeof deliveryPrices] ||
      0;
    return itemsTotal + deliveryPrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // При смене типа доставки сбрасываем метод доставки на pickup
    if (name === "deliveryType") {
      setFormData((prev) => ({
        ...prev,
        deliveryType: value,
        deliveryMethod: "pickup",
      }));
    } else if (name === "deliveryMethod" && value === "yandex") {
      // При выборе курьерской доставки устанавливаем город "Москва"
      setFormData((prev) => ({
        ...prev,
        deliveryMethod: value,
        city: "Москва",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddressSelect = (addressData: {
    city?: string;
    street?: string;
    house?: string;
    fullAddress?: string;
    pvzAddress?: string;
  }) => {
    const fullAddress =
      addressData.fullAddress ||
      [addressData.street, addressData.house, addressData.city]
        .filter(Boolean)
        .join(", ");

    if (lastGeocodedAddressRef.current === fullAddress) {
      return;
    }

    lastGeocodedAddressRef.current = fullAddress;
    isUpdatingFromMapRef.current = true;

    // Если выбран пункт выдачи, сохраняем адрес ПВЗ
    if (formData.deliveryMethod === "pickup") {
      setFormData((prev) => ({
        ...prev,
        pvzAddress: addressData.pvzAddress || fullAddress || "",
        city: addressData.city || prev.city,
      }));
    } else {
      // Для курьерской доставки сохраняем полный адрес
      const newAddress = {
        city: addressData.city || "",
        street: addressData.street || "",
        house: addressData.house || "",
      };

      setFormData((prev) => ({
        ...prev,
        ...newAddress,
      }));
    }

    if (fullAddress && fullAddress !== mapSearchValue) {
      setMapSearchValue(fullAddress);
    }

    setTimeout(() => {
      isUpdatingFromMapRef.current = false;
    }, 1000);
  };

  const handleMapSearchChange = (value: string) => {
    setMapSearchValue(value);
  };

  useEffect(() => {
    if (isUpdatingFromMapRef.current) {
      return;
    }

    const addressString = [formData.city, formData.street, formData.house]
      .filter(Boolean)
      .join(", ");

    if (addressString && addressString !== mapSearchValue) {
      const timeoutId = setTimeout(() => {
        setMapSearchValue(addressString);
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [formData.city, formData.street, formData.house, mapSearchValue]);

  const generateOrderNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSubmitOrder = () => {
    if (!formData.agreeToOffer || !formData.agreeToPrivacy) {
      return;
    }

    const newOrderNumber = generateOrderNumber();
    const orderDate = new Date();

    // Формируем данные заказа
    const orderData = {
      id: newOrderNumber,
      date: formatDate(orderDate),
      status: "не оплачен",
      buyer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || formData.email,
      },
      delivery: {
        firstName: formData.deliveryFirstName || formData.firstName,
        lastName: formData.deliveryLastName || formData.lastName,
        email: formData.deliveryEmail || formData.email,
        phone: formData.deliveryPhone || formData.phone || formData.email,
        city: formData.city,
        street: formData.street,
        house: formData.house,
        apartment: formData.apartment,
        floor: formData.floor,
        entrance: formData.entrance,
        intercom: formData.intercom,
        pickupCity: formData.pickupCity,
        postalCode: formData.postalCode,
        pvzAddress: formData.pvzAddress,
        type: formData.deliveryType,
        method: formData.deliveryMethod,
      },
      payment: {
        method: formData.paymentMethod,
        amount: formatPrice(calculateTotal()),
      },
      products: items.map((item) => {
        const fullProduct = getProductById(item.productId);
        const colorLabel =
          fullProduct?.availableColors.find((c) => c.value === item.color)
            ?.label || item.color;

        return {
          id: item.productId,
          name: item.product.title,
          category: fullProduct?.category || item.product.category || "",
          color: colorLabel,
          size: item.size,
          quantity: item.quantity,
          price: formatPrice(item.product.priceValue * item.quantity),
          priceValue: item.product.priceValue * item.quantity,
          image: item.product.images[0] || "/images/catalogs/placeholder.png",
        };
      }),
      total: {
        itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: formatPrice(calculateTotal()),
        totalAmountValue: calculateTotal(),
      },
    };

    // Сохраняем заказ в sessionStorage
    if (typeof window !== "undefined") {
      try {
        const existingOrders = sessionStorage.getItem("znves:orders");
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(orderData);
        sessionStorage.setItem("znves:orders", JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save order to sessionStorage:", error);
      }
    }

    if (onOrderSubmit) {
      onOrderSubmit(newOrderNumber);
    }
  };

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.telegramSection}>
            <h1 className={styles.title}>Оформление заказа</h1>
            <button className={styles.telegramButton} type="button">
              <div className={styles.telegramIcon}>
                <Image
                  src="/images/checkout/telegram.png"
                  alt="Telegram"
                  width={32}
                  height={32}
                />
              </div>
              <span>Подключить Telegram</span>
            </button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Личные данные</h2>
            <div className={styles.firstInputs}>
              <div className={styles.inputWrapper}>
                <label htmlFor="firstName" className={styles.label}>
                  Имя
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Введите имя"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="lastName" className={styles.label}>
                  Фамилия
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Введите фамилию"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.infoInputs}>
              <div className={styles.inputWrapper}>
                <label htmlFor="phone" className={styles.label}>
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Вариант доставки</h2>
            <div className={styles.deliveryTypeRow}>
              <label className={styles.deliveryTypeButton}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="cdek"
                  checked={formData.deliveryType === "cdek"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.deliveryTypeButtonContent}>
                  <span className={styles.deliveryTypeText}>СДЕК</span>
                  <div
                    className={`${styles.deliveryCheckmark} ${
                      formData.deliveryType === "cdek"
                        ? styles.deliveryCheckmarkActive
                        : ""
                    }`}
                  >
                    {formData.deliveryType === "cdek" && (
                      <span className={styles.checkmarkIcon}>
                        <Image
                          src="/images/checkout/checkmark.png"
                          alt="checkmark"
                          width={11.64}
                          height={10}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </label>
              <label className={styles.deliveryTypeButton}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="yandex"
                  checked={formData.deliveryType === "yandex"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.deliveryTypeButtonContent}>
                  <span className={styles.deliveryTypeText}>ЯНДЕКС.КУРЬЕР</span>
                  <div
                    className={`${styles.deliveryCheckmark} ${
                      formData.deliveryType === "yandex"
                        ? styles.deliveryCheckmarkActive
                        : ""
                    }`}
                  >
                    {formData.deliveryType === "yandex" && (
                      <span className={styles.checkmarkIcon}>
                        <Image
                          src="/images/checkout/checkmark.png"
                          alt="checkmark"
                          width={11.64}
                          height={10}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Доставка</h2>
            <div className={styles.deliveryButtonsRow}>
              {formData.deliveryType === "cdek" && (
                <label className={styles.deliveryButton}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === "pickup"}
                    onChange={handleInputChange}
                    className={styles.radioInput}
                  />
                  <div className={styles.deliveryButtonContent}>
                    <div className={styles.deliveryButtonInfo}>
                      <span className={styles.deliveryButtonName}>
                        Пункт выдачи
                      </span>
                    </div>
                    <div className={styles.deliveryButtonInfo}>
                      <span className={styles.deliveryButtonSubtext}>
                        Послезавтра
                      </span>
                      <span className={styles.deliveryButtonPrice}>
                        бесплатно
                      </span>
                    </div>
                    <div
                      className={`${styles.deliveryCheckmark} ${
                        formData.deliveryMethod === "pickup"
                          ? styles.deliveryCheckmarkActive
                          : ""
                      }`}
                    >
                      {formData.deliveryMethod === "pickup" && (
                        <span className={styles.checkmarkIcon}>
                          <Image
                            src="/images/checkout/checkmark.png"
                            alt="checkmark"
                            width={11.64}
                            height={10}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              )}
              {formData.deliveryType === "yandex" && (
                <>
                  <label className={styles.deliveryButton}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    <div className={styles.deliveryButtonContent}>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonName}>
                          Пункт выдачи
                        </span>
                      </div>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonSubtext}>
                          Послезавтра
                        </span>
                        <span className={styles.deliveryButtonPrice}>
                          бесплатно
                        </span>
                      </div>
                      <div
                        className={`${styles.deliveryCheckmark} ${
                          formData.deliveryMethod === "pickup"
                            ? styles.deliveryCheckmarkActive
                            : ""
                        }`}
                      >
                        {formData.deliveryMethod === "pickup" && (
                          <span className={styles.checkmarkIcon}>
                            <Image
                              src="/images/checkout/checkmark.png"
                              alt="checkmark"
                              width={11.64}
                              height={10}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                  <label className={styles.deliveryButton}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="yandex"
                      checked={formData.deliveryMethod === "yandex"}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    <div className={styles.deliveryButtonContent}>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonName}>
                          Курьером
                        </span>
                      </div>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonSubtext}>
                          6-7 дней
                        </span>
                        <span
                          className={`${styles.deliveryButtonPrice} ${styles.deliveryButtonPriceCourier}`}
                        >
                          от {formatPrice(deliveryPrices.yandex)}
                        </span>
                      </div>
                      <div
                        className={`${styles.deliveryCheckmark} ${
                          formData.deliveryMethod === "yandex"
                            ? styles.deliveryCheckmarkActive
                            : ""
                        }`}
                      >
                        {formData.deliveryMethod === "yandex" && (
                          <span className={styles.checkmarkIcon}>
                            <Image
                              src="/images/checkout/checkmark.png"
                              alt="checkmark"
                              width={11.64}
                              height={10}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Данные о доставке</h2>
            <label
              className={styles.checkboxLabel}
              style={{ marginBottom: "20px" }}
            >
              <input
                type="checkbox"
                name="differentRecipient"
                checked={formData.differentRecipient}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span>Получатель отличается от покупателя</span>
            </label>
            {formData.differentRecipient && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryFirstName" className={styles.label}>
                      Имя получателя
                    </label>
                    <input
                      type="text"
                      id="deliveryFirstName"
                      name="deliveryFirstName"
                      placeholder="Введите имя"
                      value={formData.deliveryFirstName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryLastName" className={styles.label}>
                      Фамилия получателя
                    </label>
                    <input
                      type="text"
                      id="deliveryLastName"
                      name="deliveryLastName"
                      placeholder="Введите фамилию"
                      value={formData.deliveryLastName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryPhone" className={styles.label}>
                      Телефон получателя
                    </label>
                    <input
                      type="tel"
                      id="deliveryPhone"
                      name="deliveryPhone"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.deliveryPhone}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryEmail" className={styles.label}>
                      Email получателя
                    </label>
                    <input
                      type="email"
                      id="deliveryEmail"
                      name="deliveryEmail"
                      placeholder="Введите email"
                      value={formData.deliveryEmail}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </>
            )}
            {formData.deliveryMethod === "pickup" && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="pickupCity" className={styles.label}>
                      Город
                    </label>
                    <input
                      type="text"
                      id="pickupCity"
                      name="pickupCity"
                      placeholder="Введите город"
                      value={formData.pickupCity || ""}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="postalCode" className={styles.label}>
                      Почтовый индекс
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      placeholder="Введите индекс"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div
                    className={styles.inputWrapper}
                    style={{ width: "100%" }}
                  >
                    <label htmlFor="pvzAddress" className={styles.label}>
                      Адрес пункта выдачи
                    </label>
                    <input
                      type="text"
                      id="pvzAddress"
                      name="pvzAddress"
                      placeholder="Выберите пункт выдачи на карте"
                      value={formData.pvzAddress}
                      onChange={handleInputChange}
                      className={styles.input}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}
            {formData.deliveryMethod === "yandex" && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="city" className={styles.label}>
                      Город
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Москва"
                      value="Москва"
                      className={styles.input}
                      readOnly
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="street" className={styles.label}>
                      Улица
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Введите улицу"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="house" className={styles.label}>
                      Дом
                    </label>
                    <input
                      type="text"
                      id="house"
                      name="house"
                      placeholder="Введите дом"
                      value={formData.house}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="apartment" className={styles.label}>
                      Квартира
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      placeholder="Введите квартиру"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="floor" className={styles.label}>
                      Этаж
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      placeholder="Введите этаж"
                      value={formData.floor}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="entrance" className={styles.label}>
                      Подъезд
                    </label>
                    <input
                      type="text"
                      id="entrance"
                      name="entrance"
                      placeholder="Введите подъезд"
                      value={formData.entrance}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="intercom" className={styles.label}>
                      Домофон
                    </label>
                    <input
                      type="text"
                      id="intercom"
                      name="intercom"
                      placeholder="Введите домофон"
                      value={formData.intercom}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {formData.deliveryMethod === "pickup"
                ? "Пункт получения"
                : "Адрес доставки"}
            </h2>
            <div className={styles.checkoutMapSearchContainer}>
              <input
                type="text"
                id="mapSearchInput"
                name="mapSearchInput"
                className={styles.checkoutMapSearchInput}
                placeholder={
                  formData.deliveryMethod === "pickup"
                    ? "Выберите пункт получения"
                    : "Выберите адрес доставки"
                }
                value={
                  formData.deliveryMethod === "pickup"
                    ? formData.pvzAddress ||
                      mapSearchValue ||
                      "Выберите пункт выдачи на карте"
                    : mapSearchValue ||
                      [formData.city, formData.street, formData.house]
                        .filter(Boolean)
                        .join(", ") ||
                      "Выберите адрес на карте"
                }
                onChange={(e) => {
                  handleMapSearchChange(e.target.value);
                }}
                readOnly
              />
            </div>
            <div className={styles.checkoutMapContainer}>
              <Map
                onAddressSelect={handleAddressSelect}
                searchValue={mapSearchValue}
                onSearchChange={handleMapSearchChange}
                deliveryMethod={formData.deliveryMethod}
                deliveryType={formData.deliveryType}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.paymentTitle}>Способ оплаты</h2>
            <div className={styles.paymentButtonsRow}>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="sberbank"
                  checked={formData.paymentMethod === "sberbank"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/sbp.png"
                    alt="СБП"
                    width={54}
                    height={30}
                    className={styles.paymentButtonIcon}
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/card.png"
                    alt="Картой онлайн"
                    width={86}
                    height={24}
                    className={styles.paymentButtonIcon}
                  />
                  <Image
                    src="/images/checkout/cardText.png"
                    alt="Онлайн"
                    width={86}
                    height={16}
                    className={styles.paymentButtonIcon}
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="yandexpay"
                  checked={formData.paymentMethod === "yandexpay"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/y.png"
                    alt="Яндекс Pay"
                    width={60}
                    height={20}
                    className={styles.paymentButtonIcon}
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="installment"
                  checked={formData.paymentMethod === "installment"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/dolya.png"
                    alt="Долями"
                    width={73}
                    height={14}
                    className={styles.paymentButtonIcon}
                  />
                </div>
              </label>
            </div>
          </div>

          {!showRightColumn && (
            <>
              <div className={styles.orderSummaryBlock}>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRowTotal}>
                    <span className={styles.summaryLabelTotal}>Итого</span>
                    <span className={styles.summaryTotal}>
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${styles.submitButton} ${styles.submitButtonRight}`}
                  disabled={!formData.agreeToOffer || !formData.agreeToPrivacy}
                  onClick={handleSubmitOrder}
                >
                  Оформить заказ
                </button>
                <div className={styles.checkboxes}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToOffer"
                      checked={formData.agreeToOffer}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkboxLink}
                      >
                        публичной оферты
                      </Link>
                    </span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я принимаю{" "}
                      <Link href="/privacy" className={styles.checkboxLink}>
                        политику конфиденциальности
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
        {showRightColumn && (
          <div className={styles.rightPart}>
            <div className={styles.orderHeader}>
              <h2 className={styles.orderTitle}>Ваши товары</h2>
              <Link href="/cart" className={styles.editLink}>
                изменить
              </Link>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.orderItemsBlock}>
                <div className={styles.orderItems}>
                  {items.map((item, index) => {
                    const fullProduct = getProductById(item.productId);
                    const colorLabel =
                      fullProduct?.availableColors.find(
                        (c) => c.value === item.color
                      )?.label || item.color;

                    return (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}-${index}`}
                        className={styles.orderItem}
                      >
                        <div className={styles.orderItemImage}>
                          <Image
                            src={
                              item.product.images[0] ||
                              "/images/catalogs/placeholder.png"
                            }
                            alt={item.product.title}
                            width={82}
                            height={82}
                            className={styles.orderImage}
                          />
                        </div>
                        <div className={styles.orderItemInfo}>
                          <div className={styles.orderItemCategory}>
                            <div className={styles.column}>
                              {fullProduct?.category ||
                                item.product.category ||
                                ""}

                              <h2 className={styles.orderItemTitle}>
                                {item.product.title}
                              </h2>
                            </div>
                            <div className={styles.orderItemDetailsRow}>
                              <div className={styles.orderItemDetailColumn}>
                                <span className={styles.orderItemDetailLabel}>
                                  Цвет
                                </span>
                                <span className={styles.orderItemDetailValue}>
                                  {colorLabel}
                                </span>
                              </div>
                              <div className={styles.orderItemDetailColumn}>
                                <span className={styles.orderItemDetailLabel}>
                                  Размер
                                </span>
                                <span
                                  className={`${styles.orderItemDetailValue} ${styles.orderItemSizeValue}`}
                                >
                                  {item.size}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.orderItemPrice}>
                            {formatPrice(
                              item.product.priceValue * item.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Доставка:</span>
                <span className={styles.summaryValue}>
                  {formData.deliveryMethod === "pickup"
                    ? "Бесплатно"
                    : formatPrice(
                        deliveryPrices[
                          formData.deliveryMethod as keyof typeof deliveryPrices
                        ] || 0
                      )}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Товаров на:</span>
                <span className={styles.summaryValue}>
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <div className={styles.orderSummaryBlock}>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRowTotal}>
                    <span className={styles.summaryLabelTotal}>Итого</span>
                    <span className={styles.summaryTotal}>
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${styles.submitButton} ${styles.submitButtonRight}`}
                  disabled={!formData.agreeToOffer || !formData.agreeToPrivacy}
                  onClick={handleSubmitOrder}
                >
                  Оформить заказ
                </button>
                <div className={styles.checkboxes}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToOffer"
                      checked={formData.agreeToOffer}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkboxLink}
                      >
                        публичной оферты
                      </Link>
                    </span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я принимаю{" "}
                      <Link href="/privacy" className={styles.checkboxLink}>
                        политику конфиденциальности
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
