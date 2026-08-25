"use client";

import type { RefObject, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../CheckoutFormModal.module.css";

export interface CheckoutPaymentSectionProps {
  paymentMethod: string;
  deliveryMethod: string;
  courierAvailable: boolean;
  isSubmitting: boolean;
  itemsSubtotal: number;
  itemsSubtotalOriginal: number;
  deliveryPrice: number;
  totalAmount: number;
  totalAmountOriginal: number;
  hasPromoDiscount: boolean;
  isCourierPriceLoading: boolean;
  modalDeliverySummaryLabel: string;
  modalSummaryCity: string | null;
  modalPromo?: {
    value: string;
    onChange: (value: string) => void;
    onApply: () => void;
    isLoading: boolean;
  };
  submitButtonRef: RefObject<HTMLButtonElement | null>;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmitOrder: () => void;
  formatPrice: (price: number) => string;
}

export default function CheckoutPaymentSection({
  paymentMethod,
  deliveryMethod,
  courierAvailable,
  isSubmitting,
  itemsSubtotal,
  itemsSubtotalOriginal,
  deliveryPrice,
  totalAmount,
  totalAmountOriginal,
  hasPromoDiscount,
  isCourierPriceLoading,
  modalDeliverySummaryLabel,
  modalSummaryCity,
  modalPromo,
  submitButtonRef,
  onInputChange,
  onSubmitOrder,
  formatPrice,
}: CheckoutPaymentSectionProps) {
  return (
    <>
      {modalPromo && (
        <div className={styles.modalPromoBlock}>
          <span className={styles.modalPromoLabel}>Промокод</span>
          <div className={styles.modalPromoRow}>
            <input
              id="checkout-modal-promo"
              type="text"
              className={styles.modalPromoInput}
              placeholder=""
              value={modalPromo.value}
              onChange={(event) => modalPromo.onChange(event.target.value)}
              disabled={modalPromo.isLoading}
            />
            <button
              type="button"
              className={styles.modalPromoBtn}
              onClick={() => modalPromo.onApply()}
              disabled={modalPromo.isLoading || !modalPromo.value.trim()}
            >
              {modalPromo.isLoading ? "…" : "Активировать"}
            </button>
          </div>
        </div>
      )}

      <div className={`${styles.section} ${styles.modalPaymentSection}`}>
        <h2 className={styles.paymentTitle}>Способ оплаты</h2>
        <div className={styles.modalPaymentOptions}>
          <label className={styles.modalPaymentOption}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={onInputChange}
              className={styles.radioInput}
            />
            <span
              className={`${styles.modalRadioMark} ${
                paymentMethod === "card" ? styles.modalRadioMarkActive : ""
              }`}
              aria-hidden
            />
            <span className={styles.modalPaymentOptionLabel}>Оплата банковской картой</span>
          </label>
          <label className={styles.modalPaymentOption}>
            <input
              type="radio"
              name="paymentMethod"
              value="sberbank"
              checked={paymentMethod === "sberbank"}
              onChange={onInputChange}
              className={styles.radioInput}
            />
            <span
              className={`${styles.modalRadioMark} ${
                paymentMethod === "sberbank" ? styles.modalRadioMarkActive : ""
              }`}
              aria-hidden
            />
            <span className={styles.modalPaymentOptionLabel}>
              <span>СБП</span>
              <Image
                src="/images/checkout/sbp-icon.svg"
                alt=""
                width={20}
                height={20}
                className={styles.modalPaymentOptionIcon}
                unoptimized
              />
            </span>
          </label>
        </div>
      </div>

      <div className={styles.orderSummaryBlock}>
        <div className={styles.modalOrderSummary}>
          <p className={styles.modalSummaryLine}>
            Сумма:{" "}
            {hasPromoDiscount ? (
              <>
                <span className={styles.modalSummaryTotalOld}>
                  {formatPrice(itemsSubtotalOriginal)}
                </span>
                {formatPrice(itemsSubtotal)}
              </>
            ) : (
              formatPrice(itemsSubtotal)
            )}
          </p>
          <p className={styles.modalSummaryLine}>
            {modalDeliverySummaryLabel}:{" "}
            {isCourierPriceLoading
              ? "рассчитывается…"
              : deliveryPrice === 0
                ? "бесплатно"
                : formatPrice(deliveryPrice)}
          </p>
          {modalSummaryCity && (
            <p className={styles.modalSummaryLocation}>{modalSummaryCity}</p>
          )}
          <p className={styles.modalSummaryLineTotal}>
            Итоговая сумма:{" "}
            {hasPromoDiscount ? (
              <>
                <span className={styles.modalSummaryTotalOld}>
                  {formatPrice(totalAmountOriginal)}
                </span>
                {formatPrice(totalAmount)}
              </>
            ) : (
              formatPrice(totalAmount)
            )}
          </p>
        </div>
        <button
          ref={submitButtonRef}
          type="button"
          className={`${styles.submitButton} ${styles.submitButtonRight}`}
          disabled={isSubmitting || (deliveryMethod === "yandex" && !courierAvailable)}
          onClick={() => {
            void onSubmitOrder();
          }}
          onPointerDown={(e) => {
            // iOS/Safari: клик по кнопке иногда теряется после скролла виджета карты
            if (e.pointerType === "touch") {
              e.preventDefault();
              void onSubmitOrder();
            }
          }}
        >
          {isSubmitting ? "Оформление..." : "Оформить заказ"}
        </button>
        <p className={styles.modalAgreement}>
          Нажимая на кнопку, вы соглашаетесь с{" "}
          <Link href="/public-offer" className={styles.modalAgreementLink}>
            публичной офертой
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className={styles.modalAgreementLink}>
            политикой конфиденциальности
          </Link>
        </p>
      </div>
    </>
  );
}
