import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getHeaderName(header: string): Locator {
    return this.page.getByRole('heading', { name: header });
  }

  async expectCategoryProductsPage(url: string, title: string): Promise<void> {
    await expect(this.page).toHaveURL(url);
    await expect(this.page).toHaveTitle(title);
  }
}
