"use client";

import { useState } from "react";
import Image from "next/image";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import {
    updateAccountDetails,
    updatePassword,
} from "../../services/accountService";
import styles from "./page.module.css";

const defaultProfileData = {
    firstName: "Александр",
    lastName: "Смирнов",
    email: "abvdf@gmail.com",
    phone: "+7 (977) 721-04-52",
    nickname: "@abvd",
};

type ProfileFieldKey = keyof typeof defaultProfileData;

const profileFields: Array<{ key: ProfileFieldKey; label: string }> = [
    { key: "firstName", label: "Имя" },
    { key: "lastName", label: "Фамилия" },
    { key: "email", label: "Почта" },
    { key: "phone", label: "Номер телефона" },
    { key: "nickname", label: "Ник" },
];

const createEditableFieldsState = (): Record<ProfileFieldKey, boolean> =>
    profileFields.reduce((acc, field) => {
        acc[field.key] = false;
        return acc;
    }, {} as Record<ProfileFieldKey, boolean>);

type PasswordFieldKey = "currentPassword" | "newPassword" | "confirmPassword";

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
    const [profileData, setProfileData] = useState({ ...defaultProfileData });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState<
        Record<PasswordFieldKey, boolean>
    >({
        currentPassword: false,
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

    const [editableFields, setEditableFields] = useState<
        Record<ProfileFieldKey, boolean>
    >(createEditableFieldsState);

    const handleFieldToggle = (field: ProfileFieldKey) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
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
            setEditableFields(createEditableFieldsState());
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
        setProfileData({ ...defaultProfileData });
        setHasUnsavedChanges(false);
        setSaveStatus(null);
        setEditableFields(createEditableFieldsState());
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
            await updatePassword(passwordForm);
            setPasswordStatus({
                type: "success",
                message: "Пароль успешно обновлён",
            });
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setIsPasswordEditing(false);
        } catch (error) {
            setPasswordStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Не удалось изменить пароль",
            });
        } finally {
            setIsPasswordSubmitting(false);
        }
    };

    const handlePasswordCancel = () => {
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setPasswordStatus(null);
        setIsPasswordEditing(false);
    };

    const renderPasswordInput = (label: string, field: PasswordFieldKey) => (
        <div className={styles.passwordField}>
            <label className={styles.passwordLabel}>{label}</label>
            <div className={styles.passwordInputWrapper}>
                <input
                    className={styles.passwordInput}
                    type={passwordVisibility[field] ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={passwordForm[field]}
                    onChange={handlePasswordChange(field)}
                />
                <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => togglePasswordVisibility(field)}
                    aria-label={
                        passwordVisibility[field]
                            ? "Скрыть пароль"
                            : "Показать пароль"
                    }
                >
                    {passwordVisibility[field] ? (
                        <svg
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
                            src="/images/login/eye-open.png"
                            alt="Показать пароль"
                            width={20}
                            height={20}
                        />
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.accountPage}>
            <AuthHeader title="Личный кабинет" theme="transparent" />
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <nav className={styles.tabs} role="tablist">
                        <button
                            type="button"
                            className={`${styles.tabButton} ${
                                activeTab === "profile"
                                    ? styles.tabButtonActive
                                    : ""
                            }`}
                            onClick={() => setActiveTab("profile")}
                            role="tab"
                            aria-selected={activeTab === "profile"}
                        >
                            Мои данные
                        </button>
                        <span className={styles.tabsDivider}>|</span>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${
                                activeTab === "orders"
                                    ? styles.tabButtonActive
                                    : ""
                            }`}
                            onClick={() => setActiveTab("orders")}
                            role="tab"
                            aria-selected={activeTab === "orders"}
                        >
                            Мои заказы
                        </button>
                    </nav>

                    <article className={styles.card}>
                        {activeTab === "profile" ? (
                            <>
                                <section className={styles.panel}>
                                    <h1 className={styles.sectionHeading}>
                                        Настройки
                                    </h1>
                                    <p className={styles.sectionDescription}>
                                        В данном разделе предоставляются
                                        возможности для настройки имени,
                                        изменения пароля и других параметров.
                                    </p>
                                </section>

                                <section className={styles.panel}>
                                    {hasUnsavedChanges && (
                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={styles.primaryButton}
                                                onClick={handleSaveChanges}
                                                disabled={isSaving}
                                            >
                                                {isSaving
                                                    ? "Сохранение..."
                                                    : "Сохранить изменения"}
                                            </button>
                                            <button
                                                type="button"
                                                className={
                                                    styles.secondaryButton
                                                }
                                                onClick={handleResetProfile}
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    )}
                                    <h2 className={styles.sectionHeading}>
                                        Информация аккаунта
                                    </h2>
                                    <div className={styles.infoPanel}>
                                        {profileFields.map((field) => (
                                            <div
                                                className={styles.fieldRow}
                                                key={field.key}
                                            >
                                                <label
                                                    className={
                                                        styles.fieldLabel
                                                    }
                                                    htmlFor={`profile-${field.key}`}
                                                >
                                                    {field.label}
                                                </label>

                                                <div
                                                    className={
                                                        styles.inputWrapper
                                                    }
                                                >
                                                    <input
                                                        id={`profile-${field.key}`}
                                                        className={`${
                                                            styles.input
                                                        } ${
                                                            !editableFields[
                                                                field.key
                                                            ]
                                                                ? styles.inputReadOnly
                                                                : ""
                                                        }`}
                                                        type="text"
                                                        value={
                                                            profileData[
                                                                field.key
                                                            ]
                                                        }
                                                        readOnly={
                                                            !editableFields[
                                                                field.key
                                                            ]
                                                        }
                                                        onChange={
                                                            editableFields[
                                                                field.key
                                                            ]
                                                                ? handleProfileChange(
                                                                      field.key
                                                                  )
                                                                : undefined
                                                        }
                                                    />
                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.editInlineButton
                                                        }
                                                        onClick={() =>
                                                            handleFieldToggle(
                                                                field.key
                                                            )
                                                        }
                                                    >
                                                        {editableFields[
                                                            field.key
                                                        ]
                                                            ? "Готово"
                                                            : "Изменить"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className={styles.panel}>
                                    <div className={styles.passwordHeader}>
                                        <div>
                                            <h2
                                                className={
                                                    styles.sectionHeading
                                                }
                                            >
                                                Смена пароля
                                            </h2>
                                            <p
                                                className={
                                                    styles.sectionDescription
                                                }
                                            >
                                                Используйте сложный пароль:
                                                минимум 8 символов, цифры и
                                                буквы.
                                            </p>
                                        </div>
                                        {!isPasswordEditing && (
                                            <button
                                                type="button"
                                                className={styles.linkButton}
                                                onClick={() =>
                                                    setIsPasswordEditing(true)
                                                }
                                            >
                                                Изменить пароль
                                            </button>
                                        )}
                                    </div>

                                    {isPasswordEditing && (
                                        <>
                                            <form
                                                className={styles.passwordForm}
                                                onSubmit={(event) => {
                                                    event.preventDefault();
                                                    handlePasswordSubmit();
                                                }}
                                            >
                                                {renderPasswordInput(
                                                    "Старый пароль",
                                                    "currentPassword"
                                                )}
                                                {renderPasswordInput(
                                                    "Новый пароль",
                                                    "newPassword"
                                                )}
                                                {renderPasswordInput(
                                                    "Повторите пароль",
                                                    "confirmPassword"
                                                )}
                                            </form>
                                            {passwordStatus && (
                                                <p
                                                    className={`${
                                                        styles.passwordMessage
                                                    } ${
                                                        passwordStatus.type ===
                                                        "success"
                                                            ? styles.passwordMessageSuccess
                                                            : styles.passwordMessageError
                                                    }`}
                                                >
                                                    {passwordStatus.message}
                                                </p>
                                            )}
                                            <div className={styles.actions}>
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.primaryButton
                                                    }
                                                    onClick={
                                                        handlePasswordSubmit
                                                    }
                                                    disabled={
                                                        isPasswordSubmitting
                                                    }
                                                >
                                                    {isPasswordSubmitting
                                                        ? "Сохранение..."
                                                        : "Сохранить пароль"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.secondaryButton
                                                    }
                                                    onClick={
                                                        handlePasswordCancel
                                                    }
                                                >
                                                    Отмена
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </section>
                            </>
                        ) : (
                            <section className={styles.panel}>
                                <h2 className={styles.sectionHeading}>
                                    Мои заказы
                                </h2>
                                <p className={styles.sectionDescription}>
                                    Здесь появится история ваших заказов после
                                    оформления.
                                </p>
                            </section>
                        )}
                    </article>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;
