import { type Locator, type Page, expect } from '@playwright/test';
import { HomePage } from './home.page';
import { productData } from '../assets/data/e2e/product.data';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { LeftSidebarComponent } from '../components/left-sidebar.component';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { ProductDetailsPage } from './product-details.page';

export class ProductsPage extends BasePage {
  readonly homePage: HomePage;
  readonly headerComponent: HeaderComponent;
  readonly details: ProductDetailsPage;

  readonly header: Locator;

  readonly linkViewProduct: Locator;
  readonly fieldSearchProduct: Locator;
  readonly buttonSearch: Locator;
  readonly headerSearchedProducts: Locator;
  readonly singleProduct: Locator;

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
    this.details = new ProductDetailsPage(page);

    this.header = page.getByRole('heading', { name: 'All Products', exact: true });

    this.linkViewProduct = this.page.getByRole('link', { name: 'View Product' });
    this.fieldSearchProduct = this.page.locator('#search_product');
    this.buttonSearch = this.page.locator('#submit_search');
    this.headerSearchedProducts = this.page.getByRole('heading', { name: 'Searched Products' });
    this.singleProduct = this.page.locator('.single-products');

    this.hGetInTouch = page.getByRole('heading', { name: 'Get in Touch' }); //? used?

    this.bDialogSubmit = page.getByRole('button', { name: 'Submit' }); //? used?

    this.hSuccessSubmitted = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
    this.hSuccessSubmittedLocator = page.locator('.alert-success');
    this.bContactUsHome = page.locator('#form-section').getByRole('link', { name: ' Home' });

    this.leftSidebar = new LeftSidebarComponent(page);
  }

  //* POM for page Products (#sendSubscribe)
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

  getFirstViewProduct(): Locator {
    return this.linkViewProduct.first();
  }

  async expectProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL(urlTitleData.urlProducts);
    await expect(this.page).toHaveTitle(urlTitleData.products);
    await expect(this.header).toBeVisible();
  }

  async openFirstViewProduct(): Promise<void> {
    await this.getFirstViewProduct().click();
  }

  async searchProduct(search: string): Promise<void> {
    await this.fieldSearchProduct.fill(search);
    await this.buttonSearch.click();
    await expect(this.headerSearchedProducts).toBeVisible();
  }

  async isFoundProductsHaveSearchText(search: string): Promise<void> {
    let products = await this.singleProduct.all();
    if (await this.singleProduct.first().isVisible()) {
      for (let product of products) {
        await expect.soft(product).toContainText(search, { ignoreCase: true });
      }
    } else {
      console.log('No found product');
    }
  }
  //TODO: below

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
    // await this.headerComponent.products.click();
    // await this.homePage.expectProductsPage();
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
