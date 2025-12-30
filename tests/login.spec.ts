import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ENV, testData } from '../utils/TestData';

test.describe('Login Testing Suit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('TC-1: Login with valid field', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(ENV.username, ENV.password);
        await expect(page).toHaveURL(/dashboard/);
    })

    for (const data of testData) {
        test(`TC2: Login fail with ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.login(data.username, data.password);
            await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
        });
    }

    test('TC-3: Login with empty field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const errorMsg = page.locator('.oxd-input-field-error-message');

        await loginPage.login('', '');
        
        await expect(errorMsg).toHaveCount(2);
        await expect(errorMsg.nth(0)).toContainText('Required');
        await expect(errorMsg.nth(1)).toContainText('Required');
    })
})