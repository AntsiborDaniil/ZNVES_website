import { describe, expect, it } from "vitest";
import {
  AUTH_RESEND_COOLDOWN_SECONDS,
  formatResendCooldown,
  isGmailAddress,
  validateCode,
  validateEmail,
  validateLoginEmail,
  validatePassword,
  validatePhone,
  validateRegistrationPassword,
  validateRequiredName,
} from "../authValidation";

describe("authValidation", () => {
  it("blocks gmail addresses for registration", () => {
    expect(isGmailAddress("user@gmail.com")).toBe(true);
    expect(validateEmail("user@gmail.com")).toBe(
      "Регистрация через Gmail недоступна. Используйте другой email"
    );
  });

  it("allows non-gmail addresses for registration", () => {
    expect(validateEmail("user@yandex.ru")).toBe(true);
  });

  it("allows gmail for login email validation", () => {
    expect(validateLoginEmail("user@gmail.com")).toBe(true);
  });

  it("validates password length for login", () => {
    expect(validatePassword("short")).toBe("Пароль должен содержать минимум 8 символов");
    expect(validatePassword("longenough")).toBe(true);
  });

  it("validates registration password strength", () => {
    expect(validateRegistrationPassword("short")).toBe(
      "Пароль должен содержать минимум 8 символов"
    );
    expect(validateRegistrationPassword("password")).toBe(
      "Пароль должен содержать заглавную букву"
    );
    expect(validateRegistrationPassword("Password")).toBe(
      "Пароль должен содержать цифру"
    );
    expect(validateRegistrationPassword("Password1")).toBe(true);
  });

  it("validates phone digits", () => {
    expect(validatePhone("+7 (999) 123-45-67")).toBe(true);
    expect(validatePhone("123")).toBe("Введите корректный номер телефона");
  });

  it("validates required names", () => {
    expect(validateRequiredName("", "имя")).toBe("Введите имя");
    expect(validateRequiredName("А", "имя")).toBe("имя слишком короткое");
    expect(validateRequiredName("Иван", "имя")).toBe(true);
  });

  it("validates verification code", () => {
    expect(validateCode("123")).toBe("Код должен содержать от 4 до 8 цифр");
    expect(validateCode("123456")).toBe(true);
  });

  it("formats resend cooldown timer", () => {
    expect(AUTH_RESEND_COOLDOWN_SECONDS).toBe(60);
    expect(formatResendCooldown(65)).toBe("1:05");
    expect(formatResendCooldown(9)).toBe("0:09");
  });
});
