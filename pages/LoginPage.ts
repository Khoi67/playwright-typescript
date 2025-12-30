import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    readonly errorMsg: Locator;

    constructor(private page:  Page) {
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.submitBtn = this.page.locator('button[type="submit"]');
        this.errorMsg = page.locator('.oxd-alert-content-text');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
    }
    
    // Dùng async -> Promise<Locator>
    get errorMessage(): Locator {
        return this.errorMsg;
    }
}