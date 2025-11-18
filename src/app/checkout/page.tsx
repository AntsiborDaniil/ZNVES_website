"use client";

import { useState, useEffect } from "react";
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
    setFormData((prev) => ({
      ...prev,
      city: addressData.city || prev.city,
      street: addressData.street || prev.street,
      house: addressData.house || prev.house,
    }));
  };

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
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.infoInputs}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Адрес доставки</h2>
                <div className={styles.delivery}>
                  <div className={styles.firstInputs}>
                    <input
                      type="text"
                      name="city"
                      placeholder="Город"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Улица"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.infoInputs}>
                    <input
                      type="text"
                      name="house"
                      placeholder="Дом"
                      value={formData.house}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Квартира"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
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
                <h2 className={styles.sectionTitle}>Карта доставки</h2>
                <div className={styles.mapSearchContainer}>
                  <input
                    type="text"
                    className={styles.mapSearchInput}
                    placeholder="Введите адрес или кликните на карте"
                    value={[formData.city, formData.street, formData.house]
                      .filter(Boolean)
                      .join(", ")}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Обновляем только если пользователь вводит текст
                      // При клике на карту значение обновится через handleAddressSelect
                      if (value) {
                        // Простой парсинг адреса для быстрого обновления
                        const parts = value.split(",").map((p) => p.trim());
                        setFormData((prev) => ({
                          ...prev,
                          city:
                            parts.length > 2
                              ? parts[2]
                              : parts.length > 0
                              ? parts[0]
                              : prev.city,
                          street:
                            parts.length > 1
                              ? parts[1]
                              : parts.length > 0 && parts.length <= 2
                              ? parts[0]
                              : prev.street,
                          house:
                            parts.length > 2
                              ? parts[1]
                              : parts.length === 2
                              ? parts[1]
                              : prev.house,
                        }));
                      }
                    }}
                  />
                </div>
                <div className={styles.mapContainer}>
                  <Map
                    city={formData.city}
                    street={formData.street}
                    house={formData.house}
                    onAddressSelect={handleAddressSelect}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Способ оплаты</h2>
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
                    <span>Банковская карта</span>
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
                    <span>Наличными при получении</span>
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
                    <span>Онлайн оплата</span>
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
                    <span>Рассрочка</span>
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
                          <div className={styles.orderItemDetails}>
                            <div className={styles.orderItemDetailRow}>
                              <span className={styles.orderItemDetailLabel}>
                                Цвет
                              </span>
                              <span className={styles.orderItemDetailValue}>
                                {colorLabel}
                              </span>
                            </div>
                            <div className={styles.orderItemDetailRow}>
                              <span className={styles.orderItemDetailLabel}>
                                Размер
                              </span>
                              <span className={styles.orderItemDetailValue}>
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
                      Я соглашаюсь с{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkboxLink}
                      >
                        условиями публичной оферты
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
