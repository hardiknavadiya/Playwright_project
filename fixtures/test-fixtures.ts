import { test as base, chromium, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import {JobPage } from "../pages/job.page";
import * as path from 'path';

type Pages = {
    homePage: HomePage;
    jobPage: JobPage;
    context: BrowserContext;
};

export const test = base.extend<Pages>({
    context: async ({ }, use) => {
        // Create a persistent context
        const userDataDir = path.join(__dirname, '..', 'playwright-profile');
        const context = await chromium.launchPersistentContext(userDataDir, {
            channel: 'chrome',
            headless: false,
            viewport: null,
            args: [
                '--start-maximized',
                '--disable-blink-features=AutomationControlled',
                '--no-first-run',
                '--no-default-browser-check'
            ],
            // Don't close on disconnect
            ignoreDefaultArgs: ['--enable-automation']
        });

        await use(context);

        // Close all pages before closing context
        const pages = context.pages();
        for (const page of pages) {
            if (!page.isClosed()) {
                await page.close().catch(() => {});
            }
        }

        await context.close();
    },

    page: async ({ context }, use) => {
        // Get the first page or create a new one
        let page = context.pages()[0];
        if (!page) {
            page = await context.newPage();
        }

        // Listen for new pages being opened
        context.on('page', async (newPage) => {
            console.log('New page opened:', newPage.url());
        });

        await use(page);

    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    jobPage: async ({ page }, use) => {
        await use(new JobPage(page));
    },
});

export { expect } from '@playwright/test';

