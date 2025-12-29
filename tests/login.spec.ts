import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ENV } from '../utils/TestData';

test.describe('Login Testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('Login with valid field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.login(ENV.username, ENV.password);
        await page.waitForTimeout(5000);

        expect(page).toHaveURL(/dashboard/);
    })
})