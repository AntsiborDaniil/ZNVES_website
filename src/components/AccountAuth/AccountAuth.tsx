"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  resendAuthCode,
  verifyLogin,
  verifyRegistration,
  type AuthUser,
} from "../../api/auth/authApi";
import { useAuth } from "../../contexts/AuthContext";
import {
  AUTH_RESEND_COOLDOWN_SECONDS,
  formatResendCooldown,
  validateCode,
  validateEmail,
  validateLoginEmail,
  validatePassword,
  validatePhone,
  validateRegistrationPassword,
  validateRequiredName,
} from "../../lib/authValidation";
import styles from "./AccountAuth.module.css";

type AuthMode = "login" | "register";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

type VerifyFormValues = {
  code: string;
};

type AccountAuthProps = {
  onAuthenticated?: () => void;
};

const PasswordToggleButton = ({
  visible,
  onToggle,
  label,
}: {
  visible: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    type="button"
    className={styles.passwordToggle}
    onClick={onToggle}
    aria-label={label}
  >
    {visible ? (
      <svg
        className={styles.passwordIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 2L22 22"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        className={styles.passwordIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
    )}
  </button>
);

const AccountAuth = ({ onAuthenticated }: AccountAuthProps) => {
  const router = useRouter();
  const { checkAuth, updateUser } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<"credentials" | "verify">("credentials");
  const [pendingEmail, setPendingEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const formOptions = {
    mode: "onChange" as const,
    reValidateMode: "onChange" as const,
  };

  const loginForm = useForm<LoginFormValues>({
    ...formOptions,
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    ...formOptions,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const verifyForm = useForm<VerifyFormValues>({
    ...formOptions,
    defaultValues: { code: "" },
  });

  const registerPassword = registerForm.watch("password");
  const confirmPasswordTouched = registerForm.formState.touchedFields.confirmPassword;

  useEffect(() => {
    if (confirmPasswordTouched) {
      void registerForm.trigger("confirmPassword");
    }
  }, [registerPassword, confirmPasswordTouched, registerForm]);

  const startResendCooldown = useCallback(() => {
    setResendCooldown(AUTH_RESEND_COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setTimeout(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStep("credentials");
    setFormError(null);
    setInfoMessage(null);
    setResendCooldown(0);
    verifyForm.reset();
  };

  const completeAuth = async (verifiedUser: AuthUser) => {
    updateUser(verifiedUser);
    await checkAuth(true);
    onAuthenticated?.();
    router.replace("/account");
  };

  const handleLoginSubmit = loginForm.handleSubmit(async (values) => {
    setFormError(null);
    setInfoMessage(null);
    try {
      await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
      setPendingEmail(values.email.trim());
      setLoginPassword(values.password);
      setStep("verify");
      verifyForm.reset();
      startResendCooldown();
      setInfoMessage("Код подтверждения отправлен на вашу почту");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Не удалось выполнить вход");
    }
  });

  const handleRegisterSubmit = registerForm.handleSubmit(async (values) => {
    setFormError(null);
    setInfoMessage(null);
    try {
      await registerUser({
        email: values.email.trim(),
        password: values.password,
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        phone_number: values.phone_number.trim(),
      });
      setPendingEmail(values.email.trim());
      setStep("verify");
      verifyForm.reset();
      startResendCooldown();
      setInfoMessage("Код подтверждения отправлен на вашу почту");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Не удалось зарегистрироваться"
      );
    }
  });

  const handleVerifySubmit = verifyForm.handleSubmit(async (values) => {
    setFormError(null);
    setInfoMessage(null);
    try {
      const payload = {
        email: pendingEmail,
        code: values.code.trim(),
      };

      const verifiedUser =
        mode === "login"
          ? await verifyLogin(payload)
          : await verifyRegistration(payload);

      await completeAuth(verifiedUser);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Не удалось подтвердить код"
      );
    }
  });

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setFormError(null);
    setInfoMessage(null);
    try {
      if (mode === "register") {
        await resendAuthCode(pendingEmail);
      } else {
        await loginUser({
          email: pendingEmail,
          password: loginPassword,
        });
      }
      startResendCooldown();
      setInfoMessage("Код отправлен повторно");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Не удалось отправить код повторно"
      );
    }
  };

  const handleBackToCredentials = () => {
    setStep("credentials");
    setFormError(null);
    setInfoMessage(null);
    setResendCooldown(0);
    verifyForm.reset();
  };

  if (step === "verify") {
    return (
      <div className={styles.authBlock}>
        <h1 className={styles.title}>
          {mode === "login" ? "Подтверждение входа" : "Подтверждение регистрации"}
        </h1>
        <p className={styles.description}>
          Введите код из письма, отправленного на{" "}
          <span className={styles.emailHighlight}>{pendingEmail}</span>
        </p>

        <form className={styles.form} onSubmit={handleVerifySubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="verify-code" className={styles.label}>
              Код подтверждения
            </label>
            <input
              id="verify-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Введите код"
              className={`${styles.input} ${
                verifyForm.formState.errors.code ? styles.inputError : ""
              }`}
              {...verifyForm.register("code", {
                validate: validateCode,
              })}
            />
            {verifyForm.formState.errors.code && (
              <span className={styles.fieldError}>
                {verifyForm.formState.errors.code.message}
              </span>
            )}
          </div>

          {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
          {formError && <p className={styles.errorMessage}>{formError}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={verifyForm.formState.isSubmitting}
          >
            {verifyForm.formState.isSubmitting ? "Проверяем…" : "Подтвердить"}
          </button>

          <div className={styles.verifyActions}>
            <button
              type="button"
              className={styles.textButton}
              onClick={handleResendCode}
              disabled={verifyForm.formState.isSubmitting || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Повторная отправка через ${formatResendCooldown(resendCooldown)}`
                : "Отправить код повторно"}
            </button>
            <button
              type="button"
              className={styles.textButton}
              onClick={handleBackToCredentials}
            >
              Назад
            </button>
          </div>
          {resendCooldown > 0 && (
            <p className={styles.resendHint}>
              Новый код можно запросить через {formatResendCooldown(resendCooldown)}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className={styles.authBlock}>
      <div className={styles.tabs}>
        <div
          className={styles.tabIndicator}
          style={{ transform: mode === "login" ? "translateX(0%)" : "translateX(100%)" }}
          aria-hidden="true"
        />
        <button
          type="button"
          className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
          onClick={() => switchMode("login")}
        >
          Вход
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === "register" ? styles.tabActive : ""}`}
          onClick={() => switchMode("register")}
        >
          Регистрация
        </button>
      </div>

      <div
        className={`${styles.formPanel} ${
          mode === "login" ? styles.formPanelLogin : styles.formPanelRegister
        }`}
        key={mode}
      >
      {mode === "login" ? (
        <>
          <h1 className={styles.title}>Вход в личный кабинет</h1>
          <p className={styles.description}>
            Введите email и пароль — мы отправим код подтверждения на почту.
          </p>

          <form className={styles.form} onSubmit={handleLoginSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="Введите email"
                className={`${styles.input} ${
                  loginForm.formState.errors.email ? styles.inputError : ""
                }`}
                {...loginForm.register("email", {
                  validate: validateLoginEmail,
                })}
              />
              {loginForm.formState.errors.email && (
                <span className={styles.fieldError}>
                  {loginForm.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="login-password" className={styles.label}>
                Пароль
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="login-password"
                  type={showLoginPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Введите пароль"
                  className={`${styles.input} ${
                    loginForm.formState.errors.password ? styles.inputError : ""
                  }`}
                  {...loginForm.register("password", {
                    validate: validatePassword,
                  })}
                />
                <PasswordToggleButton
                  visible={showLoginPassword}
                  onToggle={() => setShowLoginPassword((v) => !v)}
                  label={showLoginPassword ? "Скрыть пароль" : "Показать пароль"}
                />
              </div>
              {loginForm.formState.errors.password && (
                <span className={styles.fieldError}>
                  {loginForm.formState.errors.password.message}
                </span>
              )}
            </div>

            {formError && <p className={styles.errorMessage}>{formError}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? "Отправляем код…" : "Войти"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.description}>
            Создайте аккаунт. Регистрация через Gmail недоступна — используйте другой email.
          </p>

          <form className={styles.form} onSubmit={handleRegisterSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="register-first-name" className={styles.label}>
                  Имя
                </label>
                <input
                  id="register-first-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Имя"
                  className={`${styles.input} ${
                    registerForm.formState.errors.first_name ? styles.inputError : ""
                  }`}
                  {...registerForm.register("first_name", {
                    validate: (v) => validateRequiredName(v, "имя"),
                  })}
                />
                {registerForm.formState.errors.first_name && (
                  <span className={styles.fieldError}>
                    {registerForm.formState.errors.first_name.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="register-last-name" className={styles.label}>
                  Фамилия
                </label>
                <input
                  id="register-last-name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Фамилия"
                  className={`${styles.input} ${
                    registerForm.formState.errors.last_name ? styles.inputError : ""
                  }`}
                  {...registerForm.register("last_name", {
                    validate: (v) => validateRequiredName(v, "фамилию"),
                  })}
                />
                {registerForm.formState.errors.last_name && (
                  <span className={styles.fieldError}>
                    {registerForm.formState.errors.last_name.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-email" className={styles.label}>
                Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="Введите email"
                className={`${styles.input} ${
                  registerForm.formState.errors.email ? styles.inputError : ""
                }`}
                {...registerForm.register("email", {
                  validate: validateEmail,
                })}
              />
              {registerForm.formState.errors.email && (
                <span className={styles.fieldError}>
                  {registerForm.formState.errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-phone" className={styles.label}>
                Телефон
              </label>
              <input
                id="register-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+7 (999) 123-45-67"
                className={`${styles.input} ${
                  registerForm.formState.errors.phone_number ? styles.inputError : ""
                }`}
                {...registerForm.register("phone_number", {
                  validate: validatePhone,
                })}
              />
              {registerForm.formState.errors.phone_number && (
                <span className={styles.fieldError}>
                  {registerForm.formState.errors.phone_number.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-password" className={styles.label}>
                Пароль
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="register-password"
                  type={showRegisterPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Минимум 8 символов, Aa и цифра"
                  className={`${styles.input} ${
                    registerForm.formState.errors.password ? styles.inputError : ""
                  }`}
                  {...registerForm.register("password", {
                    validate: validateRegistrationPassword,
                  })}
                />
                <PasswordToggleButton
                  visible={showRegisterPassword}
                  onToggle={() => setShowRegisterPassword((v) => !v)}
                  label={showRegisterPassword ? "Скрыть пароль" : "Показать пароль"}
                />
              </div>
              {registerForm.formState.errors.password && (
                <span className={styles.fieldError}>
                  {registerForm.formState.errors.password.message}
                </span>
              )}
              {!registerForm.formState.errors.password && registerPassword && (
                <span className={styles.fieldHint}>
                  Минимум 8 символов, заглавная и строчная буква, цифра
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-confirm-password" className={styles.label}>
                Подтвердите пароль
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Повторите пароль"
                  className={`${styles.input} ${
                    registerForm.formState.errors.confirmPassword ? styles.inputError : ""
                  }`}
                  {...registerForm.register("confirmPassword", {
                    validate: (value) => {
                      const password = registerForm.getValues("password");
                      if (!value) return "Подтвердите пароль";
                      if (value !== password) return "Пароли не совпадают";
                      return true;
                    },
                  })}
                />
                <PasswordToggleButton
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((v) => !v)}
                  label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                />
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <span className={styles.fieldError}>
                  {registerForm.formState.errors.confirmPassword.message}
                </span>
              )}
            </div>

            {formError && <p className={styles.errorMessage}>{formError}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={registerForm.formState.isSubmitting}
            >
              {registerForm.formState.isSubmitting
                ? "Отправляем код…"
                : "Зарегистрироваться"}
            </button>
          </form>
        </>
      )}
      </div>

      <p className={styles.privacyNote}>
        Продолжая, вы соглашаетесь с{" "}
        <Link href="/privacy" className={styles.privacyLink}>
          политикой конфиденциальности
        </Link>
      </p>
    </div>
  );
};

export default AccountAuth;
