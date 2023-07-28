// import { test, expect, chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { HomePage } from '../../components/home.component';
import { faker } from '@faker-js/faker';
import { NavbarPage } from '../../pages/navbar.page';
import { userData } from '../../test-data/user.data';
import { productData } from '../../test-data/product.data';
import { homeData } from '../../test-data/home.data';
import { SignLogin } from '../../pages/signLogin.page';
import { cartData } from '../../test-data/cart.data';
import { CartPage } from '../../pages/cart.page';

test.describe('Navigation for Navbar pages', () => {
  let homePage: HomePage;
  let signLogin: SignLogin;
  let navbar: NavbarPage;
  let cart: CartPage;

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

  test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
    //Arrange
    navbar = new NavbarPage(page);
    const quantity = productData.productQuantity;
    //Act
    await navbar.addProductQuantity(quantity);
    //Assert
    await navbar.expectAddProductQuantity();

    // Test Case 13: Verify Product quantity in Cart
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'View Product' for any product on home page
    // 5. Verify product detail is opened
    // 6. Increase quantity to 4
    // 7. Click 'Add to cart' button
    // 8. Click 'View Cart' button
    // 9. Verify that product is displayed in cart page with exact quantity
  });

  test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    navbar = new NavbarPage(page);
    signLogin = new SignLogin(page);
    cart = new CartPage(page);

    const quantity = productData.productQuantity;

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number('###-###-###');

    const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
    ${yourDeliveryAddress}
    Mrs. ${firstName} ${lastName}
    ${company}
    ${address1}
    ${address2}
    ${city} ${state}
    ${zipCode}
    ${country}
    ${phoneNumber}`;

    const deliveryInvoice = `
    ${yourDeliveryInvoice}
    Mrs. ${firstName} ${lastName}
    ${company}
    ${address1}
    ${address2}
    ${city} ${state} 
    ${zipCode} 
    ${country} 
    ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    //Act
    await navbar.addProductQuantity(quantity);
    await cart.checkoutFromCartPage();

    await signLogin.registerUser(
      username,
      email,
      password,
      days,
      months,
      years,
      firstName,
      lastName,
      country,
      company,
      address1,
      address2,
      state,
      city,
      zipCode,
      phoneNumber,
    );
    await expect(loggedUser).toBeVisible();

    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);

    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    await signLogin.deleteUser();

    // Test Case 14: Place Order: Register while Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click Proceed To Checkout
    // 8. Click 'Register / Login' button
    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 11. Verify ' Logged in as username' at top
    // 12.Click 'Cart' button
    // 13. Click 'Proceed To Checkout' button
    // 14. Verify Address Details and Review Your Order
    // 15. Enter description in comment text area and click 'Place Order'
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    // 19. Click 'Delete Account' button
    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    navbar = new NavbarPage(page);
    signLogin = new SignLogin(page);
    cart = new CartPage(page);

    const quantity = productData.productQuantity;

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = userData.days;
    const months = userData.months;
    const years = userData.years;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress({ useFullAddress: true });
    const address2 = faker.location.secondaryAddress();
    const country = userData.country;
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number('###-###-###');

    const loggedUser = page.getByText(`${homeData.loggedInAs} ${username}`);

    const yourDeliveryAddress = cartData.yourDeliveryAddress;
    const yourDeliveryInvoice = cartData.yourDeliveryInvoice;

    const deliveryAddress = `
    ${yourDeliveryAddress}
    Mrs. ${firstName} ${lastName}
    ${company}
    ${address1}
    ${address2}
    ${city} ${state}
    ${zipCode}
    ${country}
    ${phoneNumber}`;

    const deliveryInvoice = `
    ${yourDeliveryInvoice}
    Mrs. ${firstName} ${lastName}
    ${company}
    ${address1}
    ${address2}
    ${city} ${state} 
    ${zipCode} 
    ${country} 
    ${phoneNumber}`;

    const description = faker.lorem.text();
    const cardNumber = faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }); // '4480-0500-0000-0000;
    const cvc = faker.finance.creditCardCVV();
    const expiryMonth = cartData.expiryMonth;
    const expiryYear = cartData.expiryYear;

    //Act
    await homePage.signLogin.click();
    await signLogin.registerUser(
      username,
      email,
      password,
      days,
      months,
      years,
      firstName,
      lastName,
      country,
      company,
      address1,
      address2,
      state,
      city,
      zipCode,
      phoneNumber,
    );

    await expect(loggedUser).toBeVisible();

    await navbar.addProductQuantity(quantity);
    await homePage.expectCartPage();
    await cart.bProceedToCheckout.click();
    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    await signLogin.deleteUser();

    // Test Case 15: Place Order: Register before Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button
    // 5. Fill all details in Signup and create account
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // 7. Verify ' Logged in as username' at top
    // 8. Add products to cart
    // 9. Click 'Cart' button
    // 10. Verify that cart page is displayed
    // 11. Click Proceed To Checkout
    // 12. Verify Address Details and Review Your Order
    // 13. Enter description in comment text area and click 'Place Order'
    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 15. Click 'Pay and Confirm Order' button
    // 16. Verify success message 'Your order has been placed successfully!'
    // 17. Click 'Delete Account' button
    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });
});
