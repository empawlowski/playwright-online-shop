import { Page, expect } from '@playwright/test';
import { homeData } from '../test-data/home.data';

export class HomePage {
  constructor(private page: Page) {}

  //* POM for Navbar menu
  //   home;
  products = this.page.getByRole('link', { name: 'Products' });
  cart = this.page.getByRole('link', { name: 'Cart' });
  signLogin = this.page.getByRole('link', { name: 'Signup / Login' });
  deleteAccount = this.page.getByRole('link', { name: 'Delete Account' });
  testCases = this.page.getByRole('link', { name: ' Test Cases' });
  //   apiTesting;
  //   videoTUtorials;
  contactUs = this.page.getByRole('link', { name: 'Contact us' });
  logout = this.page.getByRole('link', { name: 'Logout' });

  //* POM for open page and expect page (#openPage) (#expectPage) (#expectLoginPage) (#expectProductsPage) (#expectTestCasePage)
  hTestCase = this.page.getByRole('heading', { name: 'Test Cases', exact: true });
  hAllProducts = this.page.getByRole('heading', { name: 'All Products', exact: true });

  async openPage(): Promise<void> {
    await this.page.goto('/');
  }

  async expectPage(): Promise<void> {
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(homeData.titleHome);
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/login');
    await expect(this.page).toHaveTitle(homeData.titleLogin);
  }

  async expectProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/products');
    await expect(this.page).toHaveTitle(homeData.titleProducts);
    await expect(this.hAllProducts).toBeVisible();
  }

  async expectTestCasePage(): Promise<void> {
    await expect(this.page).toHaveURL('/test_cases');
    await expect(this.page).toHaveTitle(homeData.titleTestCase);
    await expect(this.hTestCase).toBeVisible();
  }
}
