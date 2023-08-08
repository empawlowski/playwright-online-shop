import { test } from '@playwright/test';
import { HomePage } from '../../components/home.component';

test.describe('Function on Home page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }, testInfo) => {
    //Arrange
    homePage = new HomePage(page);
    console.log(`Running ${testInfo.title}`);

    //Act
    // await chromium.launch(); //*Commented because using all browsers for tests

    //* Advertisements blocker
    await page.route('**/*', (route) => {
      if (route.request().url().startsWith('https://googleads.')) {
        route.abort();
      } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await homePage.openPage();

    //Assert
    await homePage.expectPage();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus) console.log(`Did not run as expected, ended up at ${page.url()}`);

    // await page.close();
  });

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page }) => {
    //Assert
    homePage = new HomePage(page);

    //Act
    await homePage.scrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: hSubscription.png
    // second assertion: hAutomationExercise.png;

    // Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Click on arrow at bottom right side to move upward
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ page }) => {
    //Assert
    homePage = new HomePage(page);

    //Act
    await homePage.noScrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: noScrollUpHSubscription.png
    // second assertion: noScrollUpHAutomationExercise.png;

    // Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Scroll up page to top
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });
});
