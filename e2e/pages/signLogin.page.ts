import { expect, type Page } from '@playwright/test';
import { HomePage } from '../components/home.component';
import { homeData } from '../assets/data/e2e/home.data';

export class SignLogin {
  constructor(private page: Page) {}
  homePage = new HomePage(this.page);
  //   signLogin = this.page.getByRole('link', { name: 'Signup / Login' });

  //* POM for New User Registration/ Login (#signUp) (#registerUser) (#loginUser)
  hSignup = this.page.getByRole('heading', { name: 'New User Signup!' });
  fillSignupName = this.page.getByTestId('signup-name');
  fillSignupEmail = this.page.getByTestId('signup-email');
  bSignup = this.page.getByRole('button', { name: 'Signup' });
  hLogin = this.page.getByRole('heading', { name: 'Login to your account' });
  fillLoginEmail = this.page.getByTestId('login-email');
  fillLoginPassword = this.page.getByTestId('login-password');
  bLogin = this.page.getByTestId('login-button');

  inputSignupName = this.page.locator('#name');
  inputSignupEmail = this.page.locator('#email');
  selectGender = this.page.locator('#id_gender2');
  fillPassword = this.page.locator('#password');
  selectDays = this.page.locator('#days');
  selectMonths = this.page.locator('#months');
  selectYears = this.page.locator('#years');
  selectNewsletter = this.page.locator('#newsletter');
  selectOption = this.page.locator('#optin');
  fillFirstName = this.page.locator('#first_name');
  fillLastName = this.page.locator('#last_name');
  fillCompany = this.page.locator('#company');
  fillAddress1 = this.page.locator('#address1');
  fillAddress2 = this.page.locator('#address2');
  fillCountry = this.page.locator('#country');
  fillState = this.page.locator('#state');
  fillCity = this.page.locator('#city');
  fillZipCode = this.page.locator('#zipcode');
  fillMobileNumber = this.page.locator('#mobile_number');

  bCreateAccount = this.page.getByTestId('create-account');
  hAccountCreated = this.page.getByText('Account Created!');
  bContinue = this.page.getByTestId('continue-button');

  //* POM for Delete User (#deleteUser)
  hAccountDeleted = this.page.getByText('Account Deleted!');

  //* POM for expect status
  loggedUser = this.page.getByText(homeData.loggedUser);
  hIncorrectEmail = this.page.getByText(homeData.incorrectEmail);
  hEmailExist = this.page.getByText(homeData.emailExist);

  async signUp(username: string, email: string): Promise<void> {
    await this.homePage.signLogin.click();
    await expect(this.hSignup).toBeVisible();
    await this.fillSignupName.fill(username);
    await this.fillSignupEmail.fill(email);
    await this.bSignup.click();
  }

  async registerUser(
    username: string,
    email: string,
    password: string,
    days: string,
    months: string,
    years: string,
    firstName: string,
    lastName: string,
    country: string,
    company: string,
    address1: string,
    address2: string,
    state: string,
    city: string,
    zipCode: string,
    phoneNumber: string,
  ): Promise<void> {
    // await this.homePage.signLogin.click();
    await expect(this.hSignup).toBeVisible();
    await this.fillSignupName.fill(username);
    await this.fillSignupEmail.fill(email);
    await this.bSignup.click();
    await expect(this.inputSignupName).toHaveValue(username);
    await expect(this.inputSignupEmail).toHaveValue(email);
    await this.selectGender.click();
    await this.fillPassword.fill(password);
    await this.selectDays.selectOption(days);
    await this.selectMonths.selectOption(months);
    await this.selectYears.selectOption(years);
    await this.selectNewsletter.click();
    await this.selectOption.click();
    await this.fillFirstName.fill(firstName);
    await this.fillLastName.fill(lastName);
    await this.fillCompany.fill(company);
    await this.fillAddress1.fill(address1);
    await this.fillAddress2.fill(address2);
    await this.fillCountry.selectOption(country);
    await this.fillState.fill(state);
    await this.fillCity.fill(city);
    await this.fillZipCode.fill(zipCode);
    await this.fillMobileNumber.fill(phoneNumber);
    await this.bCreateAccount.click();
    await expect(this.hAccountCreated).toBeVisible();
    await this.bContinue.click();
    // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async loginUser(email: string, password: string): Promise<void> {
    await this.homePage.signLogin.click();
    await expect(this.hLogin).toBeVisible();
    await this.fillLoginEmail.fill(email);
    await this.fillLoginPassword.fill(password);
    await this.bLogin.click();
  }
  // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();

  async deleteUser(): Promise<void> {
    await this.homePage.deleteAccount.click();
    await expect(this.hAccountDeleted).toBeVisible();
    await this.bContinue.click();
    await this.homePage.expectPage();
  }
}
