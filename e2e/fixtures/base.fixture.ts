import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../components/home.component';
import { SignLogin } from '../pages/signLogin.page';
import { ProductPage } from '../pages/product.page';

interface Pages {
  cart: CartPage;
  home: HomePage;
  user: SignLogin;
  // login: LoginPage;
  product: ProductPage;
}

export const test = base.extend<Pages>({
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  user: async ({ page }, use) => {
    await use(new SignLogin(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});
