import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
});