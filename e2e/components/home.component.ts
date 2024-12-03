import { type Locator, type Page, expect } from '@playwright/test';
import { homeData } from '../assets/data/e2e/home.data';
import { BasePage } from '../pages/base.page';

export class HomePage extends BasePage {
  readonly hTestCase: Locator;
  readonly hAllProducts: Locator;

  readonly sidebar: Locator;
  readonly sidebarCategory: Locator;
  readonly sidebarBrands: Locator;

  readonly categoryWomen: Locator;
  readonly womenCategoryDress: Locator;

  readonly categoryMen: Locator;
  readonly menCategoryJeans: Locator;
  readonly brandPolo: Locator;
  readonly brandMastHarbour: Locator;

  readonly hWomenDressProducts: Locator;
  readonly hMenJeansProducts: Locator;
  readonly hBrandMastHarbour: Locator;
  readonly hBrandPolo: Locator;

  readonly hRecommendedItems: Locator;

  readonly bAddToCartFromRecommendedItems: Locator;
  readonly viewCart: Locator;

  constructor(page: Page) {
    super(page);
    //* POM for open page and expect page (#openPage) (#expectPage) (#expectLoginPage) (#expectProductsPage) (#expectTestCasePage)
    this.hTestCase = page.getByRole('heading', { name: 'Test Cases', exact: true });
    this.hAllProducts = page.getByRole('heading', { name: 'All Products', exact: true });

    //* POM for left Menu/ Sidebar - Test Case: 18, 19
    // (#expectLeftSidebar) (#expectWomenDressProductsPage) (#expectMenJeansProductsPage) (#openWomenCategory) (#openMenCategory)
    this.sidebar = page.locator('#accordian');
    this.sidebarCategory = page.locator('.left-sidebar').getByRole('heading', { name: homeData.leftSidebarCategory });
    this.sidebarBrands = page.locator('.left-sidebar').getByRole('heading', { name: homeData.leftSidebarBrands });

    this.categoryWomen = page.locator('[href*="#Women"]', { hasText: 'Women' });
    this.womenCategoryDress = page.locator('[href*="/category_products/1"]', { hasText: 'Dress' });

    this.categoryMen = page.locator('[href*="#Men"]', { hasText: 'Men' });
    this.menCategoryJeans = page.locator('[href*="/category_products/6"]', { hasText: 'Jeans' });
    this.brandPolo = page.locator('[href*="/brand_products/Polo"]', { hasText: 'Polo' });
    this.brandMastHarbour = page.locator('[href*="/brand_products/Mast & Harbour"]', { hasText: 'Mast & Harbour' });

    this.hWomenDressProducts = page.getByRole('heading', { name: homeData.hWomenDressProducts });
    this.hMenJeansProducts = page.getByRole('heading', { name: homeData.hMenDressProducts });
    this.hBrandMastHarbour = page.getByRole('heading', { name: homeData.hBrandMastHarbour });
    this.hBrandPolo = page.getByRole('heading', { name: homeData.hBrandPolo });

    //* POM for Recommended items - page bottom ()
    //Test Case 22: Add to cart from Recommended items
    this.hRecommendedItems = page.getByRole('heading', { name: homeData.hRecommendedItems });
    // bAddToCartFromRecommendedItems = page
    //   .locator('#recommended-item-carousel')
    //   .locator('.item active > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.bAddToCartFromRecommendedItems = page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.viewCart = page.getByRole('link', { name: 'View Cart' });
  }

  // async openPage(): Promise<void> {
  //   await this.page.goto('/');
  // }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(homeData.titleHome);
  }

  async expectLeftSidebar() {
    await expect(this.sidebar).toBeVisible();
    await expect(this.sidebarCategory).toBeVisible();
    await expect(this.sidebarBrands).toBeVisible();
  }

  // async expectLoginPage(): Promise<void> {
  //   await expect(this.page).toHaveURL('/login');
  //   await expect(this.page).toHaveTitle(homeData.titleLogin);
  // }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/view_cart');
    await expect(this.page).toHaveTitle(homeData.titleCart);
  }

  async expectProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/products');
    await expect(this.page).toHaveTitle(homeData.titleProducts);
    await expect(this.hAllProducts).toBeVisible();
  }

  async expectFirstProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/product_details/1');
    await expect(this.page).toHaveTitle(homeData.titleProductDetails);
  }

  async expectWomenDressProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/category_products/1');
    await expect(this.page).toHaveTitle(homeData.titleProductWomenDress);
    await expect(this.hWomenDressProducts).toBeVisible();
  }

  async expectMenJeansProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL('/category_products/6');
    await expect(this.page).toHaveTitle(homeData.titleProductMenJeans);
    await expect(this.hMenJeansProducts).toBeVisible();
  }

  async expectBrandPolo(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Polo');
    await expect(this.page).toHaveTitle(homeData.titleBrandPolo);
    await expect(this.hBrandPolo).toBeVisible();
  }

  async expectBrandMastHarbourPage(): Promise<void> {
    await expect(this.page).toHaveURL('/brand_products/Mast & Harbour');
    await expect(this.page).toHaveTitle(homeData.titleBrandMastHarbour);
    await expect(this.hBrandMastHarbour).toBeVisible();
  }

  async expectTestCasePage(): Promise<void> {
    await expect(this.page).toHaveURL('/test_cases');
    await expect(this.page).toHaveTitle(homeData.titleTestCase);
    await expect(this.hTestCase).toBeVisible();
  }

  async openWomenCategory(): Promise<void> {
    await this.categoryWomen.click();
    await this.womenCategoryDress.click();
  }

  async openMenCategory(): Promise<void> {
    await this.categoryMen.click();
    await this.menCategoryJeans.click();
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
    await expect(this.hRecommendedItems).toBeVisible();
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
