import { test, expect } from "@playwright/test";
import {
  MOCK_AUTH_CODE,
  MOCK_DEV_USER,
  expectAccountHub,
  fillOtp,
  preparePage,
} from "../../../test-utils/e2e/fixtures";

test.describe("AccountAuth flows", () => {
  test.beforeEach(async ({ page }) => {
    await preparePage(page);
  });

  test("login with mock user and OTP opens account", async ({ page }) => {
    await page.goto("/account");

    await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
    await page.locator("#login-password").fill(MOCK_DEV_USER.password);
    await page.getByRole("button", { name: "Войти" }).click();

    await expect(page.getByText("Подтверждение входа")).toBeVisible();
    await fillOtp(page, MOCK_AUTH_CODE);
    await page.getByRole("button", { name: "Подтвердить" }).click();

    await expectAccountHub(page);
    await expect(page.getByText(MOCK_DEV_USER.email)).toBeVisible();
  });

  test("shows error on wrong password", async ({ page }) => {
    await page.goto("/account");

    await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
    await page.locator("#login-password").fill("wrong-password");
    await page.getByRole("button", { name: "Войти" }).click();

    await expect(page.getByText("Неверный email или пароль")).toBeVisible();
  });

  test("shows error on wrong OTP", async ({ page }) => {
    await page.goto("/account");

    await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
    await page.locator("#login-password").fill(MOCK_DEV_USER.password);
    await page.getByRole("button", { name: "Войти" }).click();

    await fillOtp(page, "000000");
    await page.getByRole("button", { name: "Подтвердить" }).click();

    await expect(page.getByText("Неверный код подтверждения")).toBeVisible();
  });

  test("register new user and verify OTP", async ({ page }) => {
    const email = `e2e-${Date.now()}@znves.ru`;

    await page.goto("/account");
    await page.getByRole("button", { name: "Регистрация" }).click();

    await page.getByLabel("Имя").fill("Тест");
    await page.getByLabel("Фамилия").fill("Юзер");
    await page.getByLabel("Email", { exact: true }).fill(email);
    await page.locator('input[type="tel"]').fill("9991112233");
    await page.locator("#register-password").fill("Secret123");
    await page.locator("#register-confirm-password").fill("Secret123");

    await page.getByRole("button", { name: "Зарегистрироваться" }).click();
    await expect(page.getByText("Подтверждение регистрации")).toBeVisible();

    await fillOtp(page);
    await page.getByRole("button", { name: "Подтвердить" }).click();

    await expectAccountHub(page);
  });

  test("blocks registration with existing email", async ({ page }) => {
    await page.goto("/account");
    await page.getByRole("button", { name: "Регистрация" }).click();

    await page.getByLabel("Имя").fill("Dev");
    await page.getByLabel("Фамилия").fill("User");
    await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
    await page.locator('input[type="tel"]').fill("9991234567");
    await page.locator("#register-password").fill("Password123");
    await page.locator("#register-confirm-password").fill("Password123");

    await page.getByRole("button", { name: "Зарегистрироваться" }).click();
    await expect(page.getByText("Пользователь с таким email уже существует")).toBeVisible();
  });

  test("resend code button appears on verify step", async ({ page }) => {
    await page.goto("/account");
    await page.getByLabel("Email", { exact: true }).fill(MOCK_DEV_USER.email);
    await page.locator("#login-password").fill(MOCK_DEV_USER.password);
    await page.getByRole("button", { name: "Войти" }).click();

    await expect(page.getByText("Подтверждение входа")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Отправить код повторно|Повторная отправка/ })
    ).toBeVisible();
  });
});
