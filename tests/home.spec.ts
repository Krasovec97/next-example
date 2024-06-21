import { test, expect } from '@playwright/test';

test('Navigate to login page', async ({ page }) => {
  test.setTimeout(0);
  await page.goto('http://localhost:3000/');
  await page.content();
  // Click the get started link.
  await page.getByRole('link', {name: 'Login'}).click();
  await page.content();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
});

test('Navigate to Register page', async ({ page }) => {
  test.setTimeout(0);
  await page.goto('http://localhost:3000/');
  await page.content();
  // Click the get started link.
  await page.getByRole('link', {name: 'Register'}).click();
  await page.content();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByPlaceholder('John Snow')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
});
