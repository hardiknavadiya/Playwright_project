import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class JobPage extends BasePage {
    readonly jobs: Locator;

    constructor(page: Page) {
        super(page);
        // LinkedIn job listings - try multiple selectors
        this.jobs = page.locator('ul.scaffold-layout__list-container > li.scaffold-layout__list-item, ul.jobs-search__results-list > li, div.jobs-search-results__list-item');
    }

    async openJob() {
        try {
            const count = await this.jobs.count();
            console.log(`Found ${count} jobs.`);

            // Click jobs one by one
            for (let i = 0; i < Math.min(count, 5); ++i) {
                try {
                    console.log(`Attempting to click job ${i + 1} of ${count}`);
                    const item = this.jobs.nth(i);

                    await item.click({ timeout: 5000, force: true });
                    console.log(`Successfully clicked job ${i + 1}`);

                    // Wait for job details to load
                    await this.page.waitForTimeout(2000);

                } catch (error) {
                    console.log(`Error clicking job ${i + 1}: ${error.message}`);
                }
            }
        } catch (error) {
            console.log(`Error in openJob method: ${error.message}`);
            console.log(`Error stack: ${error.stack}`);
            throw error;
        }
    }
}

