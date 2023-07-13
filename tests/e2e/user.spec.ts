import { test, expect, chromium, firefox } from '@playwright/test';

test('Register User', async ({ page }) => {
  const username = 'fakeName';
  const email = 'fake@email.pw';
  const password = 'fake!Password00';
  const firstName = 'Name';
  const lastName = 'LastName';
  const company = 'fakeCompany';
  const address = 'fakeAddress';
  const address2 = 'fakeAddress2';
  const country = 'Australia';
  const state = 'fakeState';
  const city = 'fakeCity';
  const zip = 'fakeZip';
  const phone = 'fakePhone';

  await chromium.launch();
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  // await expect(page.locator('div').filter({ hasText: 'New User Signup! Signup' }).nth(2)).toBeVisible(); //Verify that full div is visible
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible(); //Verify that only header is visible
  await page.getByTestId('signup-name').fill(username);
  await page.getByTestId('signup-email').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.locator('#name')).toHaveValue(username);
  await expect(page.locator('#email')).toHaveValue(email);
  // await page.locator('#id_gender2').isChecked();
  await page.locator('#id_gender2').click();
  await page.locator('#password').fill(password);
  await page.locator('#days').selectOption('23');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1988');
  // await page.locator('#newsletter').isChecked();
  await page.locator('#newsletter').click();
  // await page.locator('#optin').isChecked();
  await page.locator('#optin').click();
  await page.locator('#first_name').fill(firstName);
  await page.locator('#last_name').fill(lastName);
  await page.locator('#company').fill(company);
  await page.locator('#address1').fill(address);
  await page.locator('#address2').fill(address2);
  await page.locator('#country').selectOption(country);
  await page.locator('#state').fill(state);
  await page.locator('#city').fill(city);
  await page.locator('#zipcode').fill(zip);
  await page.locator('#mobile_number').fill(phone);

  await page.getByTestId('create-account').click();
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible;
  await page.getByTestId('continue-button').click();
  await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible;
  await page.getByTestId('continue-button').click();

  // Test Case 1: Register User
  // 1. Launch browser
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
});
test('Login User with correct data', async ({ page }) => {
  const username = 'fakeName';
  const email = 'fake@email.pw';
  const password = 'fake!Password00';
  const firstName = 'Name';
  const lastName = 'LastName';
  const company = 'fakeCompany';
  const address = 'fakeAddress';
  const address2 = 'fakeAddress2';
  const country = 'Australia';
  const state = 'fakeState';
  const city = 'fakeCity';
  const zip = 'fakeZip';
  const phone = 'fakePhone';

  await chromium.launch();
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  // await expect(page.locator('div').filter({ hasText: 'New User Signup! Signup' }).nth(2)).toBeVisible(); //Verify that full div is visible
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible(); //Verify that only header is visible
  await page.getByTestId('signup-name').fill(username);
  await page.getByTestId('signup-email').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.locator('#name')).toHaveValue(username);
  await expect(page.locator('#email')).toHaveValue(email);
  // await page.locator('#id_gender2').isChecked();
  await page.locator('#id_gender2').click();
  await page.locator('#password').fill(password);
  await page.locator('#days').selectOption('23');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1988');
  // await page.locator('#newsletter').isChecked();
  await page.locator('#newsletter').click();
  // await page.locator('#optin').isChecked();
  await page.locator('#optin').click();
  await page.locator('#first_name').fill(firstName);
  await page.locator('#last_name').fill(lastName);
  await page.locator('#company').fill(company);
  await page.locator('#address1').fill(address);
  await page.locator('#address2').fill(address2);
  await page.locator('#country').selectOption(country);
  await page.locator('#state').fill(state);
  await page.locator('#city').fill(city);
  await page.locator('#zipcode').fill(zip);
  await page.locator('#mobile_number').fill(phone);

  await page.getByTestId('create-account').click();
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible;
  await page.getByTestId('continue-button').click();
  await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-button').click();
  await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible;

  // Test Case 2: Login User with correct email and password
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Signup / Login' button
  // 5. Verify 'Login to your account' is visible
  // 6. Enter correct email address and password
  // 7. Click 'login' button
  // 8. Verify that 'Logged in as username' is visible
  // 9. Click 'Delete Account' button
  // 10. Verify that 'ACCOUNT DELETED!' is visible
});

test('Login User with incorrect data', async ({ page }) => {
  const email = 'fake@email.pw';
  const password = 'fake!Password00';

  await chromium.launch();

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-button').click();

  // await page.getByRole('paragraph', { name: 'Your email or password is incorrect!' });
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

  // Test Case 3: Login User with incorrect email and password
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Signup / Login' button
  // 5. Verify 'Login to your account' is visible
  // 6. Enter incorrect email address and password
  // 7. Click 'login' button
  // 8. Verify error 'Your email or password is incorrect!' is visible
});

test('Logout User', async ({ page }) => {
  const username = 'fakeUserName';
  const email = 'fake@email.cc';
  const password = 'fake!Password00';
  // const firstName = 'Name';
  // const lastName = 'LastName';
  // const company = 'fakeCompany';
  // const address = 'fakeAddress';
  // const address2 = 'fakeAddress2';
  // const country = 'Australia';
  // const state = 'fakeState';
  // const city = 'fakeCity';
  // const zip = 'fakeZip';
  // const phone = 'fakePhone';

  await chromium.launch();
  //!Uncomment when user is deleted
  // await page.goto('/');
  // await page.getByRole('link', { name: 'Signup / Login' }).click();
  // // await expect(page.locator('div').filter({ hasText: 'New User Signup! Signup' }).nth(2)).toBeVisible(); //Verify that full div is visible
  // await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible(); //Verify that only header is visible
  // await page.getByTestId('signup-name').fill(username);
  // await page.getByTestId('signup-email').fill(email);
  // await page.getByRole('button', { name: 'Signup' }).click();
  // await expect(page.locator('#name')).toHaveValue(username);
  // await expect(page.locator('#email')).toHaveValue(email);
  // // await page.locator('#id_gender2').isChecked();
  // await page.locator('#id_gender2').click();
  // await page.locator('#password').fill(password);
  // await page.locator('#days').selectOption('23');
  // await page.locator('#months').selectOption('5');
  // await page.locator('#years').selectOption('1988');
  // // await page.locator('#newsletter').isChecked();
  // await page.locator('#newsletter').click();
  // // await page.locator('#optin').isChecked();
  // await page.locator('#optin').click();
  // await page.locator('#first_name').fill(firstName);
  // await page.locator('#last_name').fill(lastName);
  // await page.locator('#company').fill(company);
  // await page.locator('#address1').fill(address);
  // await page.locator('#address2').fill(address2);
  // await page.locator('#country').selectOption(country);
  // await page.locator('#state').fill(state);
  // await page.locator('#city').fill(city);
  // await page.locator('#zipcode').fill(zip);
  // await page.locator('#mobile_number').fill(phone);

  // await page.getByTestId('create-account').click();
  // await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible;
  // await page.getByTestId('continue-button').click();
  // await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
  // await page.getByRole('link', { name: 'Logout' }).click();

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-button').click();
  await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page).toHaveURL('/login');
  await expect(page).toHaveTitle('Automation Exercise - Signup / Login');

  //delete account
  // login + delete

  // Test Case 4: Logout User
  // 1. Launch browser
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

test('Register User with existing email', async ({ page }) => {
  const username = 'fakeUserName';
  const email = 'fake@email.cc';
  const password = 'fake!Password00';
  // const firstName = 'Name';
  // const lastName = 'LastName';
  // const company = 'fakeCompany';
  // const address = 'fakeAddress';
  // const address2 = 'fakeAddress2';
  // const country = 'Australia';
  // const state = 'fakeState';
  // const city = 'fakeCity';
  // const zip = 'fakeZip';
  // const phone = 'fakePhone';

  await chromium.launch();
  //!Uncomment when user is deleted
  // await page.goto('/');
  // await page.getByRole('link', { name: 'Signup / Login' }).click();
  // // await expect(page.locator('div').filter({ hasText: 'New User Signup! Signup' }).nth(2)).toBeVisible(); //Verify that full div is visible
  // await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible(); //Verify that only header is visible
  // await page.getByTestId('signup-name').fill(username);
  // await page.getByTestId('signup-email').fill(email);
  // await page.getByRole('button', { name: 'Signup' }).click();
  // await expect(page.locator('#name')).toHaveValue(username);
  // await expect(page.locator('#email')).toHaveValue(email);
  // // await page.locator('#id_gender2').isChecked();
  // await page.locator('#id_gender2').click();
  // await page.locator('#password').fill(password);
  // await page.locator('#days').selectOption('23');
  // await page.locator('#months').selectOption('5');
  // await page.locator('#years').selectOption('1988');
  // // await page.locator('#newsletter').isChecked();
  // await page.locator('#newsletter').click();
  // // await page.locator('#optin').isChecked();
  // await page.locator('#optin').click();
  // await page.locator('#first_name').fill(firstName);
  // await page.locator('#last_name').fill(lastName);
  // await page.locator('#company').fill(company);
  // await page.locator('#address1').fill(address);
  // await page.locator('#address2').fill(address2);
  // await page.locator('#country').selectOption(country);
  // await page.locator('#state').fill(state);
  // await page.locator('#city').fill(city);
  // await page.locator('#zipcode').fill(zip);
  // await page.locator('#mobile_number').fill(phone);

  // await page.getByTestId('create-account').click();
  // await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible;
  // await page.getByTestId('continue-button').click();
  // await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
  // await page.getByRole('link', { name: 'Logout' }).click();

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible(); //Verify that only header is visible
  await page.getByTestId('signup-name').fill(username);
  await page.getByTestId('signup-email').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.getByText('Email Address already exist!')).toBeVisible();

  // Test Case 5: Register User with existing email
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Signup / Login' button
  // 5. Verify 'New User Signup!' is visible
  // 6. Enter name and already registered email address
  // 7. Click 'Signup' button
  // 8. Verify error 'Email Address already exist!' is visible
});
