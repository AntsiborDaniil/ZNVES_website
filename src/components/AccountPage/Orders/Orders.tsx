"use client";

import styles from "./Orders.module.css";
import Image from "next/image";

// Мок-данные заказа для демонстрации
const mockOrder = {
  id: "456378495",
  date: "24.09.2025",
  status: "не оплачен",
  buyer: {
    firstName: "Александр",
    lastName: "Смирнов",
    email: "abvgd@yandex.ru",
    phone: "abvgd@yandex.ru",
  },
  payment: {
    system: "Оплата по СПБ",
    amount: "15 440 P",
  },
  delivery: {
    service: "СДЭК: доставка в пункт выдачи",
    address: "г. Москва",
  },
  products: [
    {
      id: 1,
      name: "БЕЛОЕ ХУДИ ZNVES",
      color: "Синий",
      size: "ХS",
      quantity: 1,
      price: "15 440 P",
      image: "/images/catalogs/voyage.png",
    },
    {
      id: 2,
      name: "БЕЛОЕ ХУДИ ZNVES",
      color: "Синий",
      size: "ХS",
      quantity: 1,
      price: "15 440 P",
      image: "/images/catalogs/voyage.png",
    },
  ],
  total: {
    itemsCount: 3,
    totalAmount: "15 990 Р",
  },
};

const Orders = () => {
  return (
    <section className={styles.panel}>
      <div className={styles.ordersContainer}>
        <div className={styles.orderHeader}>
          <div className={styles.orderHeaderLeft}>
            <div className={styles.orderIcon}>
              <Image
                src="/images/account/info.png"
                alt="Заказ"
                width={20}
                height={20}
              />
            </div>
            <div className={styles.orderInfo}>
              <span className={styles.orderNumber}>
                Заказ: <strong>№{mockOrder.id}</strong> от {mockOrder.date}
              </span>
            </div>
          </div>
          <div className={styles.orderStatus}>
            <span className={styles.orderStatusLabel}>Статус:</span>{" "}
            <span
              className={
                mockOrder.status.toLowerCase().includes("не оплачен") ||
                mockOrder.status.toLowerCase().includes("неоплачен")
                  ? styles.orderStatusUnpaid
                  : styles.orderStatusPaid
              }
            >
              {mockOrder.status}
            </span>
          </div>
        </div>

        <div className={styles.buyerSection}>
          <div className={styles.sectionIcon}>
            <Image
              src="/images/account/accountImage.png"
              alt="Заказ"
              width={20}
              height={23}
            />
          </div>
          <div className={styles.buyerSectionText}>
            <h1 className={styles.sectionTitle}>Покупатель</h1>
            <div className={styles.buyerSectionInfo}>
              <div className={styles.buyerColumn}>
                <div className={styles.buyerSectionInfoItem}>
                  <span className={styles.label}>Имя</span>
                  <p className={styles.value}>{mockOrder.buyer.firstName}</p>
                </div>
                <div className={styles.buyerSectionInfoItem}>
                  <span className={styles.label}>Email</span>
                  <p className={styles.value}>{mockOrder.buyer.email}</p>
                </div>
              </div>
              <div className={styles.buyerColumn}>
                <div className={styles.buyerSectionInfoItem}>
                  <span className={styles.label}>Фамилия</span>
                  <p className={styles.value}>{mockOrder.buyer.lastName}</p>
                </div>
                <div className={styles.buyerSectionInfoItem}>
                  <span className={styles.label}>Номер телефона</span>
                  <p className={styles.value}>{mockOrder.buyer.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <div className={styles.sectionIcon}>
            <Image
              src="/images/account/buyImage.png"
              alt="Заказ"
              width={21.5}
              height={19.65}
            />
          </div>
          <div className={styles.paymentSectionText}>
            <h1 className={styles.sectionTitle}>Способ оплаты</h1>
            <div className={styles.paymentSectionInfo}>
              <div className={styles.paymentField}>
                <span className={styles.label}>Система оплаты</span>
                <div
                  className={`${styles.value} ${styles.paymentValueContainer}`}
                >
                  <Image
                    src="/images/checkout/sbp.png"
                    alt="СБП"
                    width={24}
                    height={24}
                  />
                  <span>{mockOrder.payment.system}</span>
                </div>
              </div>
              <div className={styles.paymentField}>
                <span className={styles.label}>Сумма</span>
                <span className={styles.value}>{mockOrder.payment.amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.deliverySection}>
          <div className={styles.sectionIcon}>
            <Image
              src="/images/account/delivery.png"
              alt="Заказ"
              width={23}
              height={18.4}
            />
          </div>
          <div className={styles.deliverySectionText}>
            <h1 className={styles.sectionTitle}>Способ доставки</h1>
            <div className={styles.deliverySectionInfo}>
              <div className={styles.deliveryField}>
                <span className={styles.label}>Служба доставки</span>
                <span className={styles.value}>
                  {mockOrder.delivery.service}
                </span>
              </div>
              <div className={styles.deliveryField}>
                <span className={styles.label}>Адрес</span>
                <span className={styles.value}>
                  {mockOrder.delivery.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productsSection}>
          <h1 className={styles.sectionTitle}>Товары</h1>
          <div className={styles.productsList}>
            {mockOrder.products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <Image
                  src="/images/test.png"
                  className={styles.productImage}
                  alt={product.name}
                  width={104}
                  height={149}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productDetail}>
                    <div className={styles.productDetails}>
                      <h1 className={styles.productName}>{product.name}</h1>
                      <div className={styles.productDetailsRow}>
                        <div className={styles.productDetailColumn}>
                          <span className={styles.productLabel}>Цвет</span>
                          <span className={styles.productText}>
                            {product.color}
                          </span>
                        </div>
                        <div className={styles.productDetailColumn}>
                          <span className={styles.productLabel}>Размер</span>
                          <span className={styles.productText}>
                            {product.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className={styles.productCount}>
                      Количество: {product.quantity}
                    </h3>
                  </div>
                  <div className={styles.productPrice}>
                    <span className={styles.priceLabel}>Сумма</span>
                    <span className={styles.priceText}>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <div className={styles.totalSection}>
          <div className={styles.totalAmount}>
            <h1 className={styles.totalTitle}>Итого</h1>
            <span className={styles.totalAmountValue}>
              {mockOrder.total.totalAmount}
            </span>
          </div>
          <h2 className={styles.totalItems}>
            Товары, {mockOrder.total.itemsCount} шт
          </h2>
          <button className={styles.payButton}>Оплатить заказ</button>
      </div>
    </section>
  );
};

export default Orders;
