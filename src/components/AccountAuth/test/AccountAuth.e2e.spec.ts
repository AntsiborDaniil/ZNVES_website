import { test, expect } from "@playwright/test";

test.describe("Account page auth", () => {
  test("shows login and registration tabs", async ({ page }) => {
    await page.goto("/account");

    await expect(page.getByRole("button", { name: "Вход" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Регистрация" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Вход в личный кабинет" })).toBeVisible();
  });

  test("switches to registration form", async ({ page }) => {
    await page.goto("/account");
    await page.getByRole("button", { name: "Регистрация" }).click();

    await expect(page.getByRole("heading", { name: "Регистрация" })).toBeVisible();
    await expect(page.getByLabel("Имя")).toBeVisible();
    await expect(page.getByLabel("Фамилия")).toBeVisible();
  });
});
