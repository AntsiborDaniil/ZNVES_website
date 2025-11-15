"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginUser } from "../../services/authService";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            await loginUser({ email, password, rememberMe });
            router.push("/account");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Не удалось выполнить вход");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegisterClick = () => {
        router.push("/register");
    };

    return (
        <div className={styles.authPage}>
            <AuthHeader title="Личный кабинет" theme="transparent" />
            <div className={styles.authContainer}>
                <div className={styles.authForm}>
                    <h2 className={styles.formTitle}>Вход</h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                placeholder="Введите email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Пароль
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={styles.input}
                                    placeholder="Введите пароль*"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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
                                                stroke="#666"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                                                stroke="#666"
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
                                            className={
                                                styles.passwordToggleImage
                                            }
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    className={styles.checkbox}
                                />
                                <span>Запомнить меня</span>
                            </label>
                            <button
                                type="button"
                                className={styles.forgotPassword}
                            >
                                Забыл пароль
                            </button>
                        </div>

                        {errorMessage && (
                            <p className={styles.errorMessage}>
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            Войти
                        </button>
                    </form>

                    <div className={styles.registerLink}>
                        <span>У вас еще нет аккаунта? </span>
                        <button
                            type="button"
                            onClick={handleRegisterClick}
                            className={styles.registerButton}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
