"use client";

import React, { useState, useEffect } from "react";
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
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width > 0 && width <= 1024;

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (showSuccessModal && items.length > 0) {
      clearCart();
    }
  }, [showSuccessModal, items.length, clearCart]);

  // Автоматически открываем форму при редиректе с checkout
  useEffect(() => {
    const autoCheckout = searchParams.get("autoCheckout");
    if (autoCheckout === "true" && isMobile) {
      setShowCheckoutForm(true);
      // Удаляем параметр из URL
      router.replace("/cart", { scroll: false });
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
                Перейти к оформлению
              </button>
            </div>
            {showCheckoutForm && isMobile && (
              <CheckoutForm
                onOrderSubmit={handleOrderSubmit}
                showRightColumn={false}
              />
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
