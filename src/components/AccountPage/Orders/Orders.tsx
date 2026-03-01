"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Orders.module.css";
import Image from "next/image";
import {
  getMyOrders,
  apiOrderToAccountView,
  getPaymentUrl,
  getYandexPaymentUrl,
  type AccountOrderView,
} from "../../../api/order/orderApi";
import LoadingStub from "../../LoadingStub/LoadingStub";
import CartOrderErrorModal from "../../CartOrderErrorModal/CartOrderErrorModal";

interface OrderProduct {
  id: number;
  name: string;
  category: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
  priceValue: number;
  image: string;
}

interface OrderData {
  id: string;
  date: string;
  status: string;
  buyer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    type: string;
    method: string;
    /** Полный адрес из API (доставка) */
    fullAddress?: string;
  };
  payment: {
    method: string;
    amount: string;
  };
  products: OrderProduct[];
  total: {
    itemsCount: number;
    totalAmount: string;
    totalAmountValue: number;
  };
}

const emptyBuyer = { firstName: "", lastName: "", email: "", phone: "" };
const emptyDelivery = {
  firstName: "", lastName: "", email: "", phone: "",
  city: "", street: "", house: "", apartment: "",
  type: "cdek", method: "pickup",
};

function accountViewToOrderData(view: AccountOrderView): OrderData {
  const deliveryType = (view.deliveryService || "cdek").toLowerCase();
  const deliveryMethod = deliveryType.includes("yandex") ? "pickup" : "pickup";
  const products: OrderProduct[] = (view.products || []).map((p, i) => ({
    id: i,
    name: p.name || "",
    category: "",
    color: p.color ?? "",
    size: p.size ?? "",
    quantity: p.quantity ?? 1,
    price: "",
    priceValue: 0,
    image: p.image || "",
  }));
  return {
    id: view.id,
    date: view.date,
    status: view.status,
    buyer: view.buyer ? { ...view.buyer } : { ...emptyBuyer },
    delivery: {
      ...emptyDelivery,
      type: view.deliveryService || "cdek",
      method: deliveryMethod,
      fullAddress: view.deliveryAddress,
    },
    payment: { method: view.paymentType || "prepayment", amount: view.totalAmount || "" },
    products,
    total: { itemsCount: products.length, totalAmount: view.totalAmount ?? "", totalAmountValue: 0 },
  };
}

const getPaymentSystemName = (method: string) => {
  const paymentNames: Record<string, string> = {
    sberbank: "Оплата по СПБ",
    yandexpay: "Яндекс Pay",
    installment: "Долями",
    card: "Картой онлайн",
    prepayment: "Предоплата",
  };
  return paymentNames[method] || method || "Оплата по СПБ";
};

const getDeliveryServiceName = (type: string, method: string) => {
  if (type === "cdek") {
    return method === "pickup"
      ? "СДЭК: доставка в пункт выдачи"
      : "СДЭК: курьером";
  } else if (type === "yandex") {
    return method === "pickup"
      ? "Яндекс.Курьер: пункт выдачи"
      : "Яндекс.Курьер: курьером";
  }
  return "СДЭК: доставка в пункт выдачи";
};

const getStatusDisplayName = (status: string): string => {
  const s = (status || "").toLowerCase();
  if (s === "pending_payment" || s === "ожидает оплаты") return "Ожидает оплаты";
  if (s === "paid" || s === "оплачен") return "Оплачен";
  if (s === "created" || s === "новый") return "Новый";
  return status || "—";
};

const isUnpaidStatus = (status: string) => {
  const s = (status || "").toLowerCase();
  return (
    s === "created" ||
    s === "pending_payment" ||
    status === "не оплачен" ||
    status?.toLowerCase().includes("неоплачен")
  );
};

type OrdersProps = {
  initialOrderId?: string;
};

const Orders = ({ initialOrderId }: OrdersProps) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [orderPayError, setOrderPayError] = useState<string | null>(null);
  const selectedOrderSectionRef = useRef<HTMLDivElement>(null);

  const ORDER_ERROR_MESSAGE =
    "Возможно, заказано слишком много товара или товар отсутствует в наличии.";

  useEffect(() => {
    Promise.all([getMyOrders(true), getMyOrders(false)])
      .then(([activeList, restList]) => {
        const activeViews = activeList.map(apiOrderToAccountView);
        const restViews = restList.map(apiOrderToAccountView);
        const combined: AccountOrderView[] = [...activeViews, ...restViews];
        const sorted = combined
          .slice()
          .sort((a, b) => {
            const parse = (d: string) => {
              const [day, month, year] = d.split(".");
              return new Date(`${year}-${month}-${day}`).getTime();
            };
            return parse(b.date) - parse(a.date);
          });
        const orderDataList = sorted.map(accountViewToOrderData);
        setOrders(orderDataList);

        if (orderDataList.length > 0) {
          const toSelect =
            initialOrderId
              ? orderDataList.find((o) => o.id === initialOrderId)
              : orderDataList[0];
          setSelectedOrder(toSelect ?? orderDataList[0]);
          setIsDetailsOpen(true);
        } else {
          setSelectedOrder(null);
        }
      })
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, [initialOrderId]);

  // Автоматически открываем детали при смене выбранного заказа
  useEffect(() => {
    if (selectedOrder) {
      setIsDetailsOpen(true);
    }
  }, [selectedOrder?.id]);

  // Прокрутка к выбранному заказу при смене выбора (медленная плавная анимация)
  useEffect(() => {
    const el = selectedOrderSectionRef.current;
    if (!selectedOrder || !el) return;

    const duration = 900;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const scrollable =
      document.scrollingElement ||
      (document.documentElement as Element);
    const startTop = scrollable.scrollTop;
    const targetTop =
      startTop + el.getBoundingClientRect().top;

    let rafId: number;
    const startTime = { current: 0 };

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      scrollable.scrollTop = startTop + (targetTop - startTop) * eased;
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [selectedOrder?.id]);

  const handlePayOrder = async () => {
    if (!selectedOrder || isPaying) return;
    const orderId = Number(selectedOrder.id);
    if (!Number.isFinite(orderId)) {
      setOrderPayError(ORDER_ERROR_MESSAGE);
      return;
    }
    setIsPaying(true);
    try {
      const baseUrl =
        typeof window !== "undefined" ? `${window.location.origin}/account` : "";
      const returnUrl = `${baseUrl}?payment=success`;
      const cancelUrl = `${baseUrl}?payment=cancel`;
      const method = (selectedOrder.payment?.method || "").toLowerCase();
      const useYandex = method === "yandexpay" || method === "installment";
      const paymentResponse = useYandex
        ? await getYandexPaymentUrl(orderId, {
            return_url: returnUrl,
            cancel_url: cancelUrl,
          })
        : await getPaymentUrl(orderId, {
            return_url: returnUrl,
            cancel_url: cancelUrl,
          });
      const paymentUrl =
        paymentResponse.confirmation_url || paymentResponse.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }
      setOrderPayError(ORDER_ERROR_MESSAGE);
    } catch {
      setOrderPayError(ORDER_ERROR_MESSAGE);
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <section className={styles.panel}>
        <div className={styles.ordersLoadingWrap}>
          <div className={styles.ordersLoadingCard}>
            <LoadingStub label="Загрузка заказов…" inline />
          </div>
          <div className={styles.ordersLoadingSkeletons}>
            <div className={styles.ordersLoadingSkeleton} />
            <div className={styles.ordersLoadingSkeleton} />
            <div className={styles.ordersLoadingSkeleton} />
          </div>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.emptyOrdersWrap}>
          <div className={styles.emptyOrdersIcon} aria-hidden>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
            </svg>
          </div>
          <h2 className={styles.emptyOrdersTitle}>У вас пока нет заказов</h2>
          <p className={styles.emptyOrdersText}>
            После оформления заказа он появится здесь. Пока можно выбрать что-нибудь в каталоге.
          </p>
          <Link href="/catalog" className={styles.emptyOrdersLink}>
            Перейти в каталог
          </Link>
        </div>
      </section>
    );
  }

  // Разделяем заказы на выбранный и остальные
  const otherOrders = orders.filter((order) => order.id !== selectedOrder?.id);

  return (
    <section className={styles.panel}>
      {/* Выбранный заказ (плашка) - сверху */}
      {selectedOrder && (
        <div ref={selectedOrderSectionRef} className={styles.selectedOrderSection}>
          <div
            className={`${styles.orderCard} ${styles.orderCardActive}`}
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsDetailsOpen(!isDetailsOpen);
              }
            }}
          >
            <div className={styles.orderCardContent}>
              <div className={styles.orderCardHeader}>
                <h1 className={styles.orderCardTitle}>
                  Заказ от {selectedOrder.date}
                </h1>
                <Image
                  src="/images/account/arrowRight.png"
                  alt="Стрелка"
                  width={41}
                  height={39}
                  className={`${styles.orderCardArrow} ${
                    isDetailsOpen ? styles.orderCardArrowRotated : ""
                  }`}
                  loading="lazy"
                />
              </div>
              <div className={styles.orderCardDetails}>
                <div className={styles.orderCardDetailsLeft}>
                  <div className={styles.orderCardDetailsTop}>
                    <div className={styles.orderCardNumber}>
                      №{selectedOrder.id}
                    </div>
                        <div className={styles.orderCardStatus}>
                      {isUnpaidStatus(selectedOrder.status)
                        ? "Ожидает оплаты"
                        : "Оплачен"}
                    </div>
                  </div>
                    <div className={styles.orderCardDetailsBottom}>
                      <div className={styles.orderCardState}>
                        <span>•</span>{" "}
                        <h2 className={styles.orderCardStateText}>
                          {getStatusDisplayName(selectedOrder.status)}
                        </h2>
                      </div>
                    </div>
                </div>
                <div className={styles.orderCardDetailsRight}>
                  <div className={styles.orderCardThumbnails}>
                    {selectedOrder.products
                      .slice(0, 3)
                      .map((product, index) => (
                        <div key={index} className={styles.orderCardThumbnail}>
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={60}
                              height={60}
                              className={styles.orderCardThumbnailImage}
                              loading="lazy"
                            />
                          ) : (
                            <div
                              className={styles.orderCardThumbnailPlaceholder}
                              title={product.name}
                              aria-hidden
                            />
                          )}
                        </div>
                      ))}
                    {selectedOrder.products.length > 3 && (
                      <div className={styles.orderCardThumbnailMore}>
                        +{selectedOrder.products.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Детали выбранного заказа - под плашкой */}
          <div
            className={`${styles.orderDetailsWrapper} ${
              isDetailsOpen
                ? styles.orderDetailsOpen
                : styles.orderDetailsClosed
            }`}
          >
            <div className={styles.orderDetailsContent}>
              <div className={styles.ordersContainer}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderHeaderLeft}>
                    <div className={styles.orderIcon}>
                      <Image
                        src="/images/account/info.png"
                        alt="Заказ"
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderNumber}>
                        Заказ: <strong>№{selectedOrder.id}</strong> от{" "}
                        {selectedOrder.date}
                      </span>
                    </div>
                  </div>
                  <div className={styles.orderStatus}>
                    <span className={styles.orderStatusLabel}>Статус:</span>{" "}
                    <span
                      className={
                        isUnpaidStatus(selectedOrder.status)
                          ? styles.orderStatusUnpaid
                          : styles.orderStatusPaid
                      }
                    >
                      {getStatusDisplayName(selectedOrder.status)}
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
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.buyerSectionText}>
                    <h1 className={styles.sectionTitle}>Покупатель</h1>
                    <div className={styles.buyerSectionInfo}>
                      <div className={styles.buyerColumn}>
                        <div className={styles.buyerSectionInfoItem}>
                          <span className={styles.label}>Имя</span>
                          <p className={styles.value}>
                            {selectedOrder.buyer.firstName}
                          </p>
                        </div>
                        <div className={styles.buyerSectionInfoItem}>
                          <span className={styles.label}>Email</span>
                          <p className={styles.value}>
                            {selectedOrder.buyer.email}
                          </p>
                        </div>
                      </div>
                      <div className={styles.buyerColumn}>
                        <div className={styles.buyerSectionInfoItem}>
                          <span className={styles.label}>Фамилия</span>
                          <p className={styles.value}>
                            {selectedOrder.buyer.lastName}
                          </p>
                        </div>
                        <div className={styles.buyerSectionInfoItem}>
                          <span className={styles.label}>Номер телефона</span>
                          <p className={styles.value}>
                            {selectedOrder.buyer.phone}
                          </p>
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
                      loading="lazy"
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
                          <span>
                            {getPaymentSystemName(selectedOrder.payment.method)}
                          </span>
                          {selectedOrder.payment.method === "sberbank" && (
                            <Image
                              src="/images/account/sbpAcc.png"
                              alt="СБП"
                              width={18}
                              height={18}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.paymentField}>
                        <span className={styles.label}>Сумма</span>
                        <span className={styles.valuePay}>
                          {selectedOrder.payment.amount}
                        </span>
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
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.deliverySectionText}>
                    <h1 className={styles.sectionTitle}>Способ доставки</h1>
                    <div className={styles.deliverySectionInfo}>
                      <div className={styles.deliveryField}>
                        <span className={styles.label}>Служба доставки</span>
                        <span className={styles.value}>
                          {getDeliveryServiceName(
                            selectedOrder.delivery.type,
                            selectedOrder.delivery.method
                          )}
                        </span>
                      </div>
                      <div className={styles.deliveryField}>
                        <span className={styles.label}>Адрес</span>
                        <span className={styles.value}>
                          {selectedOrder.delivery.fullAddress ||
                            (selectedOrder.delivery.city ||
                            selectedOrder.delivery.street ||
                            selectedOrder.delivery.house
                              ? [
                                  selectedOrder.delivery.city,
                                  selectedOrder.delivery.street,
                                  selectedOrder.delivery.house,
                                  selectedOrder.delivery.apartment,
                                ]
                                  .filter(Boolean)
                                  .join(", ")
                              : "—")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.productsSection}>
                  <h1 className={styles.sectionTitle}>Товары</h1>
                  <div className={styles.productsList}>
                    {selectedOrder.products.map((product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className={styles.productItem}
                      >
                        {product.image ? (
                          <Image
                            src={product.image}
                            className={styles.productImage}
                            alt={product.name}
                            width={104}
                            height={149}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className={styles.productImagePlaceholder}
                            aria-hidden
                          />
                        )}
                        <div className={styles.productDetails}>
                          <div className={styles.upper}>
                            <div className={styles.left}>
                              <h3 className={styles.category}>
                                {product.category}
                              </h3>
                              <h1 className={styles.title}>{product.name}</h1>
                            </div>
                            <div className={styles.right}>
                              <h3 className={styles.amountWord}>Кол-во</h3>
                              <h1 className={styles.amount}>{product.quantity} шт</h1>
                              {product.price && (
                                <>
                                  <h3 className={styles.amountWord}>Сумма</h3>
                                  <h1 className={styles.amount}>{product.price}</h1>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={styles.bottom}>
                            <div className={styles.leftBottom}>
                              <h3 className={styles.labelBottom}>Цвет</h3>
                              <h1 className={styles.wordColor}>
                                {product.color}
                              </h1>
                            </div>
                            <div className={styles.rightBottom}>
                              <h3 className={styles.labelBottom}>Размер</h3>
                              <h1 className={styles.word}>{product.size}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Блок Итого во всю ширину */}
              <div className={styles.totalSection}>
                {isUnpaidStatus(selectedOrder.status) && (
                  <button
                    type="button"
                    className={styles.payButton}
                    onClick={handlePayOrder}
                    disabled={isPaying}
                  >
                    {isPaying ? "Перенаправление к оплате…" : "Оплатить заказ"}
                  </button>
                )}
                <div className={styles.totalInfo}>
                  <div className={styles.totalAmount}>
                    <h1 className={styles.totalTitle}>Итого</h1>
                    <span className={styles.totalAmountValue}>
                      {selectedOrder.total.totalAmount}
                    </span>
                  </div>
                  <h2 className={styles.totalItems}>
                    Товары, {selectedOrder.total.itemsCount} шт
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Остальные заказы - под деталями выбранного */}
      {otherOrders.length > 0 && (
        <div className={styles.otherOrdersSection}>
          <div className={styles.ordersList}>
            {otherOrders.map((order) => (
              <div
                key={order.id}
                className={styles.orderCard}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsDetailsOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedOrder(order);
                    setIsDetailsOpen(true);
                  }
                }}
              >
                <div className={styles.orderCardContent}>
                  <div className={styles.orderCardHeader}>
                    <h1 className={styles.orderCardTitle}>
                      Заказ от {order.date}
                    </h1>
                    <Image
                      src="/images/account/arrowRight.png"
                      alt="Стрелка"
                      width={41}
                      height={39}
                      className={styles.orderCardArrow}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.orderCardDetails}>
                    <div className={styles.orderCardDetailsLeft}>
                      <div className={styles.orderCardDetailsTop}>
                        <div className={styles.orderCardNumber}>
                          №{order.id}
                        </div>
                        <div className={styles.orderCardStatus}>
                          {isUnpaidStatus(order.status)
                            ? "Ожидает оплаты"
                            : "Оплачен"}
                        </div>
                      </div>
                      <div className={styles.orderCardDetailsBottom}>
                        <div className={styles.orderCardState}>
                          <span>•</span>{" "}
                          <h2 className={styles.orderCardStateText}>
                            {getStatusDisplayName(order.status)}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderCardDetailsRight}>
                      <div className={styles.orderCardThumbnails}>
                        {order.products.slice(0, 3).map((product, index) => (
                          <div
                            key={index}
                            className={styles.orderCardThumbnail}
                          >
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={60}
                                height={60}
                                className={styles.orderCardThumbnailImage}
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className={styles.orderCardThumbnailPlaceholder}
                                title={product.name}
                                aria-hidden
                              />
                            )}
                          </div>
                        ))}
                        {order.products.length > 3 && (
                          <div className={styles.orderCardThumbnailMore}>
                            +{order.products.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {orderPayError && (
        <CartOrderErrorModal
          message={orderPayError}
          onClose={() => setOrderPayError(null)}
        />
      )}
    </section>
  );
};

export default Orders;
