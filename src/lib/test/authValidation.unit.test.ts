import { describe, expect, it } from "vitest";
import {
  isGmailAddress,
  validateCode,
  validateEmail,
  validateLoginEmail,
  validatePassword,
  validatePhone,
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

  it("validates password length", () => {
    expect(validatePassword("short")).toBe("Пароль должен содержать минимум 8 символов");
    expect(validatePassword("longenough")).toBe(true);
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
});
