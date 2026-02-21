"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../../../contexts/AuthContext";
import {
  updateAccountDetails,
  updatePassword,
} from "../../../services/accountService";
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

type PasswordFieldKey = "newPassword" | "confirmPassword";

const PersonalData = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({ ...emptyProfileData });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [hasPasswordChanges, setHasPasswordChanges] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState<
    Record<PasswordFieldKey, boolean>
  >({
    newPassword: false,
    confirmPassword: false,
  });
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
      await updateAccountDetails(profileData);
      setHasUnsavedChanges(false);
      setSaveStatus({
        type: "success",
        message: "Изменения сохранены",
      });
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

  const togglePasswordVisibility = (field: PasswordFieldKey) => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange =
    (field: PasswordFieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setHasPasswordChanges(true);
      setPasswordStatus(null);
    };

  const handlePasswordSubmit = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "Пароли не совпадают",
      });
      return;
    }

    setIsPasswordSubmitting(true);
    setPasswordStatus(null);

    try {
      await updatePassword({
        currentPassword: "",
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });
      setPasswordStatus({
        type: "success",
        message: "Пароль успешно обновлён",
      });
      setPasswordForm({
        newPassword: "",
        confirmPassword: "",
      });
      setHasPasswordChanges(false);
    } catch (error) {
      setPasswordStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Не удалось изменить пароль",
      });
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordForm({
      newPassword: "",
      confirmPassword: "",
    });
    setHasPasswordChanges(false);
    setPasswordStatus(null);
  };

  const renderPasswordInput = (
    label: string,
    field: PasswordFieldKey,
    placeholder: string
  ) => (
    <div className={styles.passwordField}>
      <label className={styles.passwordLabel}>{label}</label>
      <div className={styles.passwordInputWrapper}>
        <input
          className={styles.input}
          type={passwordVisibility[field] ? "text" : "password"}
          placeholder={placeholder}
          value={passwordForm[field]}
          onChange={handlePasswordChange(field)}
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => togglePasswordVisibility(field)}
          aria-label={
            passwordVisibility[field] ? "Скрыть пароль" : "Показать пароль"
          }
        >
          {passwordVisibility[field] ? (
            <svg
              className={styles.togglePasswordIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3C5.5 3 2.73 5.61 1 10C2.73 14.39 5.5 17 10 17C14.5 17 17.27 14.39 19 10C17.27 5.61 14.5 3 10 3Z"
                stroke="#7a7a79"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                stroke="#7a7a79"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <Image
              className={styles.togglePasswordIcon}
              src="/images/login/eye-open.png"
              alt="Показать пароль"
              width={20}
              height={20}
              loading="lazy"
            />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.sectionHeading}>Настройки</h1>
          <p className={styles.sectionDescription}>
            В данном разделе предоставляются возможности для настройки имени,
            изменения пароля и других параметров.
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

      <section className={styles.passwordPanel}>
        <h2 className={styles.subsectionHeading}>Изменить пароль</h2>
        <form
          className={styles.fieldsGrid}
          onSubmit={(event) => {
            event.preventDefault();
            handlePasswordSubmit();
          }}
        >
          {renderPasswordInput(
            "Новый пароль",
            "newPassword",
            "Введите ваш новый пароль*"
          )}
          {renderPasswordInput(
            "Повторите пароль",
            "confirmPassword",
            "Введите пароль*"
          )}
        </form>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handlePasswordSubmit}
            disabled={isPasswordSubmitting || !hasPasswordChanges}
          >
            {isPasswordSubmitting ? "Сохранение..." : "Сохранить изменения"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handlePasswordCancel}
          >
            Отмена
          </button>
        </div>
        {passwordStatus && (
          <p
            className={`${styles.passwordMessage} ${
              passwordStatus.type === "success"
                ? styles.passwordMessageSuccess
                : styles.passwordMessageError
            }`}
          >
            {passwordStatus.message}
          </p>
        )}
      </section>
    </>
  );
};

export default PersonalData;
