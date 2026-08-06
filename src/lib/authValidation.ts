const GMAIL_DOMAINS = ["gmail.com", "googlemail.com"];

export const isGmailAddress = (email: string): boolean => {
  const domain = email.trim().toLowerCase().split("@")[1];
  return !!domain && GMAIL_DOMAINS.includes(domain);
};

export const validateEmail = (email: string): string | true => {
  const trimmed = email.trim();
  if (!trimmed) return "Введите email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Введите корректный email";
  }
  if (isGmailAddress(trimmed)) {
    return "Регистрация через Gmail недоступна. Используйте другой email";
  }
  return true;
};

export const validateLoginEmail = (email: string): string | true => {
  const trimmed = email.trim();
  if (!trimmed) return "Введите email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Введите корректный email";
  }
  return true;
};

/** Интервал между повторными отправками кода (секунды) */
export const AUTH_RESEND_COOLDOWN_SECONDS = 60;

export const validatePassword = (password: string): string | true => {
  if (!password) return "Введите пароль";
  if (password.length < 8) return "Пароль должен содержать минимум 8 символов";
  return true;
};

/** Строгая проверка пароля при регистрации */
export const validateRegistrationPassword = (password: string): string | true => {
  if (!password) return "Введите пароль";
  if (password.length < 8) return "Пароль должен содержать минимум 8 символов";
  if (!/[a-zа-яё]/.test(password)) {
    return "Пароль должен содержать строчную букву";
  }
  if (!/[A-ZА-ЯЁ]/.test(password)) {
    return "Пароль должен содержать заглавную букву";
  }
  if (!/\d/.test(password)) {
    return "Пароль должен содержать цифру";
  }
  return true;
};

export const formatResendCooldown = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export const validatePhone = (phone: string): string | true => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "Введите номер телефона";
  // Код страны (1–3) + национальный номер СНГ (обычно 8–10)
  if (digits.length < 11 || digits.length > 15) {
    return "Введите корректный номер телефона";
  }
  return true;
};

export const validateRequiredName = (value: string, label: string): string | true => {
  const trimmed = value.trim();
  if (!trimmed) return `Введите ${label}`;
  if (trimmed.length < 2) return `${label} слишком короткое`;
  return true;
};

export const validateCode = (code: string): string | true => {
  const trimmed = code.trim();
  if (!trimmed) return "Введите код из письма";
  if (!/^\d{6}$/.test(trimmed)) return "Введите 6-значный код из письма";
  return true;
};
