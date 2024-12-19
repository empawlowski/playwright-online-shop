import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './e2e/base.page';
import { ProductDetailsModel, ProductReviewModel } from '../models/product-details.model';
import { CartPage } from './cart.page';
import * as data from '../assets/data/e2e/app.data.json';

export class ProductDetailsPage extends BasePage {
  readonly productDetailsLocator: Locator;
  readonly headerProductName: Locator;

  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  readonly fieldQuantity: Locator;
  readonly buttonAddToCart: Locator;
  readonly linkViewCart: Locator;

  readonly linkWriteReview: Locator;
  readonly fieldName: Locator;
  readonly fieldEmail: Locator;
  readonly fieldReview: Locator;
  readonly buttonSubmit: Locator;
  readonly alert: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsLocator = page.locator('.product-information');
    this.headerProductName = this.productDetailsLocator.getByRole('heading');

    this.fieldQuantity = page.locator('#quantity');
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' });
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });

    this.linkWriteReview = page.getByRole('link', { name: 'Write Your Review' });
    this.fieldName = page.locator('#name');
    this.fieldEmail = page.locator('#email');
    this.fieldReview = page.locator('#review');
    this.buttonSubmit = page.locator('#button-review');
    this.alert = page.locator('#review-section');
  }

  getProductDetail(detail: string): Locator {
    return this.productDetailsLocator.locator('p', { hasText: detail });
  }

  async expectProductDetailsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/product_details/);
    await expect(this.page).toHaveTitle(data.title.productDetails);
  }

  async expectProductDetails(detail: ProductDetailsModel): Promise<void> {
    await expect.soft(this.headerProductName).toHaveText(detail.name);
    await expect.soft(this.getProductDetail(data.products.details.category)).toContainText(detail.category);
    await expect.soft(this.productDetailsLocator.filter({ hasText: data.products.details.price })).toContainText(detail.price);
    await expect.soft(this.getProductDetail(data.products.details.availability)).toContainText(detail.availability);
    await expect.soft(this.getProductDetail(data.products.details.condition)).toContainText(detail.condition);
    await expect.soft(this.getProductDetail(data.products.details.brand)).toContainText(detail.brand);
  }

  async addProductQuantity(quantity: string): Promise<void> {
    await this.fieldQuantity.fill(quantity);
  }

  async clickAddToCart(): Promise<void> {
    await this.buttonAddToCart.click();
  }

  async clickViewCart(): Promise<CartPage> {
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }

  async addProductReview(reviewData: ProductReviewModel): Promise<void> {
    await this.fieldName.fill(reviewData.name);
    await this.fieldEmail.fill(reviewData.email);
    await this.fieldReview.fill(reviewData.review);
    await this.buttonSubmit.click();
  }

  async expectSuccessReviewMessage(): Promise<void> {
    await expect(this.alert).toContainText('Thank you for your review.');
  }
}
