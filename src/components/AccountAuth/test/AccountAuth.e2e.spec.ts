import { test, expect } from "@playwright/test";

test.describe("AccountAuth mobile inputs", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("auth modal inputs match redesign typography on mobile", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("znves:cookie_consent", "1");
    });

    await page.goto("/account");

    const emailInput = page.getByLabel("Email", { exact: true });
    await expect(emailInput).toBeVisible();

    const fontSize = await emailInput.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );

    expect(parseFloat(fontSize)).toBe(14);
  });
});
