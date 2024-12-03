import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { UserLoginModel, UserSignupModel } from '../models/login.model';
import { HomePage } from '../components/home.component';
import { SignupPage } from './signup.page';
import { homeData } from '../assets/data/e2e/home.data';

export class LoginPage extends BasePage {
  readonly headerLogin: Locator;
  readonly fieldLoginEmail: Locator;
  readonly fieldLoginPassword: Locator;
  readonly paragraphLoginIncorrectData: Locator;
  readonly buttonLogin: Locator;

  readonly headerSignup: Locator;
  readonly fieldSignupName: Locator;
  readonly fieldSignupEmail: Locator;
  readonly paragraphSignupIncorrectData: Locator;
  readonly buttonSignup: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLogin = page.getByRole('heading', { name: 'Login to your account' });
    this.fieldLoginEmail = page.getByTestId('login-email');
    this.fieldLoginPassword = page.getByTestId('login-password');
    this.paragraphLoginIncorrectData = page.locator('.login-form', { hasText: homeData.incorrectData });
    this.buttonLogin = page.getByTestId('login-button');

    this.headerSignup = page.getByRole('heading', { name: 'New User Signup!' });
    this.fieldSignupName = page.getByTestId('signup-name');
    this.fieldSignupEmail = page.getByTestId('signup-email');
    this.paragraphSignupIncorrectData = page.locator('.signup-form', { hasText: homeData.emailExist });
    this.buttonSignup = page.getByTestId('signup-button');
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/login');
    await expect(this.page).toHaveTitle(homeData.titleLogin);
  }

  async loginToAccount(user: UserLoginModel): Promise<HomePage> {
    await this.fieldLoginEmail.fill(user.email);
    await this.fieldLoginPassword.fill(user.password);
    await this.buttonLogin.click();
    return new HomePage(this.page);
  }

  async fillUserSignup(user: UserSignupModel): Promise<SignupPage> {
    await this.fieldSignupName.fill(user.name);
    await this.fieldSignupEmail.fill(user.email);
    await this.buttonSignup.click();
    return new SignupPage(this.page);
  }
}
