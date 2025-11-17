"use client";

import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../data/products";
import Map from "../../components/Map/Map";
import styles from "./page.module.css";

const CheckoutPage = () => {
  const { items, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    postalCode: "",
    deliveryMethod: "courier",
    paymentMethod: "card",
  });

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  if (items.length === 0) {
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
        </main>ё
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
                  <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <div className={styles.addressRow}>
                    <input
                      type="text"
                      name="street"
                      placeholder="Улица"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="house"
                      placeholder="Дом"
                      value={formData.house}
                      onChange={handleInputChange}
                      className={styles.input}
                      style={{ width: "120px" }}
                    />
                  </div>
                  <div className={styles.addressRow}>
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Квартира"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={styles.input}
                      style={{ width: "120px" }}
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Индекс"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={styles.input}
                      style={{ width: "120px" }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Способ доставки</h2>
                <div className={styles.deliveryOptions}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === "courier"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <span>Курьером</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleInputChange}
                      className={styles.radio}
                    />
                    <span>Самовывоз</span>
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
                </div>
              </div>

              <button type="button" className={styles.submitButton}>
                Оформить заказ
              </button>
            </div>

            <div className={styles.rightColumn}>
              <h2 className={styles.orderTitle}>Ваш заказ</h2>
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
                        <h3 className={styles.orderItemTitle}>
                          {item.product.title}
                        </h3>
                        <div className={styles.orderItemDetails}>
                          <span>Цвет: {colorLabel.toUpperCase()}</span>
                          <span>Размер: {item.size.toUpperCase()}</span>
                          <span>Количество: {item.quantity}</span>
                        </div>
                        <div className={styles.orderItemPrice}>
                          {formatPrice(item.product.priceValue * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Итого</span>
                  <span className={styles.summaryTotal}>
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
