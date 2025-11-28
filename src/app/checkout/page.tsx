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
    city: "",
    street: "",
    house: "",
    apartment: "",
    deliveryMethod: "cdek",
    paymentMethod: "card",
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
    cdek: 300,
    yandex: 800,
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Контактная информация</h2>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="firstName" className={styles.label}>
                      Имя
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Введите ваше имя*"
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
                      placeholder="Введите вашу фамилию*"
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
                      placeholder="Введите ваш телефон*"
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
                      placeholder="Введите ваш email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Адрес доставки</h2>
                <div className={styles.delivery}>
                  <div className={styles.firstInputs}>
                    <div className={styles.inputWrapper}>
                      <label htmlFor="city" className={styles.label}>
                        Город
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Введите ваш город*"
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
                        placeholder="Введите вашу улицу*"
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
                        placeholder="Введите ваш дом*"
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
                        placeholder="Введите вашу квартиру*"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.deliveryOptions}>
                  <h2 className={styles.sectionTitle}>Доставка</h2>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="cdek"
                      checked={formData.deliveryMethod === "cdek"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <div className={styles.deliveryOptionContent}>
                      <div className={styles.deliveryOptionInfo}>
                        <span className={styles.deliveryOptionName}>
                          Доставка СДЭК
                        </span>
                        <span className={styles.deliveryOptionTime}>
                          3-5 дней
                        </span>
                      </div>
                      <span className={styles.deliveryOptionPrice}>
                        {formatPrice(deliveryPrices.cdek)}
                      </span>
                    </div>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="yandex"
                      checked={formData.deliveryMethod === "yandex"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <div className={styles.deliveryOptionContent}>
                      <div className={styles.deliveryOptionInfo}>
                        <span className={styles.deliveryOptionName}>
                          Доставка ЯНДЕКС
                        </span>
                        <span className={styles.deliveryOptionTime}>
                          6-7 дней
                        </span>
                      </div>
                      <span className={styles.deliveryOptionPrice}>
                        {formatPrice(deliveryPrices.yandex)}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Получение</h2>
                <div className={styles.checkoutMapSearchContainer}>
                  <input
                    type="text"
                    id="mapSearchInput"
                    name="mapSearchInput"
                    className={styles.checkoutMapSearchInput}
                    placeholder="Поиск адреса на карте"
                    value={
                      mapSearchValue ||
                      [formData.city, formData.street, formData.house]
                        .filter(Boolean)
                        .join(", ")
                    }
                    onChange={(e) => {
                      handleMapSearchChange(e.target.value);
                    }}
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
                <div className={styles.paymentOptions}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <span>Оплата банковской картой</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <div className={styles.paymentIcon}>
                      <Image
                        src="/images/checkout/sbp.png"
                        alt="СПБ"
                        width={19}
                        height={19}
                      />
                    </div>
                    <span>Оплата по СПБ </span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === "online"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <div className={styles.paymentIcon}>
                      <Image
                        src="/images/checkout/dolya.png"
                        alt="Долями"
                        width={19}
                        height={19}
                      />
                    </div>
                    <span>Долями</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="installment"
                      checked={formData.paymentMethod === "installment"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <div className={styles.paymentIcon}>
                      <Image
                        src="/images/checkout/y.png"
                        alt="Яндекс Pay"
                        width={19}
                        height={19}
                      />
                    </div>
                    <span>Яндекс Pay</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.rightPart}>
              <div className={styles.orderHeader}>
                <h2 className={styles.orderTitle}>Ваши товары</h2>
                <Link href="/cart" className={styles.editLink}>
                  Изменить
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
                              fill
                              className={styles.orderImage}
                              sizes="120px"
                            />
                          </div>
                          <div className={styles.orderItemInfo}>
                            <div className={styles.orderItemCategory}>
                              {fullProduct?.category ||
                                item.product.category ||
                                ""}
                            </div>
                            <h3 className={styles.orderItemTitle}>
                              {item.product.title}
                            </h3>
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
                            <div className={styles.orderItemBottom}>
                              <div className={styles.quantityControls}>
                                <button
                                  type="button"
                                  className={styles.quantityButton}
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      item.quantity - 1
                                    )
                                  }
                                  aria-label="Уменьшить количество"
                                >
                                  −
                                </button>
                                <span className={styles.quantityValue}>
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className={styles.quantityButton}
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      item.quantity + 1
                                    )
                                  }
                                  aria-label="Увеличить количество"
                                >
                                  +
                                </button>
                              </div>
                              <div className={styles.orderItemPrice}>
                                {formatPrice(
                                  item.product.priceValue * item.quantity
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.orderSummaryBlock}>
                  <div className={styles.orderSummary}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Доставка:</span>
                      <span className={styles.summaryValue}>
                        {formatPrice(
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
