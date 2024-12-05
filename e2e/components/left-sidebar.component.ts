import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { leftSidebarData } from '../assets/data/e2e/left-sidebar.data';

export class LeftSidebarComponent extends BasePage {
  readonly sidebarLocator: Locator;
  readonly headerSidebarCategory: Locator;
  readonly headerSidebarBrands: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarLocator = page.locator('#accordian');
    this.headerSidebarCategory = page.locator('.left-sidebar').getByRole('heading', { name: leftSidebarData.category });
    this.headerSidebarBrands = page.locator('.left-sidebar').getByRole('heading', { name: leftSidebarData.brands });
  }

  getCategory(category: string): Locator {
    return this.page.getByRole('link', { name: ` ${category}` });
  }

  getCategoryProducts(products: string): Locator {
    return this.page.getByRole('link', { name: products });
  }

  async expectLeftSidebar() {
    await expect(this.sidebarLocator).toBeVisible();
    await expect(this.headerSidebarCategory).toBeVisible();
    await expect(this.headerSidebarBrands).toBeVisible();
  }

  async openCategoryByName(category: string): Promise<void> {
    await this.getCategory(category).click();
  }
  async openCategoryProductsByName(products: string): Promise<void> {
    await this.getCategoryProducts(products).click();
    //? open page category_products/1
  }
}
