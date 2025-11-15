"use client";

import { useState } from "react";
import Image from "next/image";
import { registerUser } from "../../../services/authService";
import styles from "./ApplicationForm.module.css";

type ApplicationFormProps = {
    onNavigateToLogin: () => void;
    onSuccess?: () => void;
};

const ApplicationForm = ({
    onNavigateToLogin,
    onSuccess,
}: ApplicationFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        nickname: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            await registerUser({
                ...formData,
                notifications,
            });
            setSuccessMessage("Заявка успешно отправлена!");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Неизвестная ошибка");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.formShell}>
            <h2 className={styles.formTitle}>Регистрация</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Имя</span>
                    <input
                        type="text"
                        placeholder="Введите ваше имя*"
                        value={formData.name}
                        onChange={(e) => handleChange("name")(e.target.value)}
                        className={styles.input}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Фамилия</span>
                    <input
                        type="text"
                        placeholder="Введите вашу фамилию*"
                        value={formData.surname}
                        onChange={(e) =>
                            handleChange("surname")(e.target.value)
                        }
                        className={styles.input}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input
                        type="email"
                        placeholder="Введите ваш email*"
                        value={formData.email}
                        onChange={(e) => handleChange("email")(e.target.value)}
                        className={styles.input}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Ник</span>
                    <input
                        type="text"
                        placeholder="Введите ваш ник в Telegram*"
                        value={formData.nickname}
                        onChange={(e) =>
                            handleChange("nickname")(e.target.value)
                        }
                        className={styles.input}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Номер</span>
                    <input
                        type="tel"
                        placeholder="Введите ваш номер телефона*"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone")(e.target.value)}
                        className={styles.input}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Пароль</span>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Придумайте пароль*"
                            value={formData.password}
                            onChange={(e) =>
                                handleChange("password")(e.target.value)
                            }
                            className={`${styles.input} ${styles.passwordInput}`}
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={
                                showPassword
                                    ? "Скрыть пароль"
                                    : "Показать пароль"
                            }
                        >
                            {showPassword ? (
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
                                    className={styles.passwordToggleImage}
                                />
                            )}
                        </button>
                    </div>
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Повторите пароль</span>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Введите пароль*"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                handleChange("confirmPassword")(e.target.value)
                            }
                            className={`${styles.input} ${styles.passwordInput}`}
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Скрыть пароль"
                                    : "Показать пароль"
                            }
                        >
                            {showConfirmPassword ? (
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
                                    className={styles.passwordToggleImage}
                                />
                            )}
                        </button>
                    </div>
                </label>

                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
                {successMessage && (
                    <p className={styles.successMessage}>{successMessage}</p>
                )}

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    Зарегистрироваться
                </button>

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span>
                        Я хочу получать уведомления об акциях и новинках и даю
                        свое согласие на это
                    </span>
                </label>
                <div className={styles.loginLink}>
                    Уже есть аккаунт?{" "}
                    <button type="button" onClick={onNavigateToLogin}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
