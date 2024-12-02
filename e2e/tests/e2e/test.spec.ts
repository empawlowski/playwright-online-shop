import { faker } from '@faker-js/faker';
import { userData } from '../../assets/data/e2e/user.data';
import { homeData } from '../../assets/data/e2e/home.data';
import { productData } from '../../assets/data/e2e/product.data';
import { cartData } from '../../assets/data/e2e/cart.data';
import { test } from '../../fixtures/base.fixture';
import { expect } from '@playwright/test';
import { contactUsData } from '../../assets/data/e2e/contact-us.data';

test.describe('User actions', () => {
  test.beforeEach(async ({ page, home }, testInfo) => {
    //Arrange
    console.log(`Running ${testInfo.title}`);

    //Act
    // await chromium.launch(); //* Commented because using all browsers for tests

    //* Advertisements blocker
    await page.route('**/*', (route) => {
      if (route.request().url().startsWith('https://googleads.')) {
        route.abort();
      } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
        route.abort();
      } else if (route.request().url().startsWith('https://pagead2.googlesyndication.com')) {
        route.abort();
      } else {
        route.continue();
      }
    });

    //* Another method
    // const locator = page.getByText('This site asks for consent to use your data');
    // await page.addLocatorHandler(
    //   locator,
    //   async (overlay) => {
    //     await overlay.getByRole('button', { name: 'Consent' }).click();
    //   },
    //   { times: 3, noWaitAfter: true },
    // );
    // // Run your tests that can be interrupted by the overlay.
    // // ...
    // await page.removeLocatorHandler(locator);

    await home.goTo();

    //Assert
    await home.expectPage();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus) console.log(`Did not run as expected, ended up at ${page.url()}`);

    await page.close();
  });

  test('Test Case 1: Register User', async ({ header, home, user }) => {
    //Arrange

    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const password = faker.internet.password();
    const days = faker.string.numeric(1);
    const months = faker.string.numeric(1);
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

    //Act
    // await home.signLogin.click(); // add Test Case 14
    await header.openSignupLoginPage();
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
    await user.deleteUser();

    //Assert
    await home.expectPage();

    // Test Case 1: Register User
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and email address
    // 7. Click 'Signup' button
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    // 15. Click 'Continue' button
    // 16. Verify that 'Logged in as username' is visible
    // 17. Click 'Delete Account' button
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    // 19. Verify that home page is visible successfully
  });

  test('Test Case 2: Login User with correct data', async ({ header, home, user }) => {
    //Arrange

    const username = userData.fakeUsername;
    const email = userData.fakeEmail;
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

    //Act
    // await home.signLogin.click();
    await header.openSignupLoginPage();
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
    await header.logout.click();
    await home.goTo();
    await home.expectPage();
    await user.loginUser(email, password);
    await expect(user.loggedUser).toBeVisible();
    await user.deleteUser();

    //Assert
    await home.expectPage();

    // Test Case 2: Login User with correct email and password
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter correct email address and password
    // 7. Click 'login' button
    // 8. Verify that 'Logged in as username' is visible
    // 9. Click 'Delete Account' button
    // 10. Verify that 'ACCOUNT DELETED!' is visible
    // 11. Verify that home page is visible successfully
  });

  test('Test Case 3: Login User with incorrect data', async ({ user }) => {
    //Arrange
    const email = userData.incorrectEmail;
    const password = userData.incorrectPassword;

    //Act
    await user.loginUser(email, password);

    //Assert
    await expect(user.hIncorrectEmail).toBeVisible();

    // Test Case 3: Login User with incorrect email and password
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter incorrect email address and password
    // 7. Click 'login' button
    // 8. Verify error 'Your email or password is incorrect!' is visible
  });

  test('Test Case 4: Logout User', async ({ header, page, user, home }) => {
    //Arrange

    const username = userData.logoutUser;
    const email = userData.logoutEmail;
    const password = userData.fakePassword;

    //Act
    await user.loginUser(email, password);
    await expect(page.getByText(`${homeData.loggedInAs} ${username}`)).toBeVisible();
    await header.logout.click();

    //Assert
    await home.expectLoginPage();

    // Test Case 4: Logout User
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'Login to your account' is visible
    // 6. Enter correct email address and password
    // 7. Click 'login' button
    // 8. Verify that 'Logged in as username' is visible
    // 9. Click 'Logout' button
    // 10. Verify that user is navigated to login page
  });

  test('Test Case 5: Register User with existing email', async ({ user }) => {
    //Arrange

    const username = userData.logoutUser;
    const email = userData.logoutEmail;

    //Act
    await user.signUp(username, email);

    //Assert
    await expect(user.hEmailExist).toBeVisible();

    // Test Case 5: Register User with existing email
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and already registered email address
    // 7. Click 'Signup' button
    // 8. Verify error 'Email Address already exist!' is visible
  });

  test('Test Case 6: Contact Us Form', async ({ header, contactUs, home }) => {
    //Arrange
    const name = faker.person.fullName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const subject = faker.word.words({ count: { min: 3, max: 5 } });
    const message = faker.word.words({ count: { min: 15, max: 25 } });

    //Act
    await header.openContactUsPage();
    await expect.soft(contactUs.header).toBeVisible();
    await contactUs.fillContactUs(name, email, subject, message);

    await contactUs.catchDialog();
    await contactUs.buttonAcceptDialog.click();

    await expect.soft(contactUs.alertMessage).toContainText(contactUsData.alertSuccess);
    await contactUs.buttonBackHome.click();

    //Assert
    await home.expectPage();

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

  test('Test Case 7: Verify Test Cases Page', async ({ slider, home }) => {
    //Act
    await slider.openTestCasesFromSlider();

    //Assert
    await home.expectTestCasePage();

    // Test Case 7: Verify Test Cases Page
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Test Cases' button
    // 5. Verify user is navigated to test cases page successfully
  });

  test('Test Case 8: Verify All Products and product detail page', async ({ header, product }) => {
    //Arrange
    //Act
    await header.openProductsPage();
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

  test('Test Case 9: Search Product', async ({ product }) => {
    //Arrange
    const search: string = productData.searchProduct;
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

  test('Test Case 10: Verify Subscription in home page', async ({ page, product }) => {
    //Arrange
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

  test('Test Case 11: Verify Subscription in Cart page', async ({ header, page, home, product }) => {
    //Arrange

    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    //Act
    await header.openCartPage();

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

  test('Test Case 12: Add Products in Cart', async ({ product }) => {
    //Arrange
    //Act
    await product.addProducts();
    //Assert
    const rowCount = await product.tableRow.count();
    expect(rowCount).toBe(2);
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

  test('Test Case 13: Verify Product quantity in Cart @smoke', async ({ product }) => {
    //Arrange
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

  test('Test Case 14: Place Order: Register while Checkout', async ({ page, header, product, cart, user }) => {
    //Arrange

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

    await header.openCartPage();

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

  test('Test Case 15: Place Order: Register before Checkout', async ({ page, header, home, user, product, cart }) => {
    //Arrange

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
    await header.openSignupLoginPage();
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
    await home.expectCartPage();
    await cart.bProceedToCheckout.click();
    await header.openCartPage();
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

  test('Test Case 16: Place Order: Login before Checkout', async ({ page, header, home, user, product, cart }) => {
    //Arrange
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
    await header.openSignupLoginPage();
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
    await header.logout.click();
    await user.loginUser(email, password);
    await expect(loggedUser).toBeVisible();

    await product.addProductQuantity(quantity);
    await home.expectCartPage();
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

  test('Test Case 17: Remove Products From Cart', async ({ product, home, cart }) => {
    //Arrange
    const quantity = productData.productQuantity;

    //Act
    await product.addProductQuantity(quantity);
    await home.expectCartPage();
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

  test('Test Case 18: View Category Products', async ({ home }) => {
    //Arrange

    //Act
    await home.expectLeftSidebar();

    await home.openWomenCategory();
    await home.expectWomenDressProductsPage();

    await home.openMenCategory();
    //Assert
    await home.expectMenJeansProductsPage();

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

  test('Test Case 19: View & Cart Brand Products @smoke', async ({ header, home }) => {
    //Arrange

    //Act
    await header.openProductsPage();
    await home.expectLeftSidebar();
    await home.openBrandMastHarbour();

    //Assert
    await home.openBrandPolo();

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

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ header, page, product, home, user }) => {
    //Arrange
    test.slow();
    // test.setTimeout(120000);

    const search = productData.searchProduct;
    const expectProductNumber = Number(14);

    const email = userData.logoutEmail; //'fake@email.cc',
    const password = userData.fakePassword; //'fake!Password00',

    //Act
    await product.searchProduct(search);
    const searchResults = await page.locator('div.single-products').count();
    await expect(searchResults).toBe(expectProductNumber);
    console.log('Results on page: ', searchResults);

    //* Catching by $$ selector
    const addToCarts = await page.$$('div.productinfo.text-center > a.btn.btn-default.add-to-cart');

    for (const addToCart of addToCarts) {
      await addToCart.click();
      await product.bContinueShopping.click();
    }
    //* -----------------------------

    //* Catching by text and method .all()
    // for (const addToCart of await page.locator('.productinfo.text-center').getByText('Add to cart').all()) {
    //   await addToCart.click();
    //   await product.bContinueShopping.click();
    // }
    //* -----------------------------

    //* Catching by text and method .count()
    // const addToCart = page.locator('.productinfo.text-center').getByText('Add to cart');
    //
    // for (let i = 0; i < (await addToCart.count()); i++) {
    //   await addToCart.nth(i).click();
    //   await product.bContinueShopping.click();
    // }
    //* -----------------------------

    await header.openCartPage();

    const cartProductNumber = await page.locator('#cart_info_table').locator('tbody > tr').count();
    Number(cartProductNumber) == Number(searchResults);
    console.log('Are the values is correct: ', cartProductNumber === searchResults);

    await user.loginUser(email, password);

    await header.openCartPage();
    const cartProductNumberAfterLogin = await page.locator('#cart_info_table').locator('tbody > tr').count();
    //Assert
    Number(cartProductNumberAfterLogin) == Number(searchResults);
    console.log('Are the values is correct: ', cartProductNumberAfterLogin === searchResults);

    // Test Case 20: Search Products and Verify Cart After Login
    // 1. Launch browser (//)
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

  test('Test Case 21: Add review on product', async ({ product }) => {
    //Arrange
    const username = faker.internet.userName();
    const email = faker.internet.email({ provider: 'fakerjs.dev' });
    const review = faker.lorem.text();

    //Act
    await product.addProductReview(username, email, review);

    //Assert
    await product.expectSuccessReviewMessage();

    // Test Case 21: Add review on product
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Click on 'Products' button
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    // 5. Click on 'View Product' button
    // 6. Verify 'Write Your Review' is visible
    // 7. Enter name, email and review
    // 8. Click 'Submit' button
    // 9. Verify success message 'Thank you for your review.'
  });

  test('Test Case 22: Add to cart from Recommended items', async ({ page, home, product }) => {
    //Arrange

    //Act
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await home.addFromRecommendedItems();

    //Assert
    //product on page
    await expect(product.tableRow).toBeVisible();

    // Test Case 22: Add to cart from Recommended items
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Scroll to bottom of page
    // 4. Verify 'RECOMMENDED ITEMS' are visible
    // 5. Click on 'Add To Cart' on Recommended product
    // 6. Click on 'View Cart' button
    // 7. Verify that product is displayed in cart page
  });

  test('Test Case 23: Verify address details in checkout page', async ({ header, page, home, user, product, cart }) => {
    //Arrange
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

    // Act
    await header.openSignupLoginPage();
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

    await product.bAddToCart.first().click();
    await product.bContinueShopping.click();

    await cart.proceedToCheckoutWithAddressVerification(deliveryAddress, deliveryInvoice);

    //Assert
    await user.deleteUser();

    // Test Case 23: Verify address details in checkout page
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
    // 12. Verify that the delivery address is same address filled at the time registration of account
    // 13. Verify that the billing address is same address filled at the time registration of account
    // 14. Click 'Delete Account' button
    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 24: Download Invoice after purchase order', async ({ page, product, cart, user }) => {
    //Arrange
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

    // Act
    await product.addProductGoCartPage();
    await cart.bProceedToCheckout.click();
    await cart.bRegisterLogin.click();

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

    await cart.checkoutWithoutExpectProductQuantity(deliveryAddress, deliveryInvoice, description);
    await cart.fillCartInformation(firstName, lastName, cardNumber, cvc, expiryMonth, expiryYear);
    //* Download method
    const downloadPromise = page.waitForEvent('download');
    await cart.bDownloadInvoice.click();
    const download = await downloadPromise;
    if (download) {
      console.log('File downloaded successfully.');
      await download.saveAs('./test-download/e2e/cart/Invoice.txt');
    } else {
      console.log('File download failed.');
    }
    //*--------------

    await cart.bContinue.click();

    //Assert
    await user.deleteUser();

    // Test Case 24: Download Invoice after purchase order
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
    // 12. Click 'Cart' button
    // 13. Click 'Proceed To Checkout' button
    // 14. Verify Address Details and Review Your Order
    // 15. Enter description in comment text area and click 'Place Order'
    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // 17. Click 'Pay and Confirm Order' button
    // 18. Verify success message 'Your order has been placed successfully!'
    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    // 20. Click 'Continue' button
    // 21. Click 'Delete Account' button
    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  });

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality @smoke', async ({ home }) => {
    //Assert
    //Act
    await home.scrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: hSubscription.png
    // second assertion: hAutomationExercise.png

    // Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
    // 1. Launch browser (//)
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Scroll down page to bottom
    // 5. Verify 'SUBSCRIPTION' is visible
    // 6. Click on arrow at bottom right side to move upward
    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  });

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality @smoke', async ({ home }) => {
    //Assert
    //Act
    await home.noScrollUpConfirmByScreen();

    //Assert
    //* Check files in ./test-download/e2e/home/
    // first assertion: noScrollUpHSubscription.png
    // second assertion: noScrollUpHAutomationExercise.png

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
