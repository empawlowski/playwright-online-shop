import { type Locator, type Page, expect } from '@playwright/test';
import { HomePage } from './home.page';
import { productData } from '../assets/data/e2e/product.data';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { LeftSidebarComponent } from '../components/left-sidebar.component';

export class ProductsPage extends BasePage {
  readonly homePage: HomePage;
  readonly headerComponent: HeaderComponent;

  readonly hGetInTouch: Locator;

  readonly fillName: Locator;
  readonly fillEmail: Locator;
  readonly fillSubject: Locator;
  readonly fillMessage: Locator;
  readonly uploadFile: Locator;
  readonly bSubmit: Locator;

  readonly bDialogSubmit: Locator;

  readonly hSuccessSubmitted: Locator;
  readonly hSuccessSubmittedLocator: Locator;
  readonly bContactUsHome: Locator;

  readonly leftSidebar: LeftSidebarComponent;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(page);
    this.headerComponent = new HeaderComponent(page);

    this.hGetInTouch = page.getByRole('heading', { name: 'Get in Touch' }); //? used?

    this.bDialogSubmit = page.getByRole('button', { name: 'Submit' }); //? used?

    this.hSuccessSubmitted = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
    this.hSuccessSubmittedLocator = page.locator('.alert-success');
    this.bContactUsHome = page.locator('#form-section').getByRole('link', { name: ' Home' });

    this.leftSidebar = new LeftSidebarComponent(page);
  }

  //* POM for page Products (#selectFirstProduct) (#expectFirstProductDetails) (#searchProduct) (#sendSubscribe)
  linkViewProduct = this.page.getByRole('link', { name: 'View Product' });

  hBlueTop = this.page.getByRole('heading', { name: 'Blue Top' });
  category = this.page.getByText('Category:');
  price = this.page.getByText('Rs.');
  availability = this.page.getByText('Availability:');
  condition = this.page.getByText('Condition:');
  brand = this.page.getByText('Brand:');

  fillSearchProduct = this.page.locator('#search_product');
  bSearch = this.page.locator('#submit_search');
  hSearchedProducts = this.page.getByRole('heading', { name: 'Searched Products' });

  bAddToCart = this.page.locator('.productinfo.text-center').getByText('Add to cart');
  bProductViewAddToCart = this.page.getByRole('button', { name: 'Add to cart' });
  bContinueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });
  viewCart = this.page.getByRole('link', { name: 'View Cart' });

  tableRow = this.page.locator('#cart_info_table').locator('tbody').locator('tr');
  cartPriceP1 = this.page.locator('#product-1').locator('.cart_price');
  cartQuantityP1 = this.page.locator('#product-1').locator('.cart_quantity');
  cartTotalPriceP1 = this.page.locator('#product-1').locator('.cart_total_price');
  cartPriceP2 = this.page.locator('#product-2').locator('.cart_price');
  cartQuantityP2 = this.page.locator('#product-2').locator('.cart_quantity');
  cartTotalPriceP2 = this.page.locator('#product-2').locator('.cart_total_price');

  //Test Case 13: Verify Product quantity in Cart
  fillQuantity = this.page.locator('#quantity');
  tableProductName = this.page.locator('.cart_description').getByRole('link', { name: productData.firstProduct });
  tableCartQuantity = this.page.locator('.cart_quantity');

  //* POM for page Subscription (#sendSubscribe)
  hSubscription = this.page.getByRole('heading', { name: 'Subscription', exact: true });
  fillSubsEmail = this.page.locator('#susbscribe_email');
  bSubscribe = this.page.locator('#subscribe');
  successSubs = this.page.locator('#success-subscribe');

  //*POM for review (#addProductReview) (#expectSuccessReviewMessage)
  //Test Case 21: Add review on product
  hWriteYourReview = this.page.getByText(productData.productReview);
  fieldName = this.page.locator('#name');
  fieldEmail = this.page.locator('#email');
  fieldReview = this.page.locator('#review');
  bReview = this.page.locator('#button-review');
  divSuccessReview = this.page.locator('#review-section');
  hSuccessReview = this.page.getByText(productData.divSuccessReview);

  async selectFirstProduct(): Promise<void> {
    // await this.homePage.products.click();
    await this.homePage.expectProductsPage();
    await this.linkViewProduct.first().click();
  }

  async expectFirstProductDetails(): Promise<void> {
    await expect(this.page).toHaveURL('/product_details/1');
    await expect(this.hBlueTop).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }

  async searchProduct(search: string): Promise<void> {
    await this.headerComponent.products.click();
    await this.homePage.expectProductsPage();
    await this.fillSearchProduct.fill(search);
    await this.bSearch.click();
    await expect(this.hSearchedProducts).toBeVisible();
  }

  async addProductGoCartPage(): Promise<void> {
    await this.headerComponent.products.click();
    await this.bAddToCart.first().click();
    await this.bContinueShopping.click();
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
  }

  async addProducts(): Promise<void> {
    await this.headerComponent.products.click();
    await this.bAddToCart.first().click();
    await this.bContinueShopping.click();
    await this.bAddToCart.nth(1).click();
    await this.viewCart.click();
  }

  async expectAddProducts() {
    await expect(this.cartPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartQuantityP1).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartPriceP2).toHaveText(productData.cartPriceP2);
    await expect(this.cartQuantityP2).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP2).toHaveText(productData.cartPriceP2);
  }

  async addProductQuantity(quantity: string): Promise<void> {
    await this.linkViewProduct.first().click();
    await this.homePage.expectFirstProductsPage();
    await this.fillQuantity.fill(quantity);
    await this.bProductViewAddToCart.click();
    await this.viewCart.click();
  }

  async expectAddProductQuantity(): Promise<void> {
    await expect(this.tableProductName).toBeVisible();
    await expect(this.tableCartQuantity).toHaveText(productData.productQuantity);
  }

  async sendSubscribe(email: string): Promise<void> {
    await expect(this.hSubscription).toBeVisible();
    await this.fillSubsEmail.fill(email);
    await this.bSubscribe.click();
  }
  async addProductReview(username: string, email: string, review: string): Promise<void> {
    await this.headerComponent.products.click();
    await this.homePage.expectProductsPage();
    await this.linkViewProduct.first().click();
    await this.hWriteYourReview.isVisible();
    await this.fieldName.fill(username);
    await this.fieldEmail.fill(email);
    await this.fieldReview.fill(review);
    await this.bReview.click();
  }

  async expectSuccessReviewMessage(): Promise<void> {
    await this.divSuccessReview.isVisible();
    await expect(this.divSuccessReview).toContainText(productData.divSuccessReview);
    await this.hSuccessReview.isVisible();
  }
}
