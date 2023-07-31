import { test } from '@playwright/test';
import { HomePage } from '../../components/home.component';

test.describe('Navigation for left sidebar', () => {
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

  test('Test Case 18: View Category Products', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);

    //Act
    await homePage.expectLeftSidebar();

    await homePage.openWomenCategory();
    await homePage.expectWomenDressProductsPage();

    await homePage.openMenCategory();
    //Assert
    await homePage.expectMenJeansProductsPage();

    // Test Case 18: View Category Products
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that categories are visible on left side bar
    // 4. Click on 'Women' category
    // 5. Click on any category link under 'Women' category, for example: Dress
    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    // 7. On left side bar, click on any sub-category link of 'Men' category
    // 8. Verify that user is navigated to that category page
  });

  test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);

    //Act
    await homePage.products.click();
    await homePage.expectLeftSidebar();
    await homePage.openBrandMastHarbour();

    //Assert
    await homePage.openBrandPolo();

    // Test Case 19: View & Cart Brand Products
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify that Brands are visible on left side bar
    // 5. Click on any brand name
    // 6. Verify that user is navigated to brand page and brand products are displayed
    // 7. On left side bar, click on any other brand link
    // 8. Verify that user is navigated to that brand page and can see products
  });
});
