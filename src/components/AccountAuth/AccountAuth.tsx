"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  changePasswordWithResetToken,
  loginUser,
  registerUser,
  requestPasswordReset,
  resendAuthCode,
  verifyLogin,
  verifyPasswordResetCode,
  verifyRegistration,
  type AuthUser,
} from "../../api/auth/authApi";
import OtpInput from "../OtpInput/OtpInput";
import PhoneInput from "../PhoneInput/PhoneInput";
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
import {
  clearPendingAccountAuthFlow,
  getPendingAccountAuthFlow,
  getResendCooldownRemaining,
  savePendingAccountAuthFlow,
} from "./accountAuthFlowStorage";
import { applyAuthApiError } from "./applyAuthApiError";
import styles from "./AccountAuth.module.css";

type AuthMode = "login" | "register";

type AuthStep =
  | "credentials"
  | "verify"
  | "reset-email"
  | "reset-code"
  | "reset-password"
  | "reset-success";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

type VerifyFormValues = {
  code: string;
};

type ResetEmailFormValues = {
  email: string;
};

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

type AccountAuthProps = {
  onAuthenticated?: () => void;
  variant?: "page" | "modal";
  initialMode?: AuthMode;
  redirectOnSuccess?: boolean;
};

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      mode: "login" as AuthMode,
      step: "credentials" as const,
      pendingEmail: "",
      loginPassword: "",
      resendCooldown: 0,
    };
  }

  const pending = getPendingAccountAuthFlow();
  if (!pending) {
    return {
      mode: "login" as AuthMode,
      step: "credentials" as const,
      pendingEmail: "",
      loginPassword: "",
      resendCooldown: 0,
    };
  }

  return {
    mode: pending.mode,
    step: "verify" as const,
    pendingEmail: pending.pendingEmail,
    loginPassword: pending.loginPassword ?? "",
    resendCooldown: getResendCooldownRemaining(pending.resendCooldownEndsAt),
  };
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

const AccountAuth = ({
  onAuthenticated,
  variant = "page",
  initialMode = "login",
  redirectOnSuccess,
}: AccountAuthProps) => {
  const router = useRouter();
  const { checkAuth, updateUser } = useAuth();
  const isModal = variant === "modal";
  const shouldRedirectOnSuccess = redirectOnSuccess ?? !isModal;
  const blockClassName = isModal
    ? `${styles.authBlock} ${styles.authBlockModal}`
    : styles.authBlock;
  const [initialAuth] = useState(getInitialAuthState);
  const [mode, setMode] = useState<AuthMode>(
    initialAuth.step === "verify" ? initialAuth.mode : initialMode
  );
  const [step, setStep] = useState<AuthStep>(initialAuth.step);
  const [pendingEmail, setPendingEmail] = useState(initialAuth.pendingEmail);
  const [loginPassword, setLoginPassword] = useState(initialAuth.loginPassword);
  const [resetToken, setResetToken] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetPasswordConfirm, setShowResetPasswordConfirm] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(initialAuth.resendCooldown);

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
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const verifyForm = useForm<VerifyFormValues>({
    ...formOptions,
    defaultValues: { code: "" },
  });

  const resetEmailForm = useForm<ResetEmailFormValues>({
    ...formOptions,
    defaultValues: { email: "" },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    ...formOptions,
    defaultValues: { password: "", confirmPassword: "" },
  });

  const registerPassword = registerForm.watch("password");
  const isPasswordResetFlow =
    step === "reset-email" ||
    step === "reset-code" ||
    step === "reset-password" ||
    step === "reset-success";

  useEffect(() => {
    if (step !== "verify" || !pendingEmail) {
      clearPendingAccountAuthFlow();
      return;
    }

    savePendingAccountAuthFlow({
      step: "verify",
      mode,
      pendingEmail,
      loginPassword: mode === "login" ? loginPassword : undefined,
      resendCooldownEndsAt:
        resendCooldown > 0 ? Date.now() + resendCooldown * 1000 : undefined,
    });
  }, [step, mode, pendingEmail, loginPassword, resendCooldown]);

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
    setResetToken("");
    clearPendingAccountAuthFlow();
    verifyForm.reset();
    resetEmailForm.reset();
    resetPasswordForm.reset();
  };

  const openPasswordReset = () => {
    const loginEmail = loginForm.getValues("email").trim();
    setStep("reset-email");
    setMode("login");
    setFormError(null);
    setInfoMessage(null);
    setResendCooldown(0);
    setResetToken("");
    clearPendingAccountAuthFlow();
    resetEmailForm.reset({ email: loginEmail });
    resetPasswordForm.reset();
    verifyForm.reset();
  };

  const completeAuth = async (verifiedUser: AuthUser) => {
    clearPendingAccountAuthFlow();
    updateUser(verifiedUser);
    await checkAuth(true);
    onAuthenticated?.();
    if (shouldRedirectOnSuccess) {
      router.replace("/account");
    }
  };

  const handleLoginSubmit = loginForm.handleSubmit(async (values) => {
    loginForm.clearErrors();
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
      applyAuthApiError({
        error,
        form: loginForm,
        fieldMap: { email: "email", password: "password" },
        setFormError,
        fallback: "Не удалось выполнить вход",
      });
    }
  });

  const handleRegisterSubmit = registerForm.handleSubmit(async (values) => {
    registerForm.clearErrors();
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
      applyAuthApiError({
        error,
        form: registerForm,
        fieldMap: {
          email: "email",
          password: "password",
          first_name: "first_name",
          last_name: "last_name",
          phone_number: "phone_number",
        },
        setFormError,
        fallback: "Не удалось зарегистрироваться",
      });
    }
  });

  const handleVerifySubmit = verifyForm.handleSubmit(async (values) => {
    verifyForm.clearErrors();
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
      applyAuthApiError({
        error,
        form: verifyForm,
        fieldMap: { code: "code" },
        setFormError,
        fallback: "Не удалось подтвердить код",
      });
    }
  });

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    verifyForm.clearErrors();
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
      applyAuthApiError({
        error,
        form: verifyForm,
        fieldMap: { code: "code" },
        setFormError,
        fallback: "Не удалось отправить код повторно",
      });
    }
  };

  const handleBackToCredentials = () => {
    setStep("credentials");
    setFormError(null);
    setInfoMessage(null);
    setResendCooldown(0);
    setResetToken("");
    clearPendingAccountAuthFlow();
    verifyForm.reset();
    resetEmailForm.reset();
    resetPasswordForm.reset();
  };

  const handleResetEmailSubmit = resetEmailForm.handleSubmit(async (values) => {
    resetEmailForm.clearErrors();
    setFormError(null);
    setInfoMessage(null);
    try {
      await requestPasswordReset(values.email.trim());
      setPendingEmail(values.email.trim());
      setStep("reset-code");
      verifyForm.reset();
      startResendCooldown();
      setInfoMessage("Код для сброса пароля отправлен на вашу почту");
    } catch (error) {
      applyAuthApiError({
        error,
        form: resetEmailForm,
        fieldMap: { email: "email" },
        setFormError,
        fallback: "Не удалось отправить код",
      });
    }
  });

  const handleResetCodeSubmit = verifyForm.handleSubmit(async (values) => {
    verifyForm.clearErrors();
    setFormError(null);
    setInfoMessage(null);
    try {
      const token = await verifyPasswordResetCode(pendingEmail, values.code.trim());
      setResetToken(token);
      setStep("reset-password");
      resetPasswordForm.reset();
      setInfoMessage(null);
    } catch (error) {
      applyAuthApiError({
        error,
        form: verifyForm,
        fieldMap: { code: "code" },
        setFormError,
        fallback: "Не удалось подтвердить код",
      });
    }
  });

  const handleResetPasswordSubmit = resetPasswordForm.handleSubmit(async (values) => {
    resetPasswordForm.clearErrors();
    setFormError(null);
    setInfoMessage(null);

    if (values.password !== values.confirmPassword) {
      resetPasswordForm.setError("confirmPassword", {
        type: "validate",
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      await changePasswordWithResetToken(resetToken, values.password);
      setStep("reset-success");
      setInfoMessage("Пароль успешно изменён. Теперь можно войти с новым паролем.");
    } catch (error) {
      applyAuthApiError({
        error,
        form: resetPasswordForm,
        fieldMap: { password: "password" },
        setFormError,
        fallback: "Не удалось изменить пароль",
      });
    }
  });

  const handleResendResetCode = async () => {
    if (resendCooldown > 0 || !pendingEmail) return;

    verifyForm.clearErrors();
    setFormError(null);
    setInfoMessage(null);
    try {
      await requestPasswordReset(pendingEmail);
      startResendCooldown();
      setInfoMessage("Код отправлен повторно");
    } catch (error) {
      applyAuthApiError({
        error,
        form: verifyForm,
        fieldMap: { code: "code" },
        setFormError,
        fallback: "Не удалось отправить код повторно",
      });
    }
  };

  const handleBackToLoginAfterReset = () => {
    handleBackToCredentials();
    setMode("login");
    setInfoMessage("Войдите с новым паролем");
  };

  if (step === "reset-success") {
    return (
      <div className={blockClassName}>
        <h1 className={styles.title}>Пароль изменён</h1>
        <p className={`${styles.description} ${styles.descriptionVisible}`}>
          {infoMessage || "Теперь вы можете войти в личный кабинет с новым паролем."}
        </p>
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleBackToLoginAfterReset}
        >
          Войти
        </button>
      </div>
    );
  }

  if (step === "reset-password") {
    return (
      <div className={blockClassName}>
        <h1 className={styles.title}>Новый пароль</h1>
        <p className={`${styles.description} ${styles.descriptionVisible}`}>
          Придумайте новый пароль для{" "}
          <span className={styles.emailHighlight}>{pendingEmail}</span>
        </p>

        <form className={styles.form} onSubmit={handleResetPasswordSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="reset-password" className={styles.label}>
              Новый пароль
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="reset-password"
                type={showResetPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Минимум 8 символов, Aa и цифра"
                className={`${styles.input} ${
                  resetPasswordForm.formState.errors.password ? styles.inputError : ""
                }`}
                {...resetPasswordForm.register("password", {
                  validate: validateRegistrationPassword,
                })}
              />
              <PasswordToggleButton
                visible={showResetPassword}
                onToggle={() => setShowResetPassword((v) => !v)}
                label={showResetPassword ? "Скрыть пароль" : "Показать пароль"}
              />
            </div>
            {resetPasswordForm.formState.errors.password && (
              <span className={styles.fieldError}>
                {resetPasswordForm.formState.errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="reset-password-confirm" className={styles.label}>
              Повторите пароль
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="reset-password-confirm"
                type={showResetPasswordConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Повторите пароль"
                className={`${styles.input} ${
                  resetPasswordForm.formState.errors.confirmPassword ? styles.inputError : ""
                }`}
                {...resetPasswordForm.register("confirmPassword", {
                  validate: (value) =>
                    value.trim() ? true : "Повторите пароль",
                })}
              />
              <PasswordToggleButton
                visible={showResetPasswordConfirm}
                onToggle={() => setShowResetPasswordConfirm((v) => !v)}
                label={showResetPasswordConfirm ? "Скрыть пароль" : "Показать пароль"}
              />
            </div>
            {resetPasswordForm.formState.errors.confirmPassword && (
              <span className={styles.fieldError}>
                {resetPasswordForm.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>

          {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={resetPasswordForm.formState.isSubmitting}
          >
            {resetPasswordForm.formState.isSubmitting ? "Сохраняем…" : "Сохранить пароль"}
          </button>

          <div className={styles.verifyActions}>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => {
                setStep("reset-code");
                setFormError(null);
              }}
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "reset-code") {
    return (
      <div className={blockClassName}>
        <h1 className={styles.title}>Подтверждение</h1>
        <p className={`${styles.description} ${styles.descriptionVisible}`}>
          Введите код из письма, отправленного на{" "}
          <span className={styles.emailHighlight}>{pendingEmail}</span>
        </p>

        <form className={styles.form} onSubmit={handleResetCodeSubmit} noValidate>
          <div className={styles.field}>
            <span className={styles.label} id="reset-code-label">
              Код подтверждения
            </span>
            <Controller
              name="code"
              control={verifyForm.control}
              rules={{ validate: validateCode }}
              render={({ field }) => (
                <OtpInput
                  id="reset-code"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!verifyForm.formState.errors.code}
                  disabled={verifyForm.formState.isSubmitting}
                  aria-label="Код подтверждения из письма"
                />
              )}
            />
            {verifyForm.formState.errors.code && (
              <span className={styles.fieldError}>
                {verifyForm.formState.errors.code.message}
              </span>
            )}
          </div>

          {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
          {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

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
              onClick={handleResendResetCode}
              disabled={verifyForm.formState.isSubmitting || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Повторная отправка через ${formatResendCooldown(resendCooldown)}`
                : "Отправить код повторно"}
            </button>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => {
                setStep("reset-email");
                setFormError(null);
                setInfoMessage(null);
              }}
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "reset-email") {
    return (
      <div className={blockClassName}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <p className={`${styles.description} ${styles.descriptionVisible}`}>
          Введите email — мы отправим код для сброса пароля.
        </p>

        <form className={styles.form} onSubmit={handleResetEmailSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="reset-email" className={styles.label}>
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="Введите email"
              className={`${styles.input} ${
                resetEmailForm.formState.errors.email ? styles.inputError : ""
              }`}
              {...resetEmailForm.register("email", {
                validate: validateLoginEmail,
              })}
            />
            {resetEmailForm.formState.errors.email && (
              <span className={styles.fieldError}>
                {resetEmailForm.formState.errors.email.message}
              </span>
            )}
          </div>

          {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
          {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={resetEmailForm.formState.isSubmitting}
          >
            {resetEmailForm.formState.isSubmitting ? "Отправляем…" : "Отправить код"}
          </button>

          <div className={styles.verifyActions}>
            <button
              type="button"
              className={styles.textButton}
              onClick={handleBackToCredentials}
            >
              Назад ко входу
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className={blockClassName}>
        <h1 className={styles.title}>
          {mode === "login" ? "Подтверждение входа" : "Подтверждение регистрации"}
        </h1>
        <p className={`${styles.description} ${styles.descriptionVisible}`}>
          Введите код из письма, отправленного на{" "}
          <span className={styles.emailHighlight}>{pendingEmail}</span>
        </p>

        <form className={styles.form} onSubmit={handleVerifySubmit} noValidate>
          <div className={styles.field}>
            <span className={styles.label} id="verify-code-label">
              Код подтверждения
            </span>
            <Controller
              name="code"
              control={verifyForm.control}
              rules={{ validate: validateCode }}
              render={({ field }) => (
                <OtpInput
                  id="verify-code"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!verifyForm.formState.errors.code}
                  disabled={verifyForm.formState.isSubmitting}
                  aria-label="Код подтверждения из письма"
                />
              )}
            />
            {verifyForm.formState.errors.code && (
              <span className={styles.fieldError}>
                {verifyForm.formState.errors.code.message}
              </span>
            )}
          </div>

          {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
          {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

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
        </form>
      </div>
    );
  }

  return (
    <div className={blockClassName}>
      {!isPasswordResetFlow && (
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
      )}

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
              <button
                type="button"
                className={styles.forgotPasswordLink}
                onClick={openPasswordReset}
              >
                Забыли пароль?
              </button>
            </div>

            {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

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
              <Controller
                name="phone_number"
                control={registerForm.control}
                rules={{ validate: validatePhone }}
                render={({ field }) => (
                  <PhoneInput
                    id="register-phone"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!registerForm.formState.errors.phone_number}
                    disabled={registerForm.formState.isSubmitting}
                  />
                )}
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

            {formError && (
            <p className={styles.errorMessage} role="alert">
              {formError}
            </p>
          )}

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
