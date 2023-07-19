// import { test, expect, chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { HomePage } from '../../components/home.component';
import { faker } from '@faker-js/faker';
import { NavbarPage } from '../../pages/navbar.page';
import { userData } from '../../test-data/user.data';
import { productData } from '../../test-data/product.data';
import { homeData } from '../../test-data/home.data';

test.describe('Navigation on Navbar page', () => {
  let homePage: HomePage;
  // let signLogin: SignLogin;
  let navbar: NavbarPage;

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
    navbar = new NavbarPage(page);
    const name = faker.person.fullName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const subject = faker.word.words({ count: { min: 3, max: 5 } });
    const message = faker.word.words({ count: { min: 15, max: 25 } });

    //Act
    await navbar.fillContactUs(name, email, subject, message);

    page.on('dialog', (dialog) => {
      dialog.accept();
      console.log('Alert dialog submitted');
    });
    await navbar.bDialogSubmit.click();

    await navbar.confirmationContactUs();

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

  test('Test Case: 7: Verify Test Cases Page', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    navbar = new NavbarPage(page);

    //Act
    await navbar.openTestCase();

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
    navbar = new NavbarPage(page);
    //Act
    await navbar.selectFirstProduct();
    //Assert
    await navbar.expectFirstProductDetails();

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
    navbar = new NavbarPage(page);
    const product = productData.searchProduct;
    //Act
    await navbar.searchProduct(product);
    //Assert
    await expect(navbar.linkViewProductFirst).toBeVisible();

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
    navbar = new NavbarPage(page);
    const email = faker.internet.email({ provider: 'fakerjs.dev' });

    //Act
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await navbar.sendSubscribe(email);

    //Assert
    await expect(navbar.successSubs).toContainText(homeData.confirmationSubscribe);

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
    navbar = new NavbarPage(page);
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    //Act
    await homePage.cart.click();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await navbar.sendSubscribe(email);

    //Assert
    await expect(navbar.successSubs).toContainText(homeData.confirmationSubscribe);

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

  test('Test Case 12: Add Products in Cart', async ({ page }) => {
    //Arrange
    navbar = new NavbarPage(page);
    //Act
    await navbar.addProducts();
    //Assert
    const rowCount = await navbar.tableRow.count();
    await expect(rowCount).toBe(2);
    await navbar.expectAddProducts();

    // Test Case 12: Add Products in Cart
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Products' button
    // 5. Hover over first product and click 'Add to cart'
    // 6. Click 'Continue Shopping' button
    // 7. Hover over second product and click 'Add to cart'
    // 8. Click 'View Cart' button
    // 9. Verify both products are added to Cart
    // 10. Verify their prices, quantity and total price
  });
});
