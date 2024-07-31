const { test, expect, afterAll, describe, beforeAll } = require('@playwright/test');
const { execSync } = require('child_process');

describe('E2E tests', () => {
  test('homepage loads and has the correct title', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const locator = page.getByText('Phonebook');
    await expect(locator).toBeVisible();
  });

  test('Phonebook entries can be created, modified and deleted', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.getByLabel('Name:').click();
    await page.getByLabel('Name:').fill('Test');
    await page.getByLabel('Phone:').click();
    await page.getByLabel('Phone:').fill('12345');
    await page.getByTestId('submit-button').click();

    const addedPerson = await page.getByText('Test - 12345');
    await expect(addedPerson).toBeVisible();
    const notificationAfterAdd = page.getByTestId('notification-container');
    await expect(notificationAfterAdd).toBeVisible();
    const addNotificationText = await notificationAfterAdd.textContent();
    expect(addNotificationText).toBe('You added Test to the phonebook!');

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

    const updatedPerson = await page.getByText('Test2 - 111111');
    await expect(updatedPerson).toBeVisible();
    const notificationAfterUpdate = page.getByTestId('notification-container');
    await expect(notificationAfterUpdate).toBeVisible();
    const updateNotificationText = await notificationAfterUpdate.textContent();
    expect(updateNotificationText).toBe("You updated Test2's phonenumber entry!");

    page.on('dialog', async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'delete' }).last().click();
    await page.waitForTimeout(2000);

    await expect(updatedPerson).not.toBeVisible();
    const notificationAfterDelete = page.getByTestId('notification-container');
    await expect(notificationAfterUpdate).toBeVisible();
    const deleteNotificationText = await notificationAfterUpdate.textContent();
    expect(deleteNotificationText).toBe('You deleted Test2 from the phonebook!');

    execSync('docker-compose -f db/docker-compose.test.yaml down', { stdio: 'inherit' });
  });
});
