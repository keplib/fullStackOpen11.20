const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:5173'); // URL where your frontend is running
  const locator = await page.getByText('Phonebook');
  await expect(locator).toBeVisible();
});
