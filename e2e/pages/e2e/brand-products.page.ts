import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import * as data from '../../assets/data/e2e/app.data.json';

export class BrandProducts extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getHeader(header: string): Locator {
    return this.page.getByRole('heading', { name: `Brand - ${header}`, exact: true });
  }

  async expectBrandProductsPage(brand: string, header: string): Promise<void> {
    await expect(this.page).toHaveURL(`/brand_products/${brand}`);
    await expect(this.page).toHaveTitle(`${data.title.home} - ${header}`);
    await expect(this.getHeader(header)).toBeVisible();
  }
}
