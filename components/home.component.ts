import { Page, expect } from '@playwright/test';
import { homeData } from '../test-data/home.data';

export class HomePage {
  constructor(private page: Page) {}

  //* POM for Navbar menu
  home = this.page.locator('[href*="/"]', { hasText: 'Home' });
  // products = this.page.getByRole('link', { name: ' Products' });
  products = this.page.locator('[href*="/products"]', { hasText: 'Products' });
  cart = this.page.getByRole('link', { name: 'Cart' });
  signLogin = this.page.getByRole('link', { name: 'Signup / Login' });
  deleteAccount = this.page.getByRole('link', { name: 'Delete Account' });
  testCases = this.page.getByRole('link', { name: ' Test Cases' });
  apiTesting = this.page.getByRole('link', { name: 'API Testing' });
  videoTutorials = this.page.getByRole('link', { name: 'Video Tutorials' });
  contactUs = this.page.getByRole('link', { name: 'Contact us' });
  logout = this.page.getByRole('link', { name: 'Logout' });

  //* POM for open page and expect page (#openPage) (#expectPage) (#expectLoginPage) (#expectProductsPage) (#expectTestCasePage)
  hTestCase = this.page.getByRole('heading', { name: 'Test Cases', exact: true });
  hAllProducts = this.page.getByRole('heading', { name: 'All Products', exact: true });

  //* POM for left Menu/ Sidebar - Test Case: 18, 19
  // (#expectLeftSidebar) (#expectWomenDressProductsPage) (#expectMenJeansProductsPage) (#openWomenCategory) (#openMenCategory)
  sidebar = this.page.locator('#accordian');
  sidebarCategory = this.page.locator('.left-sidebar').getByRole('heading', { name: homeData.leftSidebarCategory });
  sidebarBrands = this.page.locator('.left-sidebar').getByRole('heading', { name: homeData.leftSidebarBrands });

  categoryWomen = this.page.locator('[href*="#Women"]', { hasText: 'Women' });
  womenCategoryDress = this.page.locator('[href*="/category_products/1"]', { hasText: 'Dress' });

  categoryMen = this.page.locator('[href*="#Men"]', { hasText: 'Men' });
  menCategoryJeans = this.page.locator('[href*="/category_products/6"]', { hasText: 'Jeans' });

  brandPolo = this.page.locator('[href*="/brand_products/Polo"]', { hasText: 'Polo' });
  brandMastHarbour = this.page.locator('[href*="/brand_products/Mast & Harbour"]', { hasText: 'Mast & Harbour' });

  hWomenDressProducts = this.page.getByRole('heading', { name: homeData.hWomenDressProducts });
  hMenJeansProducts = this.page.getByRole('heading', { name: homeData.hMenDressProducts });
  hBrandMastHarbour = this.page.getByRole('heading', { name: homeData.hBrandMastHarbour });
  hBrandPolo = this.page.getByRole('heading', { name: homeData.hBrandPolo });

  //* POM for Recommended items - page bottom ()
  //Test Case 22: Add to cart from Recommended items
  hRecommendedItems = this.page.getByRole('heading', { name: homeData.hRecommendedItems });
  // bAddToCartFromRecommendedItems = this.page
  //   .locator('#recommended-item-carousel')
  //   .locator('.item active > .product-image-wrapper > .single-products > .productinfo > .btn');
  bAddToCartFromRecommendedItems = this.page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn');
  viewCart = this.page.getByRole('link', { name: 'View Cart' });

  async openPage(): Promise<void> {
    await this.page.goto('/');
  }

  async expectPage(): Promise<void> {
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(homeData.titleHome);
  }

  async expectLeftSidebar() {
    await expect(this.sidebar).toBeVisible();
    await expect(this.sidebarCategory).toBeVisible();
    await expect(this.sidebarBrands).toBeVisible();
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/login');
    await expect(this.page).toHaveTitle(homeData.titleLogin);
  }

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
