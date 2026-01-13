import {test, expect} from "../fixtures/test-fixtures";
import {faker} from "@faker-js/faker";

test.describe('Signup Tests', () => {
    test('User should be able to complete signup process', async ({ page, homePage, signupPage }) => {
        // Dismiss any Chrome restore popup that might appear
        await homePage.navigate('/');
        await homePage.openSignupPage();
        let emailFaker: string = faker.internet.email();
        const usernameFaker: string = faker.internet.username();
        await signupPage.createAccount(usernameFaker, emailFaker);
        await signupPage.accountInfromation();
        await expect(page).toHaveURL(/.*account_created/i);
        await signupPage.continueButton.click();
        await expect(page.getByText("Logged in as " +usernameFaker)).toBeVisible();
        await homePage.deleteAccountLink.click();
        await signupPage.continueButton.click();
        await expect(homePage.signupLink).toBeVisible();
    });
});