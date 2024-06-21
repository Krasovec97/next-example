import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";
test('Register user', async ({ page, browserName }) => {
    let timeout = 5000;
    let fakeName = faker.person.fullName();
    await page.goto('http://localhost:3000/register');
    let nameInput = page.locator('input[name="name"]');
    let emailInput = page.locator('input[name="email"]');
    let passInput = page.locator('input[name="password"]');
    // Expects page to have a heading with the name of Installation.
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passInput).toBeVisible();
    await nameInput.fill(fakeName);
    await emailInput.fill(faker.internet.email())
    await passInput.fill(faker.internet.password({length: 10, prefix: '!A'}))
    await page.getByRole('button', {name: 'Submit'}).click();
    if (browserName.toLowerCase() === 'webkit') {
        timeout = 0
    }
    await expect(page).toHaveURL('http://localhost:3000/profile', {timeout: timeout})
});
