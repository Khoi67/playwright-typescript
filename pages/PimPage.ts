import { expect, Locator, Page } from "@playwright/test";

export class PimPage {
    readonly pimPage: Locator;
    readonly addEmployeeBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeId: Locator;
    readonly saveBtn: Locator;
    // Employee List page
    readonly employeeTableRows: Locator;
    readonly nextPageBtn: Locator;


    constructor(private page: Page) {
        //Navigation
        this.pimPage = this.page.locator('.oxd-main-menu-item--name').nth(1);
        this.addEmployeeBtn = this.page.getByText('Add Employee');

        // Input fields - Add Employee page
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.employeeId = this.page.locator('.oxd-input--active').nth(4);
        this.saveBtn = this.page.getByRole('button', { name: ' Save ' });

        // Employee List page
        this.employeeTableRows = this.page.locator('.oxd-table-body .oxd-table-card .oxd-table-row');
        this.nextPageBtn = this.page.locator('button.oxd-pagination-page-item--previous-next').nth(1);
    }

    async goToPimPage() {
        await this.pimPage.click();
    }

    async goToAddEmployeePage() {
        await this.addEmployeeBtn.click();
    }

    async addEmployee(firstName: string, lastName: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.saveBtn.click();
    }

    get EmployeeId(): Locator {
        return this.employeeId;
    }

    getEmployeeIdCell(row: Locator): Locator {
        return row.locator('.oxd-table-cell').nth(1);
    }

    getFirstNameCell(row: Locator): Locator {
        return row.locator('.oxd-table-cell').nth(2);
    }

    getLastNameCell(row: Locator): Locator {
        return row.locator('.oxd-table-cell').nth(3);
    }

    async verifyEmployeeInTable(firstName: string, lastName: string, employeeId: string) {
        while (true) {
            const rowCount = await this.employeeTableRows.count();
            // console.log(`Count: ${rowCount}`);

            for (let i = 0; i < rowCount; i++) {
                const row = this.employeeTableRows.nth(i);

                const fn = (await this.getFirstNameCell(row).innerText()).trim();
                const ln = (await this.getLastNameCell(row).innerText()).trim();
                const empId = (await this.getEmployeeIdCell(row).innerText()).trim();

                if (fn === firstName && ln === lastName && empId === employeeId) {
                    // console.log(`Employee ${fn} ${ln} ${empId} found in table`);
                    // Found
                    await expect(this.getFirstNameCell(row)).toHaveText(firstName);
                    await expect(this.getLastNameCell(row)).toHaveText(lastName);
                    await expect(this.getEmployeeIdCell(row)).toHaveText(employeeId);

                    return;
                }
            }
            // Không thấy nút next thì thoát
            if (await this.nextPageBtn.isHidden()) {
                break;
            }

            await this.nextPageBtn.click();
            await this.page.waitForLoadState('networkidle');
        }
    }


}