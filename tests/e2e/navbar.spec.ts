// import { test, expect, chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { HomePage } from '../../components/home.component';
import { NavbarPage } from '../../pages/navbar.page';
import { homeData } from '../../test-data/home.data';
import { productData } from '../../test-data/product.data';
import { faker } from '@faker-js/faker';

test.describe('Navigation for Navbar pages', () => {
  let homePage: HomePage;
  let product: NavbarPage;

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

  test('Test Case 6: Contact Us Form', async ({ page }) => {
    //Arrange
    product = new NavbarPage(page);
    const name = faker.person.fullName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const subject = faker.word.words({ count: { min: 3, max: 5 } });
    const message = faker.word.words({ count: { min: 15, max: 25 } });

    //Act
    await product.fillContactUs(name, email, subject, message);

    page.on('dialog', (dialog) => {
      dialog.accept();
      console.log('Alert dialog submitted');
    });
    await product.bDialogSubmit.click();

    await product.confirmationContactUs();

    //Assert
    await homePage.expectPage();

    // Test Case 6: Contact Us Form
    // 1. Launch browser (//)
    // 2. Navigate to url 'await page.goto('https://automationexercise.com/');
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Contact Us' button
    // 5. Verify 'GET IN TOUCH' is visible
    // 6. Enter name, email, subject and message
    // 7. Upload file
    // 8. Click 'Submit' button
    // 9. Click OK button
    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    // 11. Click 'Home' button and verify that landed to home page successfully
  });

  test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);

    //Act
    await product.openTestCase();

    //Assert
    await homePage.expectTestCasePage();

    // Test Case 7: Verify Test Cases Page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Test Cases' button
    // 5. Verify user is navigated to test cases page successfully
  });

  test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    //Arrange
    product = new NavbarPage(page);
    //Act
    await product.selectFirstProduct();
    //Assert
    await product.expectFirstProductDetails();

    // Test Case 8: Verify All Products and product detail page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. The products list is visible
    // 7. Click on 'View Product' of first product
    // 8. User is landed to product detail page
    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
  });

  test('Test Case 9: Search Product', async ({ page }) => {
    //Arrange
    product = new NavbarPage(page);
    const search = productData.searchProduct;
    //Act
    await product.searchProduct(search);
    //Assert
    await expect(product.linkViewProduct.first()).toBeVisible();

    // Test Case 9: Search Product
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. Enter product name in search input and click search button
    // 7. Verify 'SEARCHED PRODUCTS' is visible
    // 8. Verify all the products related to search are visible
  });

  test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    //Arrange
    product = new NavbarPage(page);
    const email = faker.internet.email({ provider: 'fakerjs.dev' });

    //Act
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await product.sendSubscribe(email);

    //Assert
    await expect(product.successSubs).toContainText(homeData.confirmationSubscribe);

    // Test Case 10: Verify Subscription in home page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down to footer
    // 5. Verify text 'SUBSCRIPTION'
    // 6. Enter email address in input and click arrow button
    // 7. Verify success message 'You have been successfully subscribed!' is visible
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    //Act
    await homePage.cart.click();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await product.sendSubscribe(email);

    //Assert
    await expect(product.successSubs).toContainText(homeData.confirmationSubscribe);

    // Test Case 11: Verify Subscription in Cart page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Cart' button
    // 5. Scroll down to footer
    // 6. Verify text 'SUBSCRIPTION'
    // 7. Enter email address in input and click arrow button
    // 8. Verify success message 'You have been successfully subscribed!' is visible
  });

  test('Test Case 21: Add review on product', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const review = faker.lorem.text();

    //Act
    await product.addProductReview(username, email, review);

    //Assert
    await product.expectSuccessReviewMessage();

    // Test Case 21: Add review on product
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Click on 'View Product' button
    // 6. Verify 'Write Your Review' is visible
    // 7. Enter name, email and review
    // 8. Click 'Submit' button
    // 9. Verify success message 'Thank you for your review.'
  });
});
