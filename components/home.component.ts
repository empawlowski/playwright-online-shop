import { Page, expect } from '@playwright/test';
import { homeData } from '../test-data/home.data';

export class HomePage {
  constructor(private page: Page) {}

  //* Methods for open page and expect page (#openPage) (#expectPage) (#expectLoginPage)

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

  //* POM for Navbar menu
  //   home;
  products = this.page.getByRole('link', { name: 'Products' });
  cart = this.page.getByRole('link', { name: 'Cart' });
  signLogin = this.page.getByRole('link', { name: 'Signup / Login' });
  deleteAccount = this.page.getByRole('link', { name: 'Delete Account' });
  //   testCases;
  //   apiTesting;
  //   videoTUtorials;
  //   contactUs;
  logout = this.page.getByRole('link', { name: 'Logout' });
}
