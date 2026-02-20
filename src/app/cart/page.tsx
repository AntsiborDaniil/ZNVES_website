"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/ui/CartItem/CartItem";
import { useCart } from "../../contexts/CartContext";
import { getProductById } from "../../data/products";
import { fetchCatalogColors } from "../../api/catalog/catalogApi";
import { useWindowSize } from "../../hooks/useWindowSize";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import CartOrderErrorModal from "../../components/CartOrderErrorModal/CartOrderErrorModal";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import PromoErrorToast from "../../components/PromoErrorToast/PromoErrorToast";
import {
  buildCartItemsForPromo,
  applyPromoCode,
} from "../../api/discounts/discountsApi";

const CartPageContent = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
    appliedPromo,
    setAppliedPromo,
  } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width > 0 && width <= 1200;
  const checkoutFormRef = useRef<HTMLDivElement>(null);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [paymentReturnStatus, setPaymentReturnStatus] = useState<"success" | "error" | null>(null);
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>({});
  const [promoInputValue, setPromoInputValue] = useState("");
  const [promoErrorMessage, setPromoErrorMessage] = useState<string | null>(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const lastFailedPromoRef = useRef<string | null>(null);
  const checkoutButtonRef = useRef<HTMLButtonElement>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const smoothScrollToElement = (
    element: HTMLElement,
    duration: number = 1200
  ) => {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Используем easing функцию для более плавной анимации
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Обработка возврата после оплаты (return_url/cancel_url с платёжной страницы). Очищаем корзину при успехе или ошибке.
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success" || payment === "error") {
      setPaymentReturnStatus(payment);
      clearCart();
      router.replace("/cart", { scroll: false });
    }
  }, [searchParams, router, clearCart]);

  // Очищаем корзину только после закрытия модалки, чтобы модалка показывалась поверх корзины
  useEffect(() => {
    if (!showSuccessModal && orderNumber && items.length > 0) {
      // Модалка закрыта, заказ был оформлен - очищаем корзину
      clearCart();
    }
  }, [showSuccessModal, orderNumber, items.length, clearCart]);

  // При заходе на страницу корзины сбрасываем применённый промокод (скидка не должна сохраняться между визитами)
  useEffect(() => {
    setAppliedPromo(null);
  }, [setAppliedPromo]);

  // Загрузка цветов с API каталога для отображения на русском (slug → value)
  useEffect(() => {
    fetchCatalogColors().then((colors) => {
      const map: Record<string, string> = {};
      colors.forEach((c) => {
        map[c.slug] = c.value;
      });
      setColorSlugToLabel(map);
    });
  }, []);

  // Показываем модалку ошибки, если редирект с checkout из-за ошибки заказа
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedError = sessionStorage.getItem("znves:orderError");
      if (storedError) {
        sessionStorage.removeItem("znves:orderError");
        setOrderError(storedError);
      }
    } catch {}
  }, []);

  // Автоматически открываем форму при редиректе с checkout
  useEffect(() => {
    const autoCheckout = searchParams.get("autoCheckout");
    if (autoCheckout === "true" && isMobile) {
      setShowCheckoutForm(true);
      // Удаляем параметр из URL
      router.replace("/cart", { scroll: false });
      // Прокручиваем к форме оформления после небольшой задержки для рендеринга
      setTimeout(() => {
        if (checkoutFormRef.current) {
          smoothScrollToElement(checkoutFormRef.current, 1200);
        }
      }, 100);
    }
  }, [searchParams, isMobile, router]);

  const handleOrderSubmit = (newOrderNumber: string) => {
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

  const handleCloseErrorModal = () => {
    setOrderError(null);
  };

  const proceedToCheckout = () => {
    if (isMobile) {
      setShowCheckoutForm(true);
      setTimeout(() => {
        if (checkoutFormRef.current) {
          smoothScrollToElement(checkoutFormRef.current, 1200);
        }
      }, 100);
    } else {
      router.push("/checkout");
    }
  };

  const handleCheckoutClick = async () => {
    const promo = promoInputValue.trim();
    // Если промокод уже давал ошибку — при повторном нажатии просто переходим к оформлению
    if (promo && lastFailedPromoRef.current === promo) {
      lastFailedPromoRef.current = null;
      setPromoErrorMessage(null);
      proceedToCheckout();
      return;
    }
    if (promo) {
      lastFailedPromoRef.current = null;
      setIsPromoLoading(true);
      setPromoErrorMessage(null);
      try {
        const cartItemsForApi = await buildCartItemsForPromo(items);
        if (cartItemsForApi.length !== items.length) {
          setPromoErrorMessage("Не удалось применить промокод к части товаров.");
          setIsPromoLoading(false);
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
          proceedToCheckout();
        } else {
          setIsPromoLoading(false);
          setAppliedPromo(null);
          setPromoErrorMessage(result.error ?? "Промокод не найден");
          lastFailedPromoRef.current = promo;
          checkoutButtonRef.current?.blur();
        }
      } catch {
        setIsPromoLoading(false);
        setAppliedPromo(null);
        setPromoErrorMessage("Ошибка проверки промокода.");
        lastFailedPromoRef.current = promo;
        checkoutButtonRef.current?.blur();
      } finally {
        setIsPromoLoading(false);
        checkoutButtonRef.current?.blur();
      }
    } else {
      proceedToCheckout();
    }
  };

  // Не показываем пустую корзину, если модалка открыта, показываем ошибку заказа или возврат после оплаты
  if (items.length === 0 && !showSuccessModal && !orderError && !paymentReturnStatus) {
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

  // После оплаты или ошибки оплаты — показываем результат, корзина уже очищена
  if (paymentReturnStatus) {
    return (
      <div className={styles.cart}>
        <Header variant="green" />
        <main className={styles.main}>
          <div className={styles.cartContainer}>
            {paymentReturnStatus === "success" && (
              <div className={styles.paymentReturnBlock}>
                <p className={styles.paymentReturnTitle}>Оплата прошла успешно</p>
                <p className={styles.paymentReturnText}>
                  Заказ оплачен. Подробности можно посмотреть в личном кабинете — вся информация по заказу также придёт на вашу почту.
                </p>
                <div className={styles.paymentReturnActions}>
                  <Link href="/account" className={styles.shopButton}>
                    Личный кабинет
                  </Link>
                </div>
                <p className={styles.paymentReturnHint}>
                  Можете так же вернуться{" "}
                  <Link href="/catalog" className={styles.catalogInlineLink}>
                    в каталог
                  </Link>
                </p>
              </div>
            )}
            {paymentReturnStatus === "error" && (
              <div className={styles.paymentReturnBlock}>
                <p className={styles.paymentReturnTitle}>Оплата не выполнена</p>
                <p className={styles.paymentReturnText}>
                  Оплата была отменена или произошла ошибка. Можно попробовать оформить заказ снова.
                </p>
                <div className={styles.paymentReturnActions}>
                  <Link href="/catalog" className={styles.shopButton}>
                    В каталог
                  </Link>
                </div>
              </div>
            )}
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
          <div className={styles.cartTitleWrapper}>
            <h1 className={styles.cartTitle}>Корзина</h1>
            <button
              type="button"
              className={styles.clearCartButtonMobile}
              onClick={clearCart}
            >
              Очистить корзину
            </button>
          </div>
          <div className={styles.mainContentWrapper}>
            <div className={styles.cartItemsWrapper}>
              {items.map((item, index) => {
                const fullProduct = getProductById(Number(item.productId));
                const colorLabel =
                  item.colorLabel ??
                  colorSlugToLabel[item.color] ??
                  fullProduct?.availableColors.find(
                    (c) => c.value === item.color
                  )?.label ??
                  item.color;

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
            <div className={styles.summaryWrapper}>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Итого</span>
                  {appliedPromo ? (
                    <span className={styles.summaryTotalWithPromo}>
                      <span className={styles.summaryTotalOld}>
                        {formatPrice(getTotalPrice())}
                      </span>{" "}
                      <span className={styles.summaryTotal}>
                        {formatPrice(
                          Math.max(
                            0,
                            getTotalPrice() - parseFloat(appliedPromo.discount)
                          )
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className={styles.summaryTotal}>
                      {formatPrice(getTotalPrice())}
                    </span>
                  )}
                </div>
                <div className={styles.promoSection}>
                  <input
                    id="promo-code"
                    type="text"
                    className={styles.promoInput}
                    placeholder="Промокод"
                    value={promoInputValue}
                    onChange={(e) => setPromoInputValue(e.target.value)}
                    disabled={isPromoLoading}
                  />
                </div>
                <button
                  ref={checkoutButtonRef}
                  type="button"
                  className={`${styles.checkoutButton} ${
                    showCheckoutForm && isMobile
                      ? styles.checkoutButtonActive
                      : ""
                  }`}
                  onClick={handleCheckoutClick}
                  onPointerDown={(e) => {
                    if (e.pointerType === "touch" && !(showCheckoutForm && isMobile)) {
                      e.preventDefault();
                      handleCheckoutClick();
                    }
                  }}
                  disabled={(showCheckoutForm && isMobile) || isPromoLoading}
                >
                  {isPromoLoading ? "Проверка промокода…" : "Перейти к оформлению"}
                </button>
              </div>
              <button
                type="button"
                className={styles.clearCartButton}
                onClick={clearCart}
              >
                Очистить корзину
              </button>
            </div>
            {showCheckoutForm && isMobile && (
              <div ref={checkoutFormRef} id="checkout-form" className={styles.checkoutFormContainer}>
                <CheckoutForm
                  onOrderSubmit={handleOrderSubmit}
                  showRightColumn={false}
                />
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
      {orderError && (
        <CartOrderErrorModal
          message={orderError}
          onClose={handleCloseErrorModal}
        />
      )}
      {promoErrorMessage && (
        <PromoErrorToast
          message={promoErrorMessage}
          onClose={() => setPromoErrorMessage(null)}
        />
      )}
    </div>
  );
};

const CartPage = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.cart}>
          <Header variant="green" />
          <main className={styles.main}>
            <div className={styles.cartContainer}>
              <div className={styles.emptyCart}>
                <h1 className={styles.emptyTitle}>Загрузка...</h1>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
};

export default CartPage;
