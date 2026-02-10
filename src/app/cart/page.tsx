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
import { useWindowSize } from "../../hooks/useWindowSize";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import CartOrderErrorModal from "../../components/CartOrderErrorModal/CartOrderErrorModal";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const CartPageContent = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width > 0 && width <= 1200;
  const checkoutFormRef = useRef<HTMLDivElement>(null);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderError, setOrderError] = useState<string | null>(null);

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

  // Очищаем корзину только после закрытия модалки, чтобы модалка показывалась поверх корзины
  useEffect(() => {
    if (!showSuccessModal && orderNumber && items.length > 0) {
      // Модалка закрыта, заказ был оформлен - очищаем корзину
      clearCart();
    }
  }, [showSuccessModal, orderNumber, items.length, clearCart]);

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

  const handleCheckoutClick = () => {
    if (isMobile) {
      setShowCheckoutForm(true);
      // Прокручиваем к форме оформления после небольшой задержки для рендеринга
      setTimeout(() => {
        if (checkoutFormRef.current) {
          smoothScrollToElement(checkoutFormRef.current, 1200);
        }
      }, 100);
    } else {
      router.push("/checkout");
    }
  };

  // Не показываем пустую корзину, если модалка открыта или показываем ошибку заказа
  if (items.length === 0 && !showSuccessModal && !orderError) {
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
            <div className={styles.summaryWrapper}>
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
                  Перейти к оформлению
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
              <div ref={checkoutFormRef} id="checkout-form">
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
