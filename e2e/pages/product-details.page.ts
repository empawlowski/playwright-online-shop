import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { productDetailsData } from '../assets/data/e2e/product-details.data';
import { ProductDetailsModel, ProductReviewModel } from '../models/product-details.model';

export class ProductDetailsPage extends BasePage {
  readonly productDetailsLocator: Locator;
  readonly headerProductName: Locator;

  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

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
    await expect(this.page).toHaveURL(urlTitleData.urlProductDetails);
    await expect(this.page).toHaveTitle(urlTitleData.productDetails);
  }

  async expectProductDetails(detail: ProductDetailsModel): Promise<void> {
    await expect.soft(this.headerProductName).toHaveText(detail.name);
    await expect.soft(this.getProductDetail(productDetailsData.category)).toContainText(detail.category);
    await expect.soft(this.productDetailsLocator.filter({ hasText: productDetailsData.price })).toContainText(detail.price);
    await expect.soft(this.getProductDetail(productDetailsData.availability)).toContainText(detail.availability);
    await expect.soft(this.getProductDetail(productDetailsData.condition)).toContainText(detail.condition);
    await expect.soft(this.getProductDetail(productDetailsData.brand)).toContainText(detail.brand);
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
