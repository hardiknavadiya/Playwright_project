import {Locator, Page} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    // Wrapper for clicking elements with logging
    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }

    // Wrapper for filling text
    async fillText(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }
}