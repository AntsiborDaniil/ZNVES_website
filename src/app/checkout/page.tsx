"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../data/products";
import Map from "../../components/Map/Map";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import styles from "./page.module.css";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, updateQuantity, removeItem, clearCart } =
    useCart();
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
    deliveryType: "cdek",
    deliveryMethod: "pickup",
    paymentMethod: "sberbank",
    agreeToOffer: false,
    agreeToPrivacy: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [mapSearchValue, setMapSearchValue] = useState("");
  const isUpdatingFromMapRef = useRef(false);
  const lastGeocodedAddressRef = useRef<string>("");

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
  }) => {
    const fullAddress =
      addressData.fullAddress ||
      [addressData.street, addressData.house, addressData.city]
        .filter(Boolean)
        .join(", ");

    // Проверяем, не обновляем ли мы тот же адрес (защита от циклов)
    if (lastGeocodedAddressRef.current === fullAddress) {
      console.log(
        "[Checkout] Пропускаем обновление - тот же адрес:",
        fullAddress
      );
      return;
    }

    console.log("[Checkout] handleAddressSelect вызван:", addressData);
    lastGeocodedAddressRef.current = fullAddress;
    isUpdatingFromMapRef.current = true;

    const newAddress = {
      city: addressData.city || "",
      street: addressData.street || "",
      house: addressData.house || "",
    };

    setFormData((prev) => {
      const updated = {
        ...prev,
        ...newAddress,
      };
      console.log("[Checkout] Обновляем formData:", updated);
      return updated;
    });

    // Обновляем значение поиска только если оно отличается
    if (fullAddress && fullAddress !== mapSearchValue) {
      console.log("[Checkout] Устанавливаем mapSearchValue:", fullAddress);
      setMapSearchValue(fullAddress);
    }

    // Сбрасываем флаг через задержку
    setTimeout(() => {
      isUpdatingFromMapRef.current = false;
      console.log("[Checkout] isUpdatingFromMapRef сброшен");
    }, 1000); // Увеличил задержку до 1 секунды
  };

  const handleMapSearchChange = (value: string) => {
    setMapSearchValue(value);
  };

  // Обновляем поиск карты при изменении полей адреса (с debounce)
  useEffect(() => {
    // Не обновляем, если изменение пришло от карты
    if (isUpdatingFromMapRef.current) {
      console.log("[Checkout] Пропускаем обновление - изменение от карты");
      return;
    }

    const addressString = [formData.city, formData.street, formData.house]
      .filter(Boolean)
      .join(", ");

    // Обновляем только если адрес изменился и не совпадает с текущим значением поиска
    if (addressString && addressString !== mapSearchValue) {
      console.log(
        "[Checkout] Планируем обновление mapSearchValue:",
        addressString
      );
      const timeoutId = setTimeout(() => {
        console.log("[Checkout] Обновляем mapSearchValue:", addressString);
        setMapSearchValue(addressString);
      }, 1500); // Увеличил debounce до 1.5 секунды

      return () => {
        console.log("[Checkout] Отменяем обновление mapSearchValue");
        clearTimeout(timeoutId);
      };
    }
  }, [formData.city, formData.street, formData.house, mapSearchValue]);

  // Генерация номера заказа
  const generateOrderNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  // Очищаем корзину после показа модалки
  useEffect(() => {
    if (showSuccessModal && items.length > 0) {
      clearCart();
    }
  }, [showSuccessModal, items.length, clearCart]);

  // Обновляем mapAddress только при изменении через handleAddressSelect
  // Не обновляем автоматически при вводе в поля, чтобы избежать конфликтов

  // Обработка оформления заказа
  const handleSubmitOrder = () => {
    if (!formData.agreeToOffer || !formData.agreeToPrivacy) {
      return;
    }

    // Генерируем номер заказа
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);

    // Показываем модалку
    setShowSuccessModal(true);
  };

  const handleGoToAccount = () => {
    setShowSuccessModal(false);
    router.push("/account");
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/catalog");
  };

  // Показываем пустую корзину только если модалка не открыта
  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className={styles.checkoutPage}>
        <Header variant="green" />
        <main className={styles.main}>
          <div className={styles.emptyCart}>
            <h1 className={styles.emptyTitle}>Корзина пуста</h1>
            <p className={styles.emptyText}>
              Добавьте товары в корзину, чтобы продолжить оформление
            </p>
            <Link href="/catalog" className={styles.shopButton}>
              Перейти в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <Header variant="green" />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Link href="/catalog" className={styles.backLink}>
            Вернуться в каталог
          </Link>

          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <h1 className={styles.title}>Оформление заказа</h1>

              <div className={styles.telegramSection}>
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
                      placeholder="Введите ваше имя"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="lastName" className={styles.label}>
                      Имя
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Введите ваше имя"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Введите ваш email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="email2" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email2"
                      name="email"
                      placeholder="Введите ваш email"
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
                      <span className={styles.deliveryTypeText}>
                        ЯНДЕКС.КУРЬЕР
                      </span>
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
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryFirstName" className={styles.label}>
                      Имя
                    </label>
                    <input
                      type="text"
                      id="deliveryFirstName"
                      name="deliveryFirstName"
                      placeholder="Введите ваше имя"
                      value={formData.deliveryFirstName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryLastName" className={styles.label}>
                      Имя
                    </label>
                    <input
                      type="text"
                      id="deliveryLastName"
                      name="deliveryLastName"
                      placeholder="Введите ваше имя"
                      value={formData.deliveryLastName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryEmail" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="deliveryEmail"
                      name="deliveryEmail"
                      placeholder="Введите ваш email"
                      value={formData.deliveryEmail}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryEmail2" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="deliveryEmail2"
                      name="deliveryEmail"
                      placeholder="Введите ваш email"
                      value={formData.deliveryEmail}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              {formData.deliveryMethod === "yandex" && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Адрес доставки</h2>
                  <div className={styles.firstInputs}>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="city" className={styles.label}>
                        Город
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Введите ваш город"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={styles.input}
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
                        placeholder="Введите вашу улицу"
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
                        placeholder="Введите ваш дом"
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
                        placeholder="Введите вашу квартиру"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <h2 className={styles.sectionTitlePunct}>Пункт получения</h2>
                <div className={styles.checkoutMapSearchContainer}>
                  <input
                    type="text"
                    id="mapSearchInput"
                    name="mapSearchInput"
                    className={styles.checkoutMapSearchInput}
                    placeholder="Выберите пункт получения"
                    value={
                      mapSearchValue ||
                      [formData.city, formData.street, formData.house]
                        .filter(Boolean)
                        .join(", ")
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
                        alt="Сбербанк"
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
                </div>
              </div>
            </div>
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
                    disabled={
                      !formData.agreeToOffer || !formData.agreeToPrivacy
                    }
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
          </div>
        </div>
      </main>
      <Footer />
      {showSuccessModal && (
        <OrderSuccessModal
          orderNumber={orderNumber}
          onClose={handleCloseModal}
          onGoToAccount={handleGoToAccount}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
