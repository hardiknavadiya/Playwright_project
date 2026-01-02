import { test } from '../fixtures/test-fixtures';
import { AriaRole } from '../utils/aria-role';
import { JobPage } from '../pages/job.page';

test.describe('Login Tests', () => {
    test('Search Job in Linkedin', async ({ page, homePage }) => {
        await homePage.navigate('/');
        await homePage.SearchText("Selenium");
        await homePage.clickElement(AriaRole.BUTTON.setName("Jobs").build(page));
        const activeJobPage = new JobPage(page);
        await activeJobPage.openJob();
    });
});
