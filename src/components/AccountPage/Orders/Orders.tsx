"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Orders.module.css";
import Image from "next/image";
import {
  fetchAccountOrders,
  apiOrderToAccountView,
  getPaymentUrl,
  getYandexPaymentUrl,
  redirectToPaymentUrl,
  resolvePaymentRedirectUrl,
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
  updatedDate?: string;
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
    updatedDate: view.updatedDate,
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
    sberbank: "СБП",
    yandexpay: "Яндекс Pay",
    installment: "Долями",
    card: "Банковской картой",
    prepayment: "Предоплата",
  };
  return paymentNames[method] || method || "СБП";
};

const getDeliveryServiceName = (type: string, method: string) => {
  const t = (type || "").toLowerCase();
  if (t.includes("yandex")) {
    return "Яндекс курьером";
  }
  if (t.includes("cdek") || t === "cdek") {
    return method === "pickup"
      ? "СДЭК: доставка в пункт выдачи"
      : "СДЭК: курьером";
  }
  return type || "—";
};

const getStatusDisplayName = (status: string): string => {
  const s = (status || "").toLowerCase();
  if (
    s === "pending_payment" ||
    s === "created" ||
    s === "новый" ||
    s.includes("ожидает")
  ) {
    return "Новый (не оплачен)";
  }
  if (s === "paid" || s === "оплачен") return "Оплачен";
  if (s === "shipped" || s.includes("доставляется") || s.includes("в пути")) {
    return "Доставляется";
  }
  if (
    s === "completed" ||
    s === "завершен" ||
    s === "завершён" ||
    s.includes("доставлен")
  ) {
    return "Завершен";
  }
  return status || "—";
};

const isUnpaidStatus = (status: string) => {
  const s = (status || "").toLowerCase();
  return (
    s === "created" ||
    s === "pending_payment" ||
    status === "не оплачен" ||
    s.includes("неоплачен") ||
    s.includes("ожидает")
  );
};

const isDeliveredStatus = (status: string) => {
  const s = (status || "").toLowerCase();
  return (
    s === "completed" ||
    s === "завершен" ||
    s === "завершён" ||
    s.includes("доставлен")
  );
};

const getDetailStatusLabel = (status: string): string => {
  return getStatusDisplayName(status);
};

const formatShortMonthDate = (date: string): string => {
  const parts = date.split(".");
  if (parts.length !== 3) return date;
  const [day, month] = parts;
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const monthIndex = Number(month) - 1;
  return `${Number(day)} ${months[monthIndex] ?? month}`;
};

const getDeliveredBadgeText = (order: OrderData): string => {
  const source = order.updatedDate || order.date;
  return `Доставлен ${formatShortMonthDate(source)}`;
};

const formatColorLabel = (color: string): string => {
  const map: Record<string, string> = {
    black: "Черный",
    white: "Белый",
    green: "Зеленый",
    blue: "Синий",
    navy: "Темно-синий",
    red: "Красный",
    grey: "Серый",
    gray: "Серый",
  };
  const key = (color || "").toLowerCase().trim();
  return map[key] || color || "—";
};

const formatSizeLabel = (size: string): string => {
  const s = (size || "").trim();
  if (!s) return "—";
  return s.toUpperCase();
};

const isPaidTrackableStatus = (status: string) => {
  const s = (status || "").toLowerCase();
  return (
    s === "paid" ||
    s === "оплачен" ||
    s.includes("доставляется") ||
    s.includes("в пути") ||
    s === "shipped"
  );
};

const getTrackingUrl = (order: OrderData): string => {
  const type = (order.delivery.type || "").toLowerCase();
  if (type.includes("yandex")) {
    return "https://dostavka.yandex.ru/tracking";
  }
  return "https://www.cdek.ru/ru/tracking";
};

const formatOrderDateTitle = (date: string): string => {
  const parts = date.split(".");
  if (parts.length !== 3) return `Заказ от ${date}`;
  const [day, month, year] = parts;
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const monthIndex = Number(month) - 1;
  const monthLabel = months[monthIndex] ?? month;
  return `Заказ от ${Number(day)} ${monthLabel} ${year}`;
};

type OrdersProps = {
  initialOrderId?: string;
  onOrderSelect?: (order: { id: string; title: string } | null) => void;
};

const Orders = ({ initialOrderId, onOrderSelect }: OrdersProps) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [orderPayError, setOrderPayError] = useState<string | null>(null);
  const [isBuyerExpanded, setIsBuyerExpanded] = useState(false);
  const selectedOrderSectionRef = useRef<HTMLDivElement>(null);

  const ORDER_ERROR_MESSAGE =
    "К сожалению, оплатить заказ не удалось: один или несколько товаров отсутствуют в наличии или их количество ограничено. Пожалуйста, обновите состав заказа и попробуйте снова либо свяжитесь со службой поддержки.";

  useEffect(() => {
    fetchAccountOrders()
      .then((apiOrders) => {
        const sorted = apiOrders
          .map(apiOrderToAccountView)
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

        if (initialOrderId && orderDataList.length > 0) {
          const selected =
            orderDataList.find((o) => o.id === initialOrderId) ?? null;
          setSelectedOrder(selected);
          setIsDetailsOpen(Boolean(selected));
          if (selected) {
            onOrderSelect?.({
              id: selected.id,
              title: formatOrderDateTitle(selected.date),
            });
          } else {
            onOrderSelect?.(null);
          }
        } else {
          setSelectedOrder(null);
          setIsDetailsOpen(false);
          onOrderSelect?.(null);
        }
      })
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, [initialOrderId]);

  const openOrder = (order: OrderData) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
    setIsBuyerExpanded(false);
    onOrderSelect?.({
      id: order.id,
      title: formatOrderDateTitle(order.date),
    });
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setIsDetailsOpen(false);
    setIsBuyerExpanded(false);
    onOrderSelect?.(null);
  };

  // Прокрутка к открытому заказу
  useEffect(() => {
    const el = selectedOrderSectionRef.current;
    if (!selectedOrder || !isDetailsOpen || !el) return;

    const duration = 500;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const scrollable =
      document.scrollingElement ||
      (document.documentElement as Element);
    const startTop = scrollable.scrollTop;
    const targetTop = startTop + el.getBoundingClientRect().top - 24;

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
  }, [selectedOrder?.id, isDetailsOpen]);

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
      const paymentUrl = resolvePaymentRedirectUrl(paymentResponse);
      if (paymentUrl) {
        redirectToPaymentUrl(paymentUrl);
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
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H5.2L6.2 7M6.2 7L8 14H18L21 7H6.2ZM9 20.5C9 21.3284 8.32843 22 7.5 22C6.67157 22 6 21.3284 6 20.5C6 19.6716 6.67157 19 7.5 19C8.32843 19 9 19.6716 9 20.5ZM19 20.5C19 21.3284 18.3284 22 17.5 22C16.6716 22 16 21.3284 16 20.5C16 19.6716 16.6716 19 17.5 19C18.3284 19 19 19.6716 19 20.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={styles.emptyOrdersTitle}>У вас пока нет заказов</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      {!(selectedOrder && isDetailsOpen) && (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div
              key={order.id}
              className={styles.orderCard}
              onClick={() => openOrder(order)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openOrder(order);
                }
              }}
            >
              <div className={styles.orderCardLeft}>
                <p className={styles.orderCardTitle}>
                  {formatOrderDateTitle(order.date)}
                </p>
                <div className={styles.orderCardMeta}>
                  <span className={styles.orderCardNumber}>№{order.id}</span>
                  {isUnpaidStatus(order.status) && (
                    <span className={styles.orderCardPayWait}>Ожидает оплату</span>
                  )}
                </div>
              </div>
              <div className={styles.orderCardCenter}>
                <div className={styles.orderCardState}>
                  <Image
                    src="/images/account/info-circle.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.orderCardStateIcon}
                    unoptimized
                  />
                  <span className={styles.orderCardStateText}>
                    {getStatusDisplayName(order.status)}
                  </span>
                </div>
                <p className={styles.orderCardPrice}>
                  {order.payment.amount || order.total.totalAmount || "—"}
                </p>
              </div>
              <div className={styles.orderCardThumbnails}>
                {order.products.slice(0, 2).map((product, index) => (
                  <div key={index} className={styles.orderCardThumbnail}>
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name || "Товар"}
                        width={70}
                        height={70}
                        className={styles.orderCardThumbnailImage}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={styles.orderCardThumbnailPlaceholder}
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </div>
              <Image
                src="/images/account/chevron-right.svg"
                alt=""
                width={9}
                height={16}
                className={styles.orderCardChevron}
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {selectedOrder && isDetailsOpen && (
        <div ref={selectedOrderSectionRef} className={styles.selectedOrderSection}>
          <div className={styles.orderDetailsContent}>
            <div className={styles.ordersContainer}>
              <div className={styles.detailStatusBar}>
                <Image
                  src="/images/account/info-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                />
                <span className={styles.detailStatusBarText}>
                  {getDetailStatusLabel(selectedOrder.status)}
                </span>
              </div>

              <div className={styles.productsList}>
                {selectedOrder.products.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className={styles.productItem}
                  >
                    <div className={styles.productMain}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          className={styles.productImage}
                          alt={
                            product.name
                              ? `${product.name}${product.color ? `, ${product.color}` : ""}${product.size ? `, ${product.size}` : ""}`.trim()
                              : "Фото товара"
                          }
                          width={70}
                          height={70}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={styles.productImagePlaceholder}
                          aria-hidden
                        />
                      )}
                      <div className={styles.productText}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <div className={styles.productMetaInline}>
                          <span>Цвет: {formatColorLabel(product.color)}</span>
                          <span>Размер: {formatSizeLabel(product.size)}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.productMeta}>
                      <span>Цвет: {formatColorLabel(product.color)}</span>
                      <span>Размер: {formatSizeLabel(product.size)}</span>
                    </div>
                    <span className={styles.productPrice}>
                      {product.price || "—"}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.buyerSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionHeaderLeft}>
                    <div className={styles.sectionIcon}>
                      <Image
                        src="/images/account/accountImage.png"
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                    </div>
                    <h2 className={styles.sectionTitle}>Покупатель</h2>
                  </div>
                </div>
                <div
                  className={`${styles.buyerSectionInfo} ${
                    isBuyerExpanded ? styles.buyerSectionInfoExpanded : ""
                  }`}
                >
                  <div className={styles.buyerColumn}>
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Имя</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.firstName || "—"}
                      </p>
                    </div>
                    <div
                      className={`${styles.buyerSectionInfoItem} ${styles.buyerFieldDesktop}`}
                    >
                      <span className={styles.label}>Номер</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.phone || "—"}
                      </p>
                    </div>
                    <div
                      className={`${styles.buyerSectionInfoItem} ${styles.buyerFieldMobile}`}
                    >
                      <span className={styles.label}>Фамилия</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.lastName || "—"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${styles.buyerColumn} ${styles.buyerColumnDesktop}`}
                  >
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Фамилия</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.lastName || "—"}
                      </p>
                    </div>
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Email</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.email || "—"}
                      </p>
                    </div>
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Адрес доставки</span>
                      <p className={styles.value}>
                        {selectedOrder.delivery.fullAddress || "—"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${styles.buyerExtraMobile} ${
                      isBuyerExpanded ? styles.buyerExtraMobileOpen : ""
                    }`}
                  >
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Номер</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.phone || "—"}
                      </p>
                    </div>
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Email</span>
                      <p className={styles.value}>
                        {selectedOrder.buyer.email || "—"}
                      </p>
                    </div>
                    <div className={styles.buyerSectionInfoItem}>
                      <span className={styles.label}>Адрес доставки</span>
                      <p className={styles.value}>
                        {selectedOrder.delivery.fullAddress || "—"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.buyerMoreButton}
                  onClick={() => setIsBuyerExpanded((open) => !open)}
                  aria-expanded={isBuyerExpanded}
                >
                  {isBuyerExpanded ? "Скрыть" : "Подробнее"}
                </button>
              </div>

              <div className={styles.paymentSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionHeaderLeft}>
                    <div className={styles.sectionIcon}>
                      <Image
                        src="/images/account/buyImage.png"
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                    </div>
                    <h2 className={styles.sectionTitle}>Способ оплаты</h2>
                  </div>
                  {isUnpaidStatus(selectedOrder.status) && (
                    <span className={styles.paymentUnpaidLabel}>Не оплачено</span>
                  )}
                </div>
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
                    <span className={styles.value}>
                      {selectedOrder.payment.amount ||
                        selectedOrder.total.totalAmount ||
                        "—"}
                    </span>
                  </div>
                </div>
                {isUnpaidStatus(selectedOrder.status) && (
                  <button
                    type="button"
                    className={styles.detailPayButton}
                    onClick={() => void handlePayOrder()}
                    disabled={isPaying}
                  >
                    {isPaying ? "Перенаправление…" : "Оплатить"}
                  </button>
                )}
              </div>

              <div className={styles.deliverySection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionHeaderLeft}>
                    <div className={styles.sectionIcon}>
                      <Image
                        src="/images/account/delivery.png"
                        alt=""
                        width={20}
                        height={18}
                        loading="lazy"
                      />
                    </div>
                    <h2 className={styles.sectionTitle}>Способ доставки</h2>
                  </div>
                </div>
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
                  <div
                    className={`${styles.deliveryField} ${styles.deliveryAmountDesktop}`}
                  >
                    <span className={styles.label}>Сумма</span>
                    <span className={styles.value}>—</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className={styles.orderSidebar}>
              {isUnpaidStatus(selectedOrder.status) && (
                <>
                  <div className={styles.awaitingPayBanner}>Ожидает оплаты</div>
                  <div className={styles.totalSection}>
                    <div className={styles.totalAmount}>
                      <h2 className={styles.totalTitle}>Итого</h2>
                      <span className={styles.totalAmountValue}>
                        {selectedOrder.total.totalAmount || "—"}
                      </span>
                    </div>
                    <div className={styles.totalBreakdown}>
                      <div className={styles.totalBreakdownRow}>
                        <span className={styles.totalBreakdownLabel}>
                          Товары, {selectedOrder.total.itemsCount} шт
                        </span>
                        <span className={styles.totalBreakdownDots} aria-hidden />
                        <span className={styles.totalBreakdownValue}>
                          {selectedOrder.payment.amount ||
                            selectedOrder.total.totalAmount ||
                            "—"}
                        </span>
                      </div>
                      <div className={styles.totalBreakdownRow}>
                        <span className={styles.totalBreakdownLabel}>Доставка</span>
                        <span className={styles.totalBreakdownDots} aria-hidden />
                        <span className={styles.totalBreakdownValue}>—</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.sidebarPayButton}
                      onClick={() => void handlePayOrder()}
                      disabled={isPaying}
                    >
                      {isPaying ? "Перенаправление…" : "Оплатить"}
                    </button>
                  </div>
                </>
              )}

              {isPaidTrackableStatus(selectedOrder.status) && (
                <a
                  className={styles.sidebarTrackButton}
                  href={getTrackingUrl(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Отследить заказ
                </a>
              )}

              {isDeliveredStatus(selectedOrder.status) && (
                <div className={styles.deliveredDateBadge}>
                  {getDeliveredBadgeText(selectedOrder)}
                </div>
              )}
            </aside>
          </div>

          <button
            type="button"
            className={styles.backToOrders}
            onClick={closeOrderDetails}
          >
            Назад к списку
          </button>
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
