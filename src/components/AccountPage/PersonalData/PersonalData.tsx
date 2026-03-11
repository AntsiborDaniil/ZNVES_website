"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { updateCurrentUser, updateUserDeliveryData } from "../../../api/auth/authApi";
import styles from "./PersonalData.module.css";

const emptyProfileData = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

type ProfileFieldKey = keyof typeof emptyProfileData;

const profileFields: Array<{
  key: ProfileFieldKey;
  label: string;
  placeholder: string;
}> = [
  { key: "username", label: "Никнейм", placeholder: "Введите никнейм" },
  { key: "firstName", label: "Имя", placeholder: "Введите ваше имя*" },
  { key: "lastName", label: "Фамилия", placeholder: "Введите вашу фамилию*" },
  { key: "email", label: "Email", placeholder: "Введите ваш email*" },
  { key: "phone", label: "Номер", placeholder: "Введите ваш номер телефона*" },
];

const pvzFieldsList = [
  { key: "cdekPvz" as const, label: "СДЭК (ПВЗ)", placeholder: "Введите адрес ПВЗ СДЭК" },
  { key: "yandexPvz" as const, label: "Яндекс (ПВЗ)", placeholder: "Введите адрес ПВЗ Яндекс" },
];

const courierFieldsList = [
  { key: "city" as const, label: "Город", placeholder: "Москва" },
  { key: "street" as const, label: "Улица", placeholder: "ул. Ленина" },
  { key: "house" as const, label: "Дом", placeholder: "15А" },
  { key: "apartment" as const, label: "Квартира / офис", placeholder: "42" },
  { key: "floor" as const, label: "Этаж", placeholder: "3" },
  { key: "intercom" as const, label: "Домофон", placeholder: "42К1234" },
  { key: "comment" as const, label: "Комментарий курьеру", placeholder: "Позвонить за 10 минут" },
];

const emptyDeliveryData = {
  cdekPvz: "",
  yandexPvz: "",
  city: "",
  street: "",
  house: "",
  apartment: "",
  floor: "",
  intercom: "",
  comment: "",
};
type DeliveryFieldKey = keyof typeof emptyDeliveryData;

const PersonalData = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({ ...emptyProfileData });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deliveryData, setDeliveryData] = useState({ ...emptyDeliveryData });
  const [hasDeliveryChanges, setHasDeliveryChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  /** Какой блок подсветить зелёным после сохранения: profile | delivery */
  const [highlightSection, setHighlightSection] = useState<"profile" | "delivery" | null>(null);

  // Подставляем данные из ручки GET /api/auth/user/ в поля личной информации
  useEffect(() => {
    if (!user) return;
    setProfileData({
      username: user.username ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      email: user.email ?? "",
      phone: user.phone_number ?? "",
    });
  }, [user]);

  useEffect(() => {
    if (!user?.delivery_data) return;
    const dd = user.delivery_data;
    setDeliveryData({
      cdekPvz: dd.cdek_full_pvz_address ?? "",
      yandexPvz: dd.yandex_full_pvz_address ?? "",
      city: dd.city ?? "",
      street: dd.street ?? "",
      house: dd.house ?? "",
      apartment: dd.apartment ?? "",
      floor: dd.floor ?? "",
      intercom: dd.intercom ?? "",
      comment: dd.comment ?? "",
    });
  }, [user?.delivery_data]);

  const handleProfileChange =
    (field: ProfileFieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setHasUnsavedChanges(true);
      setSaveStatus(null);
      if (highlightSection === "profile") setHighlightSection(null);
    };

  const handleSaveChanges = async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const updated = await updateCurrentUser({
        username: profileData.username || undefined,
        first_name: profileData.firstName || undefined,
        last_name: profileData.lastName || undefined,
        email: profileData.email || undefined,
        phone_number: profileData.phone || undefined,
      });
      setHasUnsavedChanges(false);
      setHighlightSection("profile");
      setShowSuccessModal(true);
      updateUser(updated);
      setTimeout(() => setHighlightSection(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось сохранить изменения",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetProfile = () => {
    if (user) {
      setProfileData({
        username: user.username ?? "",
        firstName: user.first_name ?? "",
        lastName: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone_number ?? "",
      });
    } else {
      setProfileData({ ...emptyProfileData });
    }
    setHasUnsavedChanges(false);
    setSaveStatus(null);
  };

  const handleDeliveryChange =
    (field: DeliveryFieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeliveryData((prev) => ({ ...prev, [field]: event.target.value }));
      setHasDeliveryChanges(true);
      if (highlightSection === "delivery") setHighlightSection(null);
    };

  const handleSaveDelivery = async () => {
    if (!hasDeliveryChanges) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const updated = await updateUserDeliveryData({
        cdek_full_pvz_address: deliveryData.cdekPvz.trim() || undefined,
        yandex_full_pvz_address: deliveryData.yandexPvz.trim() || undefined,
        city: deliveryData.city.trim() || undefined,
        street: deliveryData.street.trim() || undefined,
        house: deliveryData.house.trim() || undefined,
        apartment: deliveryData.apartment.trim() || undefined,
        floor: deliveryData.floor.trim() || undefined,
        intercom: deliveryData.intercom.trim() || undefined,
        comment: deliveryData.comment.trim() || undefined,
      });
      setHasDeliveryChanges(false);
      setHighlightSection("delivery");
      setShowSuccessModal(true);
      updateUser({ ...user!, delivery_data: updated });
      setTimeout(() => setHighlightSection(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось сохранить адреса доставки",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDelivery = () => {
    if (user?.delivery_data) {
      const dd = user.delivery_data;
      setDeliveryData({
        cdekPvz: dd.cdek_full_pvz_address ?? "",
        yandexPvz: dd.yandex_full_pvz_address ?? "",
        city: dd.city ?? "",
        street: dd.street ?? "",
        house: dd.house ?? "",
        apartment: dd.apartment ?? "",
        floor: dd.floor ?? "",
        intercom: dd.intercom ?? "",
        comment: dd.comment ?? "",
      });
    } else {
      setDeliveryData({ ...emptyDeliveryData });
    }
    setHasDeliveryChanges(false);
  };

  return (
    <>
      <div className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.sectionHeading}>Настройки</h1>
          <p className={styles.sectionDescription}>
            В данном разделе можно изменить имя, контакты и адреса доставки.
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.subsectionHeading}>Личные данные</h2>
          <div className={styles.infoPanel}>
            <div className={styles.fieldsGrid}>
              {profileFields.map((field) => (
                <div className={styles.fieldRow} key={field.key}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor={`profile-${field.key}`}
                  >
                    {field.label}
                  </label>

                  <div className={styles.inputWrapper}>
                    <input
                      id={`profile-${field.key}`}
                      className={`${styles.input} ${highlightSection === "profile" ? styles.inputSuccess : ""}`}
                      type="text"
                      value={profileData[field.key]}
                      onChange={handleProfileChange(field.key)}
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleSaveChanges}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? "Сохранение..." : "Сохранить изменения"}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleResetProfile}
            >
              Отмена
            </button>
          </div>
        </section>
      </div>

      <section className={styles.deliveryPanel}>
        <h2 className={styles.subsectionHeading}>Адреса доставки</h2>

        <div className={styles.deliveryBlock}>
          <h3 className={styles.deliveryBlockTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Пункты выдачи (ПВЗ)
          </h3>
          <div className={styles.fieldsGrid}>
            {pvzFieldsList.map(({ key, label, placeholder }) => (
              <div className={styles.fieldRow} key={key}>
                <label className={styles.fieldLabel} htmlFor={`delivery-${key}`}>
                  {label}
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id={`delivery-${key}`}
                    className={`${styles.input} ${highlightSection === "delivery" ? styles.inputSuccess : ""}`}
                    type="text"
                    value={deliveryData[key]}
                    onChange={handleDeliveryChange(key)}
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.deliverySeparator} />

        <div className={styles.deliveryBlock}>
          <h3 className={styles.deliveryBlockTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Курьерская доставка
          </h3>
          <div className={styles.fieldsGrid}>
            {courierFieldsList.map(({ key, label, placeholder }) => (
              <div
                className={`${styles.fieldRow} ${key === "comment" ? styles.fieldRowFull : ""}`}
                key={key}
              >
                <label className={styles.fieldLabel} htmlFor={`courier-${key}`}>
                  {label}
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id={`courier-${key}`}
                    className={`${styles.input} ${highlightSection === "delivery" ? styles.inputSuccess : ""}`}
                    type="text"
                    value={deliveryData[key]}
                    onChange={handleDeliveryChange(key)}
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={isSaving || !hasDeliveryChanges}
            onClick={handleSaveDelivery}
          >
            {isSaving ? "Сохранение..." : "Сохранить изменения"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleResetDelivery}
          >
            Отмена
          </button>
        </div>
        {saveStatus && saveStatus.type === "error" && (
          <p className={styles.saveStatusError}>{saveStatus.message}</p>
        )}
      </section>

      {showSuccessModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSuccessModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalIconWrap}>
              <svg
                className={styles.modalIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 id="success-modal-title" className={styles.modalTitle}>
              Данные сохранены
            </h2>
            <p className={styles.modalText}>
              Изменения успешно применены.
            </p>
            <button
              type="button"
              className={styles.modalButton}
              onClick={() => setShowSuccessModal(false)}
            >
              Отлично
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalData;
