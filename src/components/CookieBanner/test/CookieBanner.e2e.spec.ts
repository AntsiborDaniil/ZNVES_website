import { test, expect } from "@playwright/test";

test.describe("Cookie banner", () => {
  test("accepts cookie consent", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("znves:cookie_consent");
    });

    await page.goto("/");

    const banner = page.getByRole("region", { name: "Уведомление об использовании cookie" });
    await expect(banner).toBeVisible();

    await page.getByRole("button", { name: "Понятно" }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() => localStorage.getItem("znves:cookie_consent"));
    expect(consent).toBe("1");
  });
});
