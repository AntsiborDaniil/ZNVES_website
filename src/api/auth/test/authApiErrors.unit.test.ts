import { describe, expect, it } from "vitest";
import {
  AuthApiError,
  humanizeAuthErrorMessage,
  parseAuthApiErrorBody,
  parseAuthApiErrorResponse,
} from "../authApiErrors";

describe("authApiErrors", () => {
  it("humanizes common English backend messages", () => {
    expect(humanizeAuthErrorMessage("Invalid credentials.")).toBe(
      "Неверный email или пароль"
    );
    expect(humanizeAuthErrorMessage("Incorrect verification code.")).toBe(
      "Неверный код подтверждения"
    );
  });

  it("parses detail-only errors", () => {
    const error = parseAuthApiErrorBody({ detail: "Invalid credentials." }, "fallback");
    expect(error).toBeInstanceOf(AuthApiError);
    expect(error.message).toBe("Неверный email или пароль");
    expect(error.fieldErrors).toEqual({});
  });

  it("maps field errors from DRF-style payload", () => {
    const error = parseAuthApiErrorBody(
      {
        email: ["Enter a valid email address."],
        password: ["This field is required."],
      },
      "fallback"
    );

    expect(error.fieldErrors.email).toBe("Введите корректный email");
    expect(error.fieldErrors.password).toBe("Заполните это поле");
    expect(error.message).toBe("Проверьте поля: Email, Пароль");
  });

  it("uses single field message as general message", () => {
    const error = parseAuthApiErrorBody({ code: ["Incorrect verification code."] }, "fallback");
    expect(error.message).toBe("Неверный код подтверждения");
    expect(error.fieldErrors.code).toBe("Неверный код подтверждения");
  });

  it("parses non_field_errors", () => {
    const error = parseAuthApiErrorBody(
      { non_field_errors: ["User with this email already exists."] },
      "fallback"
    );
    expect(error.message).toBe("Пользователь с таким email уже зарегистрирован");
  });

  it("parses nested errors object", () => {
    const error = parseAuthApiErrorBody(
      {
        errors: {
          email: ["Enter a valid email address."],
        },
      },
      "fallback"
    );
    expect(error.fieldErrors.email).toBe("Введите корректный email");
  });

  it("returns status-specific fallback for empty 401 response", async () => {
    const response = new Response("", { status: 401 });
    const error = await parseAuthApiErrorResponse(response, "fallback");
    expect(error.message).toBe("Неверный email, пароль или код подтверждения");
  });

  it("returns status-specific fallback for empty 429 response", async () => {
    const response = new Response("", { status: 429 });
    const error = await parseAuthApiErrorResponse(response, "fallback");
    expect(error.message).toBe("Слишком много попыток — попробуйте позже");
  });

  it("returns status-specific fallback for empty 404 response", async () => {
    const response = new Response("", { status: 404 });
    const error = await parseAuthApiErrorResponse(response, "fallback");
    expect(error.message).toBe("Сервис восстановления пароля недоступен");
  });

  it("returns status-specific fallback for empty 500 response", async () => {
    const response = new Response("", { status: 500 });
    const error = await parseAuthApiErrorResponse(response, "fallback");
    expect(error.message).toBe("Сервер временно недоступен — попробуйте позже");
  });

  it("humanizes Not found detail from JSON 404", async () => {
    const response = new Response(JSON.stringify({ detail: "Not found." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
    const error = await parseAuthApiErrorResponse(response, "fallback");
    expect(error.message).toBe("Сервис восстановления пароля недоступен");
  });

  it("uses fallback for HTML error pages", async () => {
    const response = new Response("<html><body>404 Not Found</body></html>", {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
    const error = await parseAuthApiErrorResponse(response, "Не удалось отправить код");
    expect(error.message).toBe("Сервис восстановления пароля недоступен");
  });
});
