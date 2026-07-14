import { test, expect } from "@playwright/test";

test.describe("AccountAuth mobile inputs", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("auth inputs use at least 16px font-size on mobile", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("znves:cookie_consent", "1");
    });

    await page.goto("/account");

    const emailInput = page.getByLabel("Email");
    await expect(emailInput).toBeVisible();

    const fontSize = await emailInput.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );

    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);
  });
});
