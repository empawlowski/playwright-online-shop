import { type Locator, type Page } from '@playwright/test';
import { HomePage } from './home.page';
import { homeData } from '../assets/data/e2e/home.data';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';

export class SignupLoginPage extends BasePage {
  readonly homePage: HomePage;
  readonly headerComponent: HeaderComponent;

  // readonly hSignup: Locator;
  // readonly fillSignupName: Locator;
  // readonly fillSignupEmail: Locator;
  // readonly bSignup: Locator;
  readonly hLogin: Locator;
  readonly fieldLoginEmail: Locator;
  readonly fieldLoginPassword: Locator;
  readonly buttonLogin: Locator;

  readonly inputSignupName: Locator;
  readonly inputSignupEmail: Locator;
  readonly selectGender: Locator;
  readonly fillPassword: Locator;
  readonly selectDays: Locator;
  readonly selectMonths: Locator;
  readonly selectYears: Locator;
  readonly selectNewsletter: Locator;
  readonly selectOption: Locator;
  readonly fillFirstName: Locator;
  readonly fillLastName: Locator;
  readonly fillCompany: Locator;
  readonly fillAddress1: Locator;
  readonly fillAddress2: Locator;
  readonly fillCountry: Locator;
  readonly fillState: Locator;
  readonly fillCity: Locator;
  readonly fillZipCode: Locator;
  readonly fillMobileNumber: Locator;

  readonly bCreateAccount: Locator;
  readonly hAccountCreated: Locator;
  readonly bContinue: Locator;

  readonly hAccountDeleted: Locator;

  readonly loggedUser: Locator;
  readonly hIncorrectEmail: Locator;
  // readonly hEmailExist: Locator;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(this.page);
    this.headerComponent = new HeaderComponent(this.page);
    //   signLogin = this.page.getByRole('link', { name: 'Signup / Login' });

    //* POM for New User Registration/ Login (#signUp) (#registerUser) (#loginUser)
    // this.hSignup = this.page.getByRole('heading', { name: 'New User Signup!' });
    // this.fillSignupName = this.page.getByTestId('signup-name');
    // this.fillSignupEmail = this.page.getByTestId('signup-email');
    // this.bSignup = this.page.getByRole('button', { name: 'Signup' });
    this.hLogin = this.page.getByRole('heading', { name: 'Login to your account' });
    this.fieldLoginEmail = this.page.getByTestId('login-email');
    this.fieldLoginPassword = this.page.getByTestId('login-password');
    this.buttonLogin = this.page.getByTestId('login-button');

    this.inputSignupName = this.page.locator('#name');
    this.inputSignupEmail = this.page.locator('#email');
    this.selectGender = this.page.locator('#id_gender2');
    this.fillPassword = this.page.locator('#password');
    this.selectDays = this.page.locator('#days');
    this.selectMonths = this.page.locator('#months');
    this.selectYears = this.page.locator('#years');
    this.selectNewsletter = this.page.locator('#newsletter');
    this.selectOption = this.page.locator('#optin');
    this.fillFirstName = this.page.locator('#first_name');
    this.fillLastName = this.page.locator('#last_name');
    this.fillCompany = this.page.locator('#company');
    this.fillAddress1 = this.page.locator('#address1');
    this.fillAddress2 = this.page.locator('#address2');
    this.fillCountry = this.page.locator('#country');
    this.fillState = this.page.locator('#state');
    this.fillCity = this.page.locator('#city');
    this.fillZipCode = this.page.locator('#zipcode');
    this.fillMobileNumber = this.page.locator('#mobile_number');

    this.bCreateAccount = this.page.getByTestId('create-account');
    this.hAccountCreated = this.page.getByText('Account Created!');
    this.bContinue = this.page.getByTestId('continue-button');

    //* POM for Delete User (#deleteUser)
    this.hAccountDeleted = this.page.getByText('Account Deleted!');

    //* POM for expect status
    this.loggedUser = this.page.getByText(homeData.loggedUser);
    this.hIncorrectEmail = this.page.getByText(homeData.incorrectData);
    // this.hEmailExist = this.page.getByText(homeData.emailExist);
  }

  // async signUp(username: string, email: string): Promise<void> {
  //   await this.headerComponent.signLogin.click();
  //   await expect(this.hSignup).toBeVisible();
  //   await this.fillSignupName.fill(username);
  //   await this.fillSignupEmail.fill(email);
  //   await this.bSignup.click();
  // }

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
    // await expect(this.hSignup).toBeVisible();
    //!
    //? past for registerUser()
    // const userBaseData: UserSignupModel = createSignupUser();
    // await header.openSignupLoginPage();
    // await expect(login.headerSignup).toBeVisible();
    // await login.fillUserSignup(userBaseData);
    // await signup.expectAccountInformation(userBaseData);
    // await signup.expectAccountInformation(userBaseData);
    // await signup.fillBasicInformation(userBasicInfoData);
    // await signup.fillAddressInformation(userAddressInfoData);
    // await signup.clickCreateAccount();
    // await expect.soft(signup.create.headerAccountCreated).toContainText('Account Created!');
    // await signup.create.clickContinue();
    // await header.expectLoggedUser(userBaseData.name);
    //!
    // await this.fillSignupName.fill(username);
    // await this.fillSignupEmail.fill(email);
    // await this.bSignup.click();
    // await expect(this.inputSignupName).toHaveValue(username);
    // await expect(this.inputSignupEmail).toHaveValue(email);
    // await this.selectGender.click();
    // await this.fillPassword.fill(password);
    // await this.selectDays.selectOption(days);
    // await this.selectMonths.selectOption(months);
    // await this.selectYears.selectOption(years);
    // await this.selectNewsletter.click();
    // await this.selectOption.click();
    // await this.fillFirstName.fill(firstName);
    // await this.fillLastName.fill(lastName);
    // await this.fillCompany.fill(company);
    // await this.fillAddress1.fill(address1);
    // await this.fillAddress2.fill(address2);
    // await this.fillCountry.selectOption(country);
    // await this.fillState.fill(state);
    // await this.fillCity.fill(city);
    // await this.fillZipCode.fill(zipCode);
    // await this.fillMobileNumber.fill(phoneNumber);
    // await this.bCreateAccount.click();
    // await expect(this.hAccountCreated).toBeVisible();
    // await this.bContinue.click();
    // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  // async loginToAccount(email: string, password: string): Promise<void> {
  //   // await this.headerComponent.signLogin.click();
  //   await expect(this.hLogin).toBeVisible();
  //   await this.fieldLoginEmail.fill(email);
  //   await this.fieldLoginPassword.fill(password);
  //   await this.buttonLogin.click();
  // }
  // await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();

  async deleteUser(): Promise<void> {
    await this.headerComponent.deleteAccount.click();
    //? return page?
    // await expect(this.hAccountDeleted).toBeVisible();
    // await this.bContinue.click();
    // await this.homePage.expectPage();
  }
}
