"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "./page.module.css";

const CheckoutPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, clearCart } = useCart();
  const { width } = useWindowSize();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentReturnStatus, setPaymentReturnStatus] = useState<"success" | "error" | null>(null);

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

  // Обработка возврата после оплаты (return_url с платёжной страницы). Очищаем корзину при успехе или ошибке.
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success" || payment === "error") {
      setPaymentReturnStatus(payment);
      clearCart();
      router.replace("/checkout", { scroll: false });
    }
  }, [searchParams, router, clearCart]);

  // Редирект на страницу корзины при ширине <= 1200px
  useEffect(() => {
    if (width > 0 && width <= 1200) {
      router.push("/cart?autoCheckout=true");
    }
  }, [width, router]);

  // Показываем пустую корзину только если модалка не открыта и не возврат с оплаты
  if (items.length === 0 && !showSuccessModal && !paymentReturnStatus) {
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
              <Link href="/cart" className={styles.shopButton}>
                Вернуться в корзину
              </Link>
              <Link href="/catalog" className={styles.backLink}>
                В каталог
              </Link>
            </div>
          </div>
        )}
        {!paymentReturnStatus && (
          <div className={styles.wrapper}>
            <Link href="/catalog" className={styles.backLink}>
              Вернуться в каталог
            </Link>
            <CheckoutForm onOrderSubmit={handleOrderSubmit} />
          </div>
        )}
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

const CheckoutPage = () => (
  <Suspense fallback={null}>
    <CheckoutPageContent />
  </Suspense>
);

export default CheckoutPage;
