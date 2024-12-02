import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../components/home.component';
import { SignupLoginPage } from '../pages/signLogin.page';
import { ProductPage } from '../pages/product.page';
import { HeaderComponent } from '../components/header.component';
import { ContactUsPage } from '../pages/contact-us.page';
import { TestCasesPage } from '../pages/test-cases.page';
import { SliderComponent } from '../components/slider.component';

interface Pages {
  cart: CartPage;
  contactUs: ContactUsPage;
  home: HomePage;
  user: SignupLoginPage;
  // login: LoginPage;
  product: ProductPage;
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
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
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
