"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { updateCurrentUser, updateUserDeliveryData, changePassword } from "../../../api/auth/authApi";
import PhoneInput from "../../PhoneInput/PhoneInput";
import styles from "./PersonalData.module.css";

const emptyProfileData = {
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
  { key: "firstName", label: "Имя", placeholder: "Екатерина" },
  { key: "lastName", label: "Фамилия", placeholder: "Смирнова" },
  { key: "phone", label: "Номер", placeholder: "+7" },
  { key: "email", label: "Email", placeholder: "email@example.com" },
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

type PersonalDataProps = {
  standalone?: boolean;
  onPasswordModeChange?: (isEditing: boolean) => void;
};

const PersonalData = ({ standalone = false, onPasswordModeChange }: PersonalDataProps) => {
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
  const [highlightSection, setHighlightSection] = useState<"profile" | "delivery" | null>(null);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const setPasswordEditing = (value: boolean) => {
    setIsPasswordEditing(value);
    onPasswordModeChange?.(value);
  };

  useEffect(() => {
    if (!user) return;
    setProfileData({
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
      setProfileData((prev) => ({ ...prev, [field]: event.target.value }));
      setHasUnsavedChanges(true);
      setSaveStatus(null);
      if (highlightSection === "profile") setHighlightSection(null);
    };

  const handlePhoneChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, phone: value }));
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
          error instanceof Error ? error.message : "Не удалось сохранить изменения",
      });
    } finally {
      setIsSaving(false);
    }
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

  const handlePasswordFieldChange =
    (field: keyof typeof passwordForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordForm((prev) => ({ ...prev, [field]: event.target.value }));
      setPasswordError(null);
    };

  const handleCancelPassword = () => {
    setPasswordEditing(false);
    setPasswordForm({ current: "", next: "", confirm: "" });
    setPasswordError(null);
  };

  const handleSavePassword = async () => {
    if (!passwordForm.current.trim() || !passwordForm.next.trim()) {
      setPasswordError("Заполните все поля");
      return;
    }
    if (passwordForm.next.length < 8) {
      setPasswordError("Новый пароль должен быть не короче 8 символов");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setIsSavingPassword(true);
    setPasswordError(null);
    try {
      await changePassword({
        current_password: passwordForm.current,
        new_password: passwordForm.next,
      });
      handleCancelPassword();
      setShowSuccessModal(true);
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Не удалось изменить пароль"
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isPasswordEditing) {
    return (
      <>
        <div
          className={`${styles.profileShell} ${styles.passwordShell} ${
            standalone ? styles.profileShellStandalone : ""
          }`}
        >
          <section
            className={`${styles.profileMain} ${
              standalone ? styles.profileMainStandalone : ""
            }`}
          >
            <h2 className={styles.sectionHeading}>Пароль</h2>
            <div className={styles.fieldsStack}>
              <div className={styles.fieldRow}>
                <label className={styles.fieldLabel} htmlFor="password-current">
                  Текущий пароль
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="password-current"
                    className={styles.input}
                    type="password"
                    autoComplete="current-password"
                    value={passwordForm.current}
                    onChange={handlePasswordFieldChange("current")}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldLabel} htmlFor="password-next">
                  Новый пароль
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="password-next"
                    className={styles.input}
                    type="password"
                    autoComplete="new-password"
                    value={passwordForm.next}
                    onChange={handlePasswordFieldChange("next")}
                    placeholder="Не менее 8 символов"
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldLabel} htmlFor="password-confirm">
                  Повторите пароль
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="password-confirm"
                    className={styles.input}
                    type="password"
                    autoComplete="new-password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordFieldChange("confirm")}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            {passwordError && (
              <p className={styles.saveStatusError}>{passwordError}</p>
            )}
            <button
              type="button"
              className={styles.saveButton}
              onClick={() => void handleSavePassword()}
              disabled={isSavingPassword}
            >
              {isSavingPassword ? "Сохранение..." : "Сохранить"}
            </button>
            <button
              type="button"
              className={styles.passwordCancel}
              onClick={handleCancelPassword}
              disabled={isSavingPassword}
            >
              Отмена
            </button>
          </section>
        </div>

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
              <h2 id="success-modal-title" className={styles.modalTitle}>
                Данные сохранены
              </h2>
              <p className={styles.modalText}>Изменения успешно применены.</p>
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
  }

  return (
    <>
      <div
        className={`${styles.profileShell} ${
          standalone ? styles.profileShellStandalone : ""
        }`}
      >
        <div className={styles.profileRow}>
          <section
            className={`${styles.profileMain} ${
              standalone ? styles.profileMainStandalone : ""
            }`}
          >
            <h2 className={styles.sectionHeading}>Профиль</h2>
            <div className={styles.fieldsStack}>
              {profileFields.map((field) => (
                <div className={styles.fieldRow} key={field.key}>
                  <label className={styles.fieldLabel} htmlFor={`profile-${field.key}`}>
                    {field.label}
                  </label>
                  <div className={styles.inputWrapper}>
                    {field.key === "phone" ? (
                      <PhoneInput
                        id={`profile-${field.key}`}
                        value={profileData.phone}
                        onChange={handlePhoneChange}
                        variant="account"
                        className={
                          highlightSection === "profile" ? styles.inputSuccess : ""
                        }
                      />
                    ) : (
                      <input
                        id={`profile-${field.key}`}
                        className={`${styles.input} ${
                          highlightSection === "profile" ? styles.inputSuccess : ""
                        }`}
                        type="text"
                        value={profileData[field.key]}
                        onChange={handleProfileChange(field.key)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <aside className={styles.passwordAside}>
              <p className={styles.fieldLabel}>Пароль</p>
              <button
                type="button"
                className={styles.passwordButton}
                onClick={() => setPasswordEditing(true)}
              >
                Изменить пароль
              </button>
            </aside>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSaveChanges}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
          </section>
        </div>
      </div>

      {!standalone && (
      <section className={styles.deliveryPanel}>
        <h2 className={styles.deliveryHeading}>Адреса доставки</h2>

        <div className={styles.deliveryBlock}>
          <h3 className={`${styles.deliveryBlockTitle} ${styles.deliveryBlockTitlePvz}`}>
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
                    className={`${styles.input} ${
                      highlightSection === "delivery" ? styles.inputSuccess : ""
                    }`}
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
          <h3 className={styles.deliveryBlockTitle}>Курьерская доставка</h3>
          <div className={styles.fieldsGrid}>
            {courierFieldsList.map(({ key, label, placeholder }) => (
              <div
                className={`${styles.fieldRow} ${
                  key === "comment" ? styles.fieldRowFull : ""
                }`}
                key={key}
              >
                <label className={styles.fieldLabel} htmlFor={`courier-${key}`}>
                  {label}
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id={`courier-${key}`}
                    className={`${styles.input} ${
                      highlightSection === "delivery" ? styles.inputSuccess : ""
                    }`}
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
            className={styles.saveButton}
            disabled={isSaving || !hasDeliveryChanges}
            onClick={handleSaveDelivery}
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
        {saveStatus && saveStatus.type === "error" && (
          <p className={styles.saveStatusError}>{saveStatus.message}</p>
        )}
      </section>
      )}

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
            <h2 id="success-modal-title" className={styles.modalTitle}>
              Данные сохранены
            </h2>
            <p className={styles.modalText}>Изменения успешно применены.</p>
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
