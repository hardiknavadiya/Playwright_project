import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
    readonly search: Locator;

    constructor(page: Page) {
        super(page);
        this.search = page.getByPlaceholder("Search");
    }

    async SearchText(searchText: string) {
        await this.search.fill(searchText);
        await this.search.press('Enter');
    }
}

