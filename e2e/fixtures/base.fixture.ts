import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signLogin.page';
import { ProductsPage } from '../pages/product.page';
import { HeaderComponent } from '../components/header.component';
import { ContactUsPage } from '../pages/contact-us.page';
import { TestCasesPage } from '../pages/test-cases.page';
import { SliderComponent } from '../components/slider.component';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';

interface Pages {
  cart: CartPage;
  contactUs: ContactUsPage;
  home: HomePage;
  user: SignupLoginPage;
  login: LoginPage;
  signup: SignupPage;
  products: ProductsPage;
  testCases: TestCasesPage;

  header: HeaderComponent;
  slider: SliderComponent;
}

export const test = base.extend<Pages>({
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactUs: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  user: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },

  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signup: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  products: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  testCases: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },

  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  slider: async ({ page }, use) => {
    await use(new SliderComponent(page));
  },
});
