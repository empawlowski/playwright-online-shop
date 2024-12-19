import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { LeftSidebarComponent } from '../../components/left-sidebar.component';
import { CategoryProductsPage } from '../category-products.page';
import { CartPage } from '../cart.page';
import { FooterComponent } from '../../components/footer.component';
import { ProductsPage } from '../product.page';
import * as data from '../../assets/data/e2e/app.data.json';

export class HomePage extends BasePage {
  readonly headerFullFledged: Locator;
  readonly linkViewCart: Locator;
  readonly headerRecommendedItems: Locator;
  readonly linkAddToCartFromRecommendedItems: Locator;

  readonly leftSidebar: LeftSidebarComponent;
  readonly products: ProductsPage;
  readonly categoryProducts: CategoryProductsPage;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.headerFullFledged = page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' });
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });
    this.headerRecommendedItems = page.getByRole('heading', { name: 'Recommended items' });
    this.linkAddToCartFromRecommendedItems = page.locator('#recommended-item-carousel').locator('.add-to-cart');

    this.leftSidebar = new LeftSidebarComponent(page);
    this.products = new ProductsPage(page);
    this.categoryProducts = new CategoryProductsPage(page);
    this.footer = new FooterComponent(page);
  }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(data.title.home);
  }

  async addFromRecommendedItemsAndViewCart(): Promise<CartPage> {
    await this.linkAddToCartFromRecommendedItems.last().click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }
}
