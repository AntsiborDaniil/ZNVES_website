"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { getProductById } from "../../data/products";
import { fetchCatalogColors } from "../../api/catalog/catalogApi";
import {
  applyPromoCode,
  buildCartItemsForPromo,
} from "../../api/discounts/discountsApi";
import Button from "../ui/Button/Button";
import styles from "./CartModal.module.css";

const CheckoutForm = dynamic(
  () => import("../CheckoutForm/CheckoutForm").then((m) => ({ default: m.default })),
  { ssr: false }
);

const OrderSuccessModal = dynamic(
  () => import("../OrderSuccessModal/OrderSuccessModal").then((m) => ({ default: m.default })),
  { ssr: false }
);

const CartOrderErrorModal = dynamic(
  () => import("../CartOrderErrorModal/CartOrderErrorModal").then((m) => ({ default: m.default })),
  { ssr: false }
);

const PromoErrorToast = dynamic(
  () => import("../PromoErrorToast/PromoErrorToast").then((m) => ({ default: m.default })),
  { ssr: false }
);

type PaymentReturnStatus = "success" | "error" | null;

type CartModalProps = {
  paymentReturnStatus?: PaymentReturnStatus;
  onPaymentReturnHandled?: () => void;
};

const CART_PANEL_WIDTH_KEY = "znves:cart-panel-width";
const DEFAULT_PANEL_WIDTH = 600;
const MIN_PANEL_WIDTH = 420;
const MAX_PANEL_WIDTH = 960;

const clampPanelWidth = (value: number) => {
  const viewportMax =
    typeof window !== "undefined" ? window.innerWidth : MAX_PANEL_WIDTH;
  const max = Math.min(MAX_PANEL_WIDTH, viewportMax);
  return Math.min(max, Math.max(MIN_PANEL_WIDTH, Math.round(value)));
};

const persistPanelWidth = (width: number) => {
  try {
    window.localStorage.setItem(CART_PANEL_WIDTH_KEY, String(width));
  } catch {
    /* ignore storage errors */
  }
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

const CartModal = ({
  paymentReturnStatus = null,
  onPaymentReturnHandled,
}: CartModalProps) => {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
    appliedPromo,
    setAppliedPromo,
    isCartOpen,
    closeCart,
  } = useCart();
  const { isAuthenticated, openAuth } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>({});
  const [promoInputValue, setPromoInputValue] = useState("");
  const [promoErrorMessage, setPromoErrorMessage] = useState<string | null>(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const lastFailedPromoRef = useRef<string | null>(null);
  const isResizingRef = useRef(false);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(DEFAULT_PANEL_WIDTH);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_PANEL_WIDTH_KEY);
      if (!raw) return;
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        setPanelWidth(clampPanelWidth(parsed));
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const handleResizePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    resizeStartXRef.current = event.clientX;
    resizeStartWidthRef.current = panelWidth;
    setIsResizing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [panelWidth]);

  const handleResizePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    // Панель справа: тянем левый край влево — ширина растёт
    const delta = resizeStartXRef.current - event.clientX;
    setPanelWidth(clampPanelWidth(resizeStartWidthRef.current + delta));
  }, []);

  const endResize = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    setIsResizing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setPanelWidth((current) => {
      const next = clampPanelWidth(current);
      persistPanelWidth(next);
      return next;
    });
  }, []);

  const handleResizeKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 40 : 20;
    let next: number | null = null;
    if (event.key === "ArrowLeft") {
      next = clampPanelWidth(panelWidth + step);
    } else if (event.key === "ArrowRight") {
      next = clampPanelWidth(panelWidth - step);
    } else if (event.key === "Home") {
      next = MIN_PANEL_WIDTH;
    } else if (event.key === "End") {
      next = clampPanelWidth(MAX_PANEL_WIDTH);
    }
    if (next == null) return;
    event.preventDefault();
    setPanelWidth(next);
    persistPanelWidth(next);
  }, [panelWidth]);

  useEffect(() => {
    if (!isResizing) return;
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [isResizing]);

  useEffect(() => {
    if (isCartOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsActive(true));
      });
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    setIsActive(false);
    document.body.style.overflow = "";

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    if (!isCartOpen) return;
    setAppliedPromo(null);
    setPromoInputValue("");
    setPromoErrorMessage(null);
    lastFailedPromoRef.current = null;
  }, [isCartOpen, setAppliedPromo]);

  useEffect(() => {
    const needsColors = items.some((item) => !item.colorLabel);
    if (!needsColors) return;
    void fetchCatalogColors().then((colors) => {
      const map: Record<string, string> = {};
      colors.forEach((color) => {
        map[color.slug] = color.value;
      });
      setColorSlugToLabel(map);
    });
  }, [items]);

  useEffect(() => {
    if (!showSuccessModal && orderNumber && items.length > 0) {
      clearCart();
    }
  }, [showSuccessModal, orderNumber, items.length, clearCart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedError = sessionStorage.getItem("znves:orderError");
      if (storedError) {
        sessionStorage.removeItem("znves:orderError");
        setOrderError(storedError);
      }
    } catch {}
  }, [isCartOpen]);

  const handleClose = useCallback(() => {
    closeCart();
  }, [closeCart]);

  const handleOrderSubmit = (newOrderNumber: string) => {
    setOrderNumber(newOrderNumber);
    setShowSuccessModal(true);
  };

  const handleGoToAccount = () => {
    setShowSuccessModal(false);
    closeCart();
    if (isAuthenticated) {
      router.push("/account");
      return;
    }
    openAuth("login");
  };

  const handleAccountClick = () => {
    handleClose();
    if (isAuthenticated) {
      router.push("/account");
      return;
    }
    openAuth("login");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    closeCart();
    router.push("/catalog");
  };

  const handleApplyPromo = async () => {
    const promo = promoInputValue.trim();
    if (!promo) return;

    if (lastFailedPromoRef.current === promo) {
      lastFailedPromoRef.current = null;
      setPromoErrorMessage(null);
      return;
    }

    setIsPromoLoading(true);
    setPromoErrorMessage(null);

    try {
      const cartItemsForApi = await buildCartItemsForPromo(items);
      if (cartItemsForApi.length !== items.length) {
        setPromoErrorMessage("Не удалось применить промокод к части товаров.");
        return;
      }

      const orderTotal = getTotalPrice().toFixed(2);
      const result = await applyPromoCode(promo, {
        cartItems: cartItemsForApi,
        orderTotal,
        previousPromoCode: appliedPromo?.promoCode ?? null,
        previousDiscount: appliedPromo ? appliedPromo.discount : undefined,
      });

      if (result.success) {
        lastFailedPromoRef.current = null;
        setAppliedPromo({ promoCode: result.promo_code, discount: result.discount });
      } else {
        setAppliedPromo(null);
        setPromoErrorMessage(result.error ?? "Промокод не найден");
        lastFailedPromoRef.current = promo;
      }
    } catch {
      setAppliedPromo(null);
      setPromoErrorMessage("Ошибка проверки промокода.");
      lastFailedPromoRef.current = promo;
    } finally {
      setIsPromoLoading(false);
    }
  };

  if (!isVisible && !isCartOpen && !showSuccessModal && !orderError && !promoErrorMessage) {
    return null;
  }

  const total = getTotalPrice();
  const discountedTotal = appliedPromo
    ? Math.max(0, total - parseFloat(appliedPromo.discount))
    : total;

  return (
    <>
      {(isVisible || isCartOpen) && (
        <>
          <div
            className={`${styles.overlay} ${isActive ? styles.overlayVisible : ""}`}
            onClick={handleClose}
            aria-hidden={!isActive}
          />
          <aside
            className={`${styles.panel} ${isActive ? styles.panelVisible : ""} ${
              isResizing ? styles.panelResizing : ""
            }`}
            style={
              {
                "--cart-panel-width": `${panelWidth}px`,
              } as CSSProperties
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            aria-hidden={!isActive}
          >
            <div
              className={styles.resizeHandle}
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={endResize}
              onPointerCancel={endResize}
              onKeyDown={handleResizeKeyDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Изменить ширину панели"
              aria-valuemin={MIN_PANEL_WIDTH}
              aria-valuemax={MAX_PANEL_WIDTH}
              aria-valuenow={panelWidth}
              tabIndex={0}
            >
              <span className={styles.resizeHandleGrip} aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </div>

            <div className={styles.header}>
              <h2 className={styles.title} id="cart-modal-title">
                Ваш заказ:
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Закрыть корзину"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 5L19 19M19 5L5 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.body}>
              {paymentReturnStatus === "success" && (
                <div className={styles.paymentBlock}>
                  <p className={styles.paymentTitle}>Оплата прошла успешно</p>
                  <p className={styles.paymentText}>
                    Заказ оплачен. Подробности можно посмотреть в личном кабинете — вся
                    информация по заказу также придёт на вашу почту.
                  </p>
                  <div className={styles.paymentActions}>
                    <button type="button" className={styles.paymentBtn} onClick={handleAccountClick}>
                      Личный кабинет
                    </button>
                    <button
                      type="button"
                      className={styles.paymentLink}
                      onClick={() => {
                        onPaymentReturnHandled?.();
                        handleClose();
                      }}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              )}

              {paymentReturnStatus === "error" && (
                <div className={styles.paymentBlock}>
                  <p className={styles.paymentTitle}>Оплата не выполнена</p>
                  <p className={styles.paymentText}>
                    Оплата была отменена или произошла ошибка. Можно попробовать оформить
                    заказ снова.
                  </p>
                  <div className={styles.paymentActions}>
                    <button
                      type="button"
                      className={styles.paymentBtn}
                      onClick={() => onPaymentReturnHandled?.()}
                    >
                      Попробовать снова
                    </button>
                    <button type="button" className={styles.paymentLink} onClick={handleAccountClick}>
                      Личный кабинет
                    </button>
                  </div>
                </div>
              )}

              {!paymentReturnStatus && items.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyVisual} aria-hidden>
                    <svg
                      className={styles.emptyIconSvg}
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 7h16l-1.2 12.2A2 2 0 0 1 16.81 21H7.19a2 2 0 0 1-1.99-1.8L4 7Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 12.5h5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        opacity="0.35"
                      />
                    </svg>
                  </div>
                  <p className={styles.emptyTitle}>Корзина пуста</p>
                  <p className={styles.emptyText}>
                    Здесь появятся вещи, которые вы выберете.
                    <br />
                    Загляните в каталог — там уже есть на что посмотреть.
                  </p>
                  <Button
                    href="/catalog"
                    variant="dark"
                    className={styles.emptyCta}
                    onClick={handleClose}
                  >
                    Перейти в каталог
                  </Button>
                </div>
              )}

              {!paymentReturnStatus && items.length > 0 && (
                <>
                  <div className={styles.cartItems}>
                    {items.map((item, index) => {
                      const fullProduct = getProductById(Number(item.productId));
                      const colorLabel =
                        item.colorLabel ??
                        colorSlugToLabel[item.color] ??
                        fullProduct?.availableColors.find((color) => color.value === item.color)
                          ?.label ??
                        item.color;

                      return (
                        <article
                          key={`${item.productId}-${item.size}-${item.color}-${index}`}
                          className={styles.cartItem}
                        >
                          <Link
                            href={`/catalog/${item.product.slug || item.productId}`}
                            className={styles.cartItemImage}
                            onClick={handleClose}
                          >
                            <Image
                              src={item.product.images[0] || "/images/catalogs/placeholder.png"}
                              alt={item.product.title}
                              fill
                              sizes="72px"
                              className={styles.cartItemImageEl}
                            />
                          </Link>
                          <div className={styles.cartItemMain}>
                            <div className={styles.cartItemTop}>
                              <Link
                                href={`/catalog/${item.product.slug || item.productId}`}
                                className={styles.cartItemTitle}
                                onClick={handleClose}
                              >
                                {item.product.title}
                              </Link>
                              <span className={styles.cartItemPriceTop}>
                                {formatPrice(item.product.priceValue * item.quantity)}
                              </span>
                            </div>
                            <div className={styles.cartItemMeta}>
                              <p className={styles.cartItemMetaLine}>Цвет: {colorLabel}</p>
                              <p className={styles.cartItemMetaLine}>
                                Размер: {item.size.toUpperCase()}
                              </p>
                            </div>
                            <div className={styles.cartItemControls}>
                              <div className={styles.quantityControls}>
                                <button
                                  type="button"
                                  className={styles.quantityBtn}
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
                                <span className={styles.quantityValue}>{item.quantity}</span>
                                <button
                                  type="button"
                                  className={styles.quantityBtn}
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
                              <span className={styles.cartItemPriceInline}>
                                {formatPrice(item.product.priceValue * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  <div className={styles.itemsDivider} aria-hidden />

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryTotal}>
                      Итоговая сумма:{" "}
                      {appliedPromo ? (
                        <>
                          <span className={styles.summaryTotalOld}>{formatPrice(total)}</span>
                          {formatPrice(discountedTotal)}
                        </>
                      ) : (
                        formatPrice(total)
                      )}
                    </span>
                  </div>

                  <div className={styles.checkoutSection}>
                    <CheckoutForm
                      onOrderSubmit={handleOrderSubmit}
                      onOrderError={(message) => setOrderError(message)}
                      initialColorSlugToLabel={colorSlugToLabel}
                      modalPromo={{
                        value: promoInputValue,
                        onChange: setPromoInputValue,
                        onApply: () => void handleApplyPromo(),
                        isLoading: isPromoLoading,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {showSuccessModal && (
        <OrderSuccessModal
          orderNumber={orderNumber}
          onClose={handleCloseSuccessModal}
          onGoToAccount={handleGoToAccount}
        />
      )}

      {orderError && (
        <CartOrderErrorModal message={orderError} onClose={() => setOrderError(null)} />
      )}

      {promoErrorMessage && (
        <PromoErrorToast
          message={promoErrorMessage}
          onClose={() => setPromoErrorMessage(null)}
        />
      )}
    </>
  );
};

export default CartModal;
