const { test, expect } = require('@playwright/test');

test('homepage loads and has the correct title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const locator = await page.getByText('Phonebook');
  await expect(locator).toBeVisible();
});

test('Phonebook entries can be created, modified and deleted', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByLabel('Name:').click();
  await page.getByLabel('Name:').fill('Test');
  await page.getByLabel('Phone:').click();
  await page.getByLabel('Phone:').fill('12345');
  await page.getByTestId('submit-button').click();

  const addedPersonName = await page.getByText('Test');
  await expect(addedPersonName).toBeVisible();
  const addedPersonNumber = await page.getByText('12345');
  await expect(addedPersonNumber).toBeVisible();

  await page.getByRole('button', { name: 'update' }).last().click();
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('Test2');
  await page.getByTestId('number-input').click();
  await page.getByTestId('number-input').fill('111111');
  await page
    .locator('div')
    .filter({ hasText: /^Update entryName:Phone:Submit$/ })
    .getByRole('button')
    .click();

  const updatedName = await page.getByText('Test2');
  await expect(updatedName).toBeVisible();
  const updatedNumber = await page.getByText('111111');
  await expect(updatedNumber).toBeVisible();

  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'delete' }).last().click();
  await page.waitForTimeout(2000);

  await expect(updatedName).not.toBeVisible();
  await expect(updatedNumber).not.toBeVisible();
});
