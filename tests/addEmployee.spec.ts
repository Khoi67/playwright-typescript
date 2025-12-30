import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ENV } from "../utils/TestData";
import { PimPage } from "../pages/PimPage";

//.serial để chạy theo thứ tự
test.describe.serial('PIM Add Employee Suite', () => {
    let firstName = 'John';
    let lastName = 'Doe';
    let employeeId: string;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login(ENV.username, ENV.password);
    });

    test('TC-1: Test Add Employee', async ({ page }) => {
        const pimPage = new PimPage(page);

        await pimPage.goToPimPage();
        await expect(page).toHaveURL(/pim/);

        await pimPage.goToAddEmployeePage();
        await expect(page).toHaveURL(/pim\/addEmployee/);

        await pimPage.addEmployee(firstName, lastName);
        employeeId = await pimPage.EmployeeId.inputValue();
        
        await page.waitForURL(/viewPersonalDetails\/empNumber/);
        await expect(page).toHaveURL(
            /pim\/viewPersonalDetails\/empNumber\/\d+/
        );
        // await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    });

    test('TC-2: Check Added Employee', async ({ page }) => {
        const pimPage = new PimPage(page);

        await pimPage.goToPimPage();
        await expect(page).toHaveURL(/pim\/viewEmployeeList/);

        // Đợi load cái bảng
        await page.waitForLoadState('networkidle');

        // console.log(`Verifying employee: ${firstName} ${lastName} with ID: ${employeeId}`);
        await pimPage.verifyEmployeeInTable(firstName, lastName, employeeId);
    });
});