// import { test, expect, chromium } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { HomePage } from '../../components/home.component';
import { SignLogin } from '../../pages/signLogin.page';
import { userData } from '../../test-data/user.data';
import { faker } from '@faker-js/faker';
import { homeData } from '../../test-data/home.data';

test.describe('User actions', () => {
  let homePage: HomePage;
  let user: SignLogin;

  test.beforeEach(async ({ page }, testInfo) => {
    //Arrange
    homePage = new HomePage(page);
    console.log(`Running ${testInfo.title}`);

    //Act
    // await chromium.launch(); //* Commented because using all browsers for tests

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
  test('Test Case 1: Register User', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    user = new SignLogin(page);

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
    await homePage.signLogin.click(); // add Test Case 14
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
    await homePage.expectPage();

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
  test('Test Case 2: Login User with correct data', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    user = new SignLogin(page);

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
    await homePage.signLogin.click(); // Test Case 14
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
    await homePage.logout.click();
    await homePage.openPage();
    await homePage.expectPage();
    await user.loginUser(email, password);
    await expect(user.loggedUser).toBeVisible();
    await user.deleteUser();

    //Assert
    await homePage.expectPage();

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

  test('Test Case 3: Login User with incorrect data', async ({ page }) => {
    //Arrange
    user = new SignLogin(page);
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

  test('Test Case 4: Logout User', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    user = new SignLogin(page);

    const username = userData.logoutUser;
    const email = userData.logoutEmail;
    const password = userData.fakePassword;

    //Act
    await user.loginUser(email, password);
    await expect(page.getByText(`${homeData.loggedInAs} ${username}`)).toBeVisible();
    await homePage.logout.click();

    //Assert
    await homePage.expectLoginPage();

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

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    //Arrange
    homePage = new HomePage(page);
    user = new SignLogin(page);

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
});
