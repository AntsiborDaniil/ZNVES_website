"use client";

import type { RefObject, ChangeEvent, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import type { PvzListOption } from "../../Map/Map";
import styles from "../CheckoutFormModal.module.css";

const MapLazy = dynamic(
  () => import("../../Map/Map").then((m) => ({ default: m.default })),
  { ssr: false }
);

export type ModalDeliveryOption = "cdek_pickup" | "yandex_pickup" | "yandex_courier";

export type YandexCourierOffer = {
  id: string;
  taxiClass: string | null;
  description: string | null;
  price: number;
  deliveryFrom: string | null;
  deliveryTo: string | null;
};

export interface CheckoutDeliverySectionProps {
  isModalCourier: boolean;
  isModalPickup: boolean;
  modalDeliveryOption: ModalDeliveryOption;
  deliveryMethod: string;
  deliveryType: string;
  pickupCity: string;
  street: string;
  house: string;
  floor: string;
  deliveryComment: string;
  deliveryFirstName: string;
  deliveryLastName: string;
  pvzAddress: string;
  pvzAddressInputValue: string;
  mapSearchValue: string;
  selectedPvzCoords: [number, number] | null;
  totalWeightGrams: number | undefined;
  mapEnabled: boolean;
  hideContinueButton: boolean;
  isCartMobilePvz: boolean;
  errors: Record<string, boolean>;
  yandexCourierOffers: YandexCourierOffer[] | null;
  selectedCourierOfferId: string | null;
  courierAvailable: boolean;
  streetRef: RefObject<HTMLInputElement | null>;
  houseRef: RefObject<HTMLInputElement | null>;
  deliveryFirstNameRef: RefObject<HTMLInputElement | null>;
  deliveryLastNameRef: RefObject<HTMLInputElement | null>;
  mapSectionRef: RefObject<HTMLDivElement | null>;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onModalDeliveryOption: (option: ModalDeliveryOption) => void;
  onCourierTariffChange: (offerId: string) => void;
  onShowContinueButtonAgain: () => void;
  onPvzSearchChange: (value: string) => void;
  onMapSearchChange: (value: string) => void;
  onAddressSelect: (addressData: {
    city?: string;
    street?: string;
    house?: string;
    fullAddress?: string;
    pvzAddress?: string;
    pvzCode?: string;
    pvzId?: string;
    lat?: number;
    lon?: number;
  }) => void;
  onPvzListLoaded: Dispatch<SetStateAction<PvzListOption[]>>;
  onCdekDeliveryEstimate: Dispatch<
    SetStateAction<{ price: number; daysMin: number; daysMax: number } | null>
  >;
  onYandexContinueClick: () => void;
  onYandexWidgetInteraction: () => void;
  formatPrice: (price: number) => string;
}

const DELIVERY_OPTIONS = [
  { option: "cdek_pickup" as const, label: "СДЭК до пункта выдачи" },
  { option: "yandex_pickup" as const, label: "ЯНДЕКС до пункта выдачи" },
  { option: "yandex_courier" as const, label: "ЯНДЕКС курьером" },
] as const;

const TARIFF_DESCRIPTION_MAP: Record<string, string> = {
  "2_hours_delivery": "Доставка за 2 часа",
  "4_hours_delivery": "Доставка за 4 часа",
  express_30min_longer: "Экспресс ~30 мин",
  express_60min_longer: "Экспресс ~60 мин",
  same_day_delivery: "Доставка сегодня",
  next_day_delivery: "Доставка завтра",
};

export default function CheckoutDeliverySection({
  isModalCourier,
  isModalPickup,
  modalDeliveryOption,
  deliveryMethod,
  deliveryType,
  pickupCity,
  street,
  house,
  floor,
  deliveryComment,
  deliveryFirstName,
  deliveryLastName,
  pvzAddress,
  pvzAddressInputValue,
  mapSearchValue,
  selectedPvzCoords,
  totalWeightGrams,
  mapEnabled,
  hideContinueButton,
  isCartMobilePvz,
  errors,
  yandexCourierOffers,
  selectedCourierOfferId,
  courierAvailable,
  streetRef,
  houseRef,
  deliveryFirstNameRef,
  deliveryLastNameRef,
  mapSectionRef,
  onInputChange,
  onModalDeliveryOption,
  onCourierTariffChange,
  onShowContinueButtonAgain,
  onPvzSearchChange,
  onMapSearchChange,
  onAddressSelect,
  onPvzListLoaded,
  onCdekDeliveryEstimate,
  onYandexContinueClick,
  onYandexWidgetInteraction,
  formatPrice,
}: CheckoutDeliverySectionProps) {
  const showMap =
    mapEnabled &&
    isModalPickup &&
    (deliveryType === "cdek" || deliveryType === "yandex");

  const pvzPointerDown =
    isCartMobilePvz && deliveryMethod === "pickup" && pvzAddress.trim()
      ? onShowContinueButtonAgain
      : undefined;

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Доставка</h2>
        <div className={styles.modalCityBlock}>
          <div className={styles.inputWrapper}>
            <label htmlFor={isModalCourier ? "city" : "pickupCity"} className={styles.modalCityLabel}>
              Город
            </label>
            <input
              type="text"
              id={isModalCourier ? "city" : "pickupCity"}
              name={isModalCourier ? "city" : "pickupCity"}
              placeholder="Город"
              value={isModalCourier ? "Москва" : pickupCity}
              onChange={onInputChange}
              readOnly={isModalCourier}
              className={styles.input}
              autoComplete="address-level2"
            />
          </div>
          <p className={styles.modalCityHint}>
            Россия, г {isModalCourier ? "Москва" : pickupCity || "Москва"}
          </p>
        </div>
        <div className={styles.modalDeliveryOptions}>
          {DELIVERY_OPTIONS.map(({ option, label }) => (
            <label key={option} className={styles.modalDeliveryOption}>
              <input
                type="radio"
                name="modalDeliveryOption"
                value={option}
                checked={modalDeliveryOption === option}
                onChange={() => onModalDeliveryOption(option)}
                className={styles.radioInput}
              />
              <span
                className={`${styles.modalRadioMark} ${
                  modalDeliveryOption === option ? styles.modalRadioMarkActive : ""
                }`}
                aria-hidden
              />
              <span className={styles.modalDeliveryOptionLabel}>{label}</span>
            </label>
          ))}
        </div>

        {isModalCourier && (
          <div className={styles.modalCourierFields}>
            <div className={styles.inputWrapper}>
              <label htmlFor="street" className={styles.label}>
                Улица
              </label>
              <div className={styles.modalStreetInputWrap}>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Введите улицу"
                  value={street}
                  onChange={onInputChange}
                  className={`${styles.input} ${errors.street ? styles.inputError : ""}`}
                  ref={streetRef}
                  autoComplete="address-line1"
                />
                <span className={styles.modalStreetSearchIcon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
            <div className={styles.modalSplitRow}>
              <div className={styles.inputWrapper}>
                <label htmlFor="house" className={styles.label}>
                  Дом
                </label>
                <input
                  type="text"
                  id="house"
                  name="house"
                  placeholder="Введите дом"
                  value={house}
                  onChange={onInputChange}
                  className={`${styles.input} ${errors.house ? styles.inputError : ""}`}
                  ref={houseRef}
                  autoComplete="address-line2"
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="floor" className={styles.label}>
                  Этаж
                </label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  placeholder="Введите этаж"
                  value={floor}
                  onChange={onInputChange}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="deliveryComment" className={styles.label}>
                Комментарий
              </label>
              <textarea
                id="deliveryComment"
                name="deliveryComment"
                placeholder="Комментарий к доставке"
                value={deliveryComment}
                onChange={onInputChange}
                className={styles.modalTextarea}
                rows={3}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="deliveryFirstName" className={styles.label}>
                Имя получателя
              </label>
              <input
                type="text"
                id="deliveryFirstName"
                name="deliveryFirstName"
                placeholder="Екатерина"
                value={deliveryFirstName}
                onChange={onInputChange}
                className={`${styles.input} ${errors.deliveryFirstName ? styles.inputError : ""}`}
                ref={deliveryFirstNameRef}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="deliveryLastName" className={styles.label}>
                Фамилия получателя
              </label>
              <input
                type="text"
                id="deliveryLastName"
                name="deliveryLastName"
                placeholder="Смирнов"
                value={deliveryLastName}
                onChange={onInputChange}
                className={`${styles.input} ${errors.deliveryLastName ? styles.inputError : ""}`}
                ref={deliveryLastNameRef}
              />
            </div>
          </div>
        )}
      </div>

      {deliveryMethod === "yandex" &&
        yandexCourierOffers &&
        yandexCourierOffers.length > 1 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Тариф доставки</h2>
            <div className={styles.courierTariffs}>
              {yandexCourierOffers.map((offer) => {
                const isActive = selectedCourierOfferId === offer.id;
                const label =
                  (offer.description && TARIFF_DESCRIPTION_MAP[offer.description]) ||
                  (offer.description && offer.description.replace(/_/g, " ")) ||
                  (offer.taxiClass === "express" ? "Экспресс" : "Курьер");
                const deliveryDate = offer.deliveryTo
                  ? new Date(offer.deliveryTo).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })
                  : null;
                return (
                  <button
                    key={offer.id}
                    type="button"
                    className={`${styles.courierTariffButton} ${isActive ? styles.courierTariffButtonActive : ""}`}
                    onClick={() => onCourierTariffChange(offer.id)}
                  >
                    <span className={styles.courierTariffName}>{label}</span>
                    {deliveryDate && (
                      <span className={styles.courierTariffDate}>до {deliveryDate}</span>
                    )}
                    <span className={styles.courierTariffPrice}>
                      {offer.price === 0 ? "бесплатно" : formatPrice(offer.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {deliveryMethod === "yandex" && !courierAvailable && (
        <div className={styles.courierUnavailable}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#c45e2c" strokeWidth="1.5" />
            <path d="M10 6v5" stroke="#c45e2c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="10" cy="14" r="0.75" fill="#c45e2c" />
          </svg>
          <div>
            <span className={styles.courierUnavailableTitle}>Курьерская доставка сейчас недоступна</span>
            <span className={styles.courierUnavailableHint}>
              Курьеры работают с 8:00 до 22:00. Попробуйте оформить заказ позже или выберите доставку в
              пункт выдачи.
            </span>
          </div>
        </div>
      )}

      {isModalPickup && (
        <div
          className={`${styles.section} ${hideContinueButton ? styles.hideContinueButton : ""}`}
          ref={mapSectionRef}
          onPointerDown={pvzPointerDown}
        >
          <div className={styles.inputWrapper}>
            <label htmlFor="mapSearchInput" className={styles.label}>
              Пункт получения
            </label>
            <input
              type="text"
              id="mapSearchInput"
              name="mapSearchInput"
              className={styles.checkoutMapSearchInput}
              placeholder=""
              value={(pvzAddressInputValue || pvzAddress || "").trim() || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (deliveryMethod === "pickup") {
                  onPvzSearchChange(v);
                } else {
                  onMapSearchChange(v);
                }
              }}
            />
          </div>
          <div
            className={`${styles.checkoutMapContainer} ${
              deliveryMethod === "yandex" ? styles.checkoutMapContainerCourier : ""
            }`}
            onPointerDown={pvzPointerDown}
          >
            {showMap && (
              <MapLazy
                key={`${deliveryType}-${deliveryMethod}`}
                city={pickupCity}
                onAddressSelect={onAddressSelect}
                onPvzListLoaded={onPvzListLoaded}
                onCdekDeliveryEstimate={onCdekDeliveryEstimate}
                onYandexContinueClick={onYandexContinueClick}
                onYandexWidgetInteraction={onYandexWidgetInteraction}
                searchValue={mapSearchValue}
                onSearchChange={onMapSearchChange}
                deliveryMethod={deliveryMethod}
                deliveryType={deliveryType}
                selectedPvzCoords={selectedPvzCoords}
                totalWeightGrams={totalWeightGrams}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
