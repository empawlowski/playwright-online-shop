// import { test, expect, chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { HomePage } from '../../components/home.component';
import { NavbarPage } from '../../pages/navbar.page';
import { userData } from '../../test-data/user.data';
import { productData } from '../../test-data/product.data';
import { homeData } from '../../test-data/home.data';
import { SignLogin } from '../../pages/signLogin.page';
import { cartData } from '../../test-data/cart.data';
import { CartPage } from '../../pages/cart.page';
import { faker } from '@faker-js/faker';

test.describe('Function for Cart pages', () => {
  let homePage: HomePage;
  let user: SignLogin;
  let product: NavbarPage;
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

  test('Test Case 12: Add Products in Cart', async ({ page }) => {
    //Arrange
    product = new NavbarPage(page);
    //Act
    await product.addProducts();
    //Assert
    const rowCount = await product.tableRow.count();
    await expect(rowCount).toBe(2);
    await product.expectAddProducts();

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
    product = new NavbarPage(page);
    const quantity = productData.productQuantity;
    //Act
    await product.addProductQuantity(quantity);
    //Assert
    await product.expectAddProductQuantity();

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
    product = new NavbarPage(page);
    user = new SignLogin(page);
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
    await product.addProductQuantity(quantity);
    await cart.checkoutFromCartPage();

    await user.registerUser(
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
    await user.deleteUser();

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
    product = new NavbarPage(page);
    user = new SignLogin(page);
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
    await user.registerUser(
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

    await product.addProductQuantity(quantity);
    await homePage.expectCartPage();
    await cart.bProceedToCheckout.click();
    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    await user.deleteUser();

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

  test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);
    user = new SignLogin(page);
    cart = new CartPage(page);

    const quantity = productData.productQuantity;

    const username = userData.fakeExistUsername;
    const email = userData.fakeExistEmail;
    const password = userData.fakePassword;
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
    await user.registerUser(
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
    await homePage.logout.click();
    await user.loginUser(email, password);
    await expect(loggedUser).toBeVisible();

    await product.addProductQuantity(quantity);
    await homePage.expectCartPage();
    await cart.bProceedToCheckout.click();
    await cart.proceedToCheckout(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);

    //Assert
    await user.deleteUser();

    // Test Case 16: Place Order: Login before Checkout
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click 'Signup / Login' button (used method to create new account before login)
    // 5. Fill email, password and click 'Login' button
    // 6. Verify 'Logged in as username' at top
    // 7. Add products to cart
    // 8. Click 'Cart' button
    // 9. Verify that cart page is displayed
    // 10. Click Proceed To Checkout
    // 11. Verify Address Details and Review Your Order
    // 12. Enter description in comment text area and click 'Place Order'
    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 14. Click 'Pay and Confirm Order' button
    // 15. Verify success message 'Your order has been placed successfully!'
    // 16. Click 'Delete Account' button
    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);
    cart = new CartPage(page);

    const quantity = productData.productQuantity;

    //Act
    await product.addProductQuantity(quantity);
    await homePage.expectCartPage();
    await cart.bDeleteQuantity.click();

    //Assert
    await expect(cart.divCartEmpty).toBeVisible();

    // Test Case 17: Remove Products From Cart
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click 'X' button corresponding to particular product
    // 8. Verify that product is removed from the cart
  });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    product = new NavbarPage(page);
    cart = new CartPage(page);

    //Act
    // await product.addProductQuantity(quantity);
    // await homePage.expectCartPage();
    // await cart.bDeleteQuantity.click();

    //Assert
    // await expect(cart.divCartEmpty).toBeVisible();

    // Test Case 20: Search Products and Verify Cart After Login
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Enter product name in search input and click search button
    // 6. Verify 'SEARCHED PRODUCTS' is visible
    // 7. Verify all the products related to search are visible
    // 8. Add those products to cart
    // 9. Click 'Cart' button and verify that products are visible in cart
    // 10. Click 'Signup / Login' button and submit login details
    // 11. Again, go to Cart page
    // 12. Verify that those products are visible in cart after login as well
  });
});
