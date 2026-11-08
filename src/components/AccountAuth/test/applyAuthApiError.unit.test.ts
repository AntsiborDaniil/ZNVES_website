import { expect, it, vi } from "vitest";
import type { UseFormReturn } from "react-hook-form";
import { applyAuthApiError } from "../applyAuthApiError";

it("preserves server field validation from serializable RTK errors", () => {
  const setError = vi.fn();
  const setFormError = vi.fn();
  applyAuthApiError({
    error: { message: "Проверьте данные", fieldErrors: { email: "Email уже используется" } },
    form: { setError } as unknown as UseFormReturn<{ email: string }>,
    fieldMap: { email: "email" },
    setFormError,
    fallback: "Ошибка",
  });
  expect(setError).toHaveBeenCalledWith("email", { type: "server", message: "Email уже используется" });
  expect(setFormError).toHaveBeenCalledWith("Проверьте данные");
});

it("shows a serializable general error without losing its message", () => {
  const setFormError = vi.fn();
  applyAuthApiError({
    error: { message: "Сервис временно недоступен" },
    form: { setError: vi.fn() } as unknown as UseFormReturn<{ email: string }>,
    fieldMap: {},
    setFormError,
    fallback: "Ошибка",
  });
  expect(setFormError).toHaveBeenCalledWith("Сервис временно недоступен");
});
