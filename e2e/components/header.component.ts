import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { ProductPage } from '../pages/product.page';
import { ContactUsPage } from '../pages/contact-us.page';
import { CartPage } from '../pages/cart.page';
import { SignupLoginPage } from '../pages/signLogin.page';
import { TestCasesPage } from '../pages/test-cases.page';
import { HomePage } from './home.component';

export class HeaderComponent extends BasePage {
  readonly home: Locator;
  readonly products: Locator;
  readonly cart: Locator;
  readonly signLogin: Locator;
  readonly deleteAccount: Locator;
  readonly testCases: Locator;
  readonly apiTesting: Locator;
  readonly videoTutorials: Locator;
  readonly contactUs: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.home = page.getByRole('link', { name: 'Home' });
    this.products = page.getByRole('link', { name: 'Products' });
    this.cart = page.getByRole('link', { name: 'Cart' });
    this.signLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
    this.testCases = page.getByRole('link', { name: 'Test Cases', exact: true });
    this.apiTesting = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorials = page.getByRole('link', { name: 'Video Tutorials' });
    this.contactUs = page.getByRole('link', { name: 'Contact us' });
    this.logout = page.getByRole('link', { name: 'Logout' });
  }

  async openHomePage(): Promise<HomePage> {
    await this.home.click();
    return new HomePage(this.page);
  }

  async openProductsPage(): Promise<ProductPage> {
    await this.home.click();
    return new ProductPage(this.page);
  }

  async openCartPage(): Promise<CartPage> {
    await this.cart.click();
    return new CartPage(this.page);
  }

  async openSignupLoginPage(): Promise<SignupLoginPage> {
    await this.signLogin.click();
    return new SignupLoginPage(this.page);
  }

  async openTestCasesPage(): Promise<TestCasesPage> {
    await this.testCases.click();
    return new TestCasesPage(this.page);
  }

  async openContactUsPage(): Promise<ContactUsPage> {
    await this.contactUs.click();
    return new ContactUsPage(this.page);
  }
}
