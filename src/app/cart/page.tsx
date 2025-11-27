"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/ui/CartItem/CartItem";
import { useCart } from "../../contexts/CartContext";
import { getProductById } from "../../data/products";
import { useWindowSize } from "../../hooks/useWindowSize";
import Image from "next/image";
import Map from "../../components/Map/Map";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = width > 0 && width <= 768;

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Цены доставки
  const deliveryPrices = {
    cdek: 350,
    yandex: 350,
  };

  // Расчет итоговой суммы
  const calculateTotal = () => {
    const itemsTotal = getTotalPrice();
    const deliveryPrice =
      deliveryPrices[formData.deliveryMethod as keyof typeof deliveryPrices] ||
      0;
    return itemsTotal + deliveryPrice;
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

    if (lastGeocodedAddressRef.current === fullAddress) {
      return;
    }

    lastGeocodedAddressRef.current = fullAddress;
    isUpdatingFromMapRef.current = true;

    const newAddress = {
      city: addressData.city || "",
      street: addressData.street || "",
      house: addressData.house || "",
    };

    setFormData((prev) => ({
      ...prev,
      ...newAddress,
    }));

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

  useEffect(() => {
    if (showSuccessModal && items.length > 0) {
      clearCart();
    }
  }, [showSuccessModal, items.length, clearCart]);

  const handleSubmitOrder = () => {
    if (!formData.agreeToOffer || !formData.agreeToPrivacy) {
      return;
    }

    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
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

  const handleCheckoutClick = () => {
    if (isMobile) {
      setShowCheckoutForm(true);
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.cart}>
        <Header variant="green" />
        <main className={styles.main}>
          <div className={styles.cartContainer}>
            <div className={styles.emptyCart}>
              <h1 className={styles.emptyTitle}>Корзина пуста</h1>
              <p className={styles.emptyText}>
                Добавьте товары в корзину, чтобы продолжить покупки
              </p>
              <Link href="/catalog" className={styles.shopButton}>
                Перейти в каталог
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <Header variant="green" />
      <main className={styles.main}>
        <div className={styles.cartContainer}>
          <Link href="/catalog" className={styles.backLink}>
            Вернуться в каталог
          </Link>
          <h1 className={styles.cartTitle}>Корзина</h1>
          <div className={styles.mainContentWrapper}>
            <div className={styles.cartItemsWrapper}>
              {items.map((item, index) => {
                const fullProduct = getProductById(item.productId);
                const colorLabel =
                  fullProduct?.availableColors.find(
                    (c) => c.value === item.color
                  )?.label || item.color;

                return (
                  <CartItem
                    key={`${item.productId}-${item.size}-${item.color}-${index}`}
                    item={item}
                    colorLabel={colorLabel}
                    sku={fullProduct?.sku}
                    onRemove={() =>
                      removeItem(item.productId, item.size, item.color)
                    }
                    onQuantityDecrease={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.color,
                        item.quantity - 1
                      )
                    }
                    onQuantityIncrease={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.color,
                        item.quantity + 1
                      )
                    }
                    formatPrice={formatPrice}
                  />
                );
              })}
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Итого</span>
                <span className={styles.summaryTotal}>
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <div className={styles.promoSection}>
                <input
                  id="promo-code"
                  type="text"
                  className={styles.promoInput}
                  placeholder="Промокод"
                />
              </div>
              <button
                type="button"
                className={`${styles.checkoutButton} ${
                  showCheckoutForm && isMobile
                    ? styles.checkoutButtonActive
                    : ""
                }`}
                onClick={handleCheckoutClick}
                disabled={showCheckoutForm && isMobile}
              >
                {isMobile ? "Оформить заказ" : "Перейти к оформлению"}
              </button>
            </div>
            {showCheckoutForm && isMobile && (
              <div className={styles.mobileCheckoutForm}>
                <h2 className={styles.checkoutFormTitle}>Оформление заказа</h2>

                <div className={styles.checkoutSection}>
                  <h3 className={styles.checkoutSectionTitle}>
                    Контактная информация
                  </h3>
                  <div className={styles.checkoutInputsRow}>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-firstName"
                        className={styles.checkoutLabel}
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        id="mobile-firstName"
                        name="firstName"
                        placeholder="Введите ваше имя*"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-lastName"
                        className={styles.checkoutLabel}
                      >
                        Фамилия
                      </label>
                      <input
                        type="text"
                        id="mobile-lastName"
                        name="lastName"
                        placeholder="Введите вашу фамилию*"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                  </div>
                  <div className={styles.checkoutInputsRow}>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-phone"
                        className={styles.checkoutLabel}
                      >
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="mobile-phone"
                        name="phone"
                        placeholder="Введите ваш телефон*"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-email"
                        className={styles.checkoutLabel}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="mobile-email"
                        name="email"
                        placeholder="Введите ваш email*"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.checkoutSection}>
                  <h3 className={styles.checkoutSectionTitle}>
                    Адрес доставки
                  </h3>
                  <div className={styles.checkoutInputsRow}>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-city"
                        className={styles.checkoutLabel}
                      >
                        Город
                      </label>
                      <input
                        type="text"
                        id="mobile-city"
                        name="city"
                        placeholder="Введите ваш город*"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-street"
                        className={styles.checkoutLabel}
                      >
                        Улица
                      </label>
                      <input
                        type="text"
                        id="mobile-street"
                        name="street"
                        placeholder="Введите вашу улицу*"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                  </div>
                  <div className={styles.checkoutInputsRow}>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-house"
                        className={styles.checkoutLabel}
                      >
                        Дом
                      </label>
                      <input
                        type="text"
                        id="mobile-house"
                        name="house"
                        placeholder="Введите ваш дом*"
                        value={formData.house}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                    <div className={styles.checkoutInputWrapper}>
                      <label
                        htmlFor="mobile-apartment"
                        className={styles.checkoutLabel}
                      >
                        Квартира
                      </label>
                      <input
                        type="text"
                        id="mobile-apartment"
                        name="apartment"
                        placeholder="Введите вашу квартиру*"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className={styles.checkoutInput}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.checkoutSection}>
                  <h3 className={styles.checkoutSectionTitle}>Доставка</h3>
                  <div className={styles.checkoutDeliveryOptions}>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="cdek"
                        checked={formData.deliveryMethod === "cdek"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <div className={styles.checkoutDeliveryOptionContent}>
                        <div className={styles.checkoutDeliveryOptionInfo}>
                          <span className={styles.checkoutDeliveryOptionName}>
                            Доставка СДЭК
                          </span>
                          <span className={styles.checkoutDeliveryOptionTime}>
                            3-5 дней
                          </span>
                        </div>
                        <span className={styles.checkoutDeliveryOptionPrice}>
                          {formatPrice(deliveryPrices.cdek)}
                        </span>
                      </div>
                    </label>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="yandex"
                        checked={formData.deliveryMethod === "yandex"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <div className={styles.checkoutDeliveryOptionContent}>
                        <div className={styles.checkoutDeliveryOptionInfo}>
                          <span className={styles.checkoutDeliveryOptionName}>
                            Доставка ЯНДЕКС
                          </span>
                          <span className={styles.checkoutDeliveryOptionTime}>
                            0-1 дней
                          </span>
                        </div>
                        <span className={styles.checkoutDeliveryOptionPrice}>
                          {formatPrice(deliveryPrices.yandex)}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.checkoutSection}>
                  <h3 className={styles.checkoutSectionTitle}>Получение</h3>
                  <div className={styles.checkoutMapSearchContainer}>
                    <input
                      type="text"
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

                <div className={styles.checkoutSection}>
                  <h3 className={styles.checkoutPaymentTitle}>Способ оплаты</h3>
                  <div className={styles.checkoutPaymentOptions}>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <span>Оплата банковской картой</span>
                    </label>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <div className={styles.checkoutPaymentIcon}>
                        <Image
                          src="/images/checkout/sbp.png"
                          alt="СПБ"
                          width={19}
                          height={19}
                        />
                      </div>
                      <span>Оплата по СПБ </span>
                    </label>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <div className={styles.checkoutPaymentIcon}>
                        <Image
                          src="/images/checkout/dolya.png"
                          alt="Долями"
                          width={19}
                          height={19}
                        />
                      </div>
                      <span>Долями</span>
                    </label>
                    <label className={styles.checkoutRadioLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="installment"
                        checked={formData.paymentMethod === "installment"}
                        onChange={handleInputChange}
                        className={styles.checkoutRadio}
                      />
                      <div className={styles.checkoutPaymentIcon}>
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

                <button
                  type="button"
                  className={styles.checkoutSubmitButton}
                  disabled={!formData.agreeToOffer || !formData.agreeToPrivacy}
                  onClick={handleSubmitOrder}
                >
                  Оформить заказ
                </button>

                <div className={styles.checkoutCheckboxes}>
                  <label className={styles.checkoutCheckboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToOffer"
                      checked={formData.agreeToOffer}
                      onChange={handleInputChange}
                      className={styles.checkoutCheckbox}
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkoutCheckboxLink}
                      >
                        публичной оферты
                      </Link>
                    </span>
                  </label>
                  <label className={styles.checkoutCheckboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className={styles.checkoutCheckbox}
                    />
                    <span>
                      Я принимаю{" "}
                      <Link
                        href="/privacy"
                        className={styles.checkoutCheckboxLink}
                      >
                        политику конфиденциальности
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}
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

export default CartPage;
