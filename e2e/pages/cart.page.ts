import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { productData } from '../assets/data/e2e/product.data';
import { urlTitleData } from '../assets/data/e2e/url-title.data';
import { LoginPage } from './login.page';

export class CartPage extends BasePage {
  readonly buttonProceedToCheckout: Locator;
  readonly buttonRegisterLogin: Locator;
  readonly rowForProduct: Locator;

  //?
  //TODO:
  readonly cartPriceP1: Locator;
  readonly cartQuantityP1: Locator;
  readonly cartTotalPriceP1: Locator;
  readonly cartPriceP2: Locator;
  readonly cartQuantityP2: Locator;
  readonly cartTotalPriceP2: Locator;
  //?

  readonly cellDescription: Locator;
  readonly cellQuantity: Locator;

  readonly buttonDeleteQuantity: Locator;
  readonly sectionCartEmpty: Locator;

  readonly buttonDownloadInvoice: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonProceedToCheckout = page.locator('.check_out', { hasText: 'Proceed To Checkout' });
    this.buttonRegisterLogin = page.getByRole('link', { name: 'Register / Login' });
    this.rowForProduct = page.locator('#cart_info_table').getByRole('row', { name: 'Product Image' });
    this.cellDescription = page.locator('.cart_description');
    this.cellQuantity = page.locator('.cart_quantity');
    this.buttonDeleteQuantity = page.locator('.cart_quantity_delete');
    this.sectionCartEmpty = page.locator('#empty_cart');

    //TODO:
    this.cartPriceP1 = this.page.locator('#product-1').locator('.cart_price');
    this.cartQuantityP1 = this.page.locator('#product-1').locator('.cart_quantity');
    this.cartTotalPriceP1 = this.page.locator('#product-1').locator('.cart_total_price');
    this.cartPriceP2 = this.page.locator('#product-2').locator('.cart_price');
    this.cartQuantityP2 = this.page.locator('#product-2').locator('.cart_quantity');
    this.cartTotalPriceP2 = this.page.locator('#product-2').locator('.cart_total_price');
    //TODO:

    //Test Case 24: Download Invoice after purchase order
    this.buttonDownloadInvoice = page.locator('.check_out');
    this.buttonContinue = page.locator('.btn-primary');
  }

  getProductName(productName: string): Locator {
    return this.page.getByRole('row', { name: productName, exact: true });
  }

  async clickDeleteQuantity(): Promise<void> {
    await this.buttonDeleteQuantity.click();
  }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/view_cart');
    await expect(this.page).toHaveTitle(urlTitleData.cart);
  }

  //TODO:
  //!
  async expectAddedProductsName(productName: string[], products: string[]): Promise<void> {
    for (let i = 0; i < products.length; i++) {
      await expect.soft(this.getProductName(productName[i])).toBeVisible();
    }
  }

  //TODO: clear method
  async expectAddedProducts(): Promise<void> {
    await expect(this.cartPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartQuantityP1).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartPriceP2).toHaveText(productData.cartPriceP2);
    await expect(this.cartQuantityP2).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP2).toHaveText(productData.cartPriceP2);
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.buttonProceedToCheckout.click();
  }

  async clickRegisterLogin(): Promise<LoginPage> {
    await this.buttonRegisterLogin.click();
    return new LoginPage(this.page);
  }

  async expectAddedProductAndQuantity(productName: string, quantity: number): Promise<void> {
    await expect(this.cellDescription).toContainText(productName);
    await expect(this.cellQuantity).toHaveText(quantity.toString());
  }
}
