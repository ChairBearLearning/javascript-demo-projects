import { Page, BrowserContext, expect } from '@playwright/test';

export class DashboardPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/dashboard');
    }
    async openReportInNewTab(context: BrowserContext) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.page.click('text=Open Report') // link that opens a new tab
        ]);

        await newPage.waitForLoadState();
        this.page = newPage; //  now your page object tracks the new tab
    }

    async verifyReportTitle(expectedTitle: string) {
        const title = this.page.locator('h1');
        await expect(title).toHaveText(expectedTitle);
    }
}
