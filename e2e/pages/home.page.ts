import { type Locator, type Page, expect } from '@playwright/test';
import { homeData } from '../assets/data/e2e/home.data';
import { BasePage } from './base.page';
import { LeftSidebarComponent } from '../components/left-sidebar.component';
import { CategoryProductsPage } from './category-products.page';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { categoryProductsData } from '../assets/data/e2e/category-products.data';

export class HomePage extends BasePage {
  readonly brandPolo: Locator;
  readonly brandMastHarbour: Locator;

  readonly hBrandMastHarbour: Locator;
  readonly hBrandPolo: Locator;

  readonly headerRecommendedItems: Locator;

  readonly bAddToCartFromRecommendedItems: Locator;
  readonly viewCart: Locator;

  readonly leftSidebar: LeftSidebarComponent;
  readonly categoryProducts: CategoryProductsPage;

  constructor(page: Page) {
    super(page);
    //* POM for open page and expect page
    this.brandPolo = page.locator('[href*="/brand_products/Polo"]', { hasText: 'Polo' });
    this.brandMastHarbour = page.locator('[href*="/brand_products/Mast & Harbour"]', { hasText: 'Mast & Harbour' });

    this.hBrandMastHarbour = page.getByRole('heading', { name: categoryProductsData.hBrandMastHarbour });
    this.hBrandPolo = page.getByRole('heading', { name: categoryProductsData.hBrandPolo });

    //* POM for Recommended items - page bottom ()
    //Test Case 22: Add to cart from Recommended items
    this.headerRecommendedItems = page.getByRole('heading', { name: homeData.hRecommendedItems });
    // bAddToCartFromRecommendedItems = page
    //   .locator('#recommended-item-carousel')
    //   .locator('.item active > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.bAddToCartFromRecommendedItems = page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.viewCart = page.getByRole('link', { name: 'View Cart' });

    this.leftSidebar = new LeftSidebarComponent(page);
    this.categoryProducts = new CategoryProductsPage(page);
  }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(urlTitleData.home);
  }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/view_cart');
    await expect(this.page).toHaveTitle(urlTitleData.cart);
  }

  async expectBrandPolo(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Polo');
    await expect(this.page).toHaveTitle(urlTitleData.brandPolo);
    await expect(this.hBrandPolo).toBeVisible();
  }

  async expectBrandMastHarbourPage(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Mast & Harbour');
    await expect(this.page).toHaveTitle(urlTitleData.brandMastHarbour);
    await expect(this.hBrandMastHarbour).toBeVisible();
  }

  async openBrandMastHarbour(): Promise<void> {
    await this.brandMastHarbour.click();
    await this.expectBrandMastHarbourPage();
  }

  async openBrandPolo(): Promise<void> {
    await this.brandPolo.click();
    await this.expectBrandPolo();
  }
  async addFromRecommendedItems(): Promise<void> {
    await expect(this.headerRecommendedItems).toBeVisible();
    await this.bAddToCartFromRecommendedItems.first().click();
    await this.viewCart.click();
  }

  async scrollUpConfirmByScreen() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/hSubscription.png' });
    await this.page.locator('#scrollUp').click();
    await this.page.waitForTimeout(1000);
    await this.page.screenshot({ path: './test-download/e2e/home/hAutomationExercise.png' });
  }

  async noScrollUpConfirmByScreen() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/noScrollUpHSubscription.png' });
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.screenshot({ path: './test-download/e2e/home/noScrollUpHAutomationExercise.png' });
  }
}
