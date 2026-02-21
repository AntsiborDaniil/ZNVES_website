"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { updateCurrentUser } from "../../../api/auth/authApi";
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

const deliveryFieldsList = [
  { key: "sdekAddress" as const, label: "Адрес СДЕК (ПВЗ)", placeholder: "Введите адрес ПВЗ СДЕК" },
  { key: "yandexPvz" as const, label: "ПВЗ Яндекс", placeholder: "Введите адрес ПВЗ Яндекс" },
  { key: "yandexCourier" as const, label: "Яндекс курьер", placeholder: "Введите адрес доставки курьером" },
];

const emptyDeliveryData = { sdekAddress: "", yandexPvz: "", yandexCourier: "" };
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

  const handleProfileChange =
    (field: ProfileFieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setHasUnsavedChanges(true);
      setSaveStatus(null);
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
      setSaveStatus({
        type: "success",
        message: "Изменения сохранены",
      });
      updateUser(updated);
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
    };

  const handleResetDelivery = () => {
    setDeliveryData({ ...emptyDeliveryData });
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
                      className={styles.input}
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
        <div className={styles.infoPanel}>
          <div className={styles.fieldsGrid}>
            {deliveryFieldsList.map(({ key, label, placeholder }) => (
              <div className={styles.fieldRow} key={key}>
                <label className={styles.fieldLabel} htmlFor={`delivery-${key}`}>
                  {label}
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id={`delivery-${key}`}
                    className={styles.input}
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
            disabled={!hasDeliveryChanges}
          >
            Сохранить изменения
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleResetDelivery}
          >
            Отмена
          </button>
        </div>
      </section>
    </>
  );
};

export default PersonalData;
