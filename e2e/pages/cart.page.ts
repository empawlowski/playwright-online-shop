import { type Locator, type Page, expect } from '@playwright/test';
import { HomePage } from './home.page';
import { ProductsPage } from './product.page';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';

export class CartPage extends BasePage {
  private readonly homePage: HomePage;
  private readonly headerComponent: HeaderComponent;
  readonly product: ProductsPage;
  readonly addressDelivery: Locator;

  readonly addressInvoice: Locator;
  readonly fillDescription: Locator;
  readonly bPlaceOrder: Locator;

  readonly fillNameOnCard: Locator;
  readonly fillCardNumber: Locator;
  readonly fillCvc: Locator;
  readonly fillExpiryMonth: Locator;
  readonly fillExpiryYear: Locator;
  readonly bPay: Locator;
  readonly toastMessage: Locator;

  readonly bProceedToCheckout: Locator;
  readonly bRegisterLogin: Locator;

  readonly bDeleteQuantity: Locator;
  readonly divCartEmpty: Locator;

  readonly bDownloadInvoice: Locator;
  readonly bContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(page);
    this.product = new ProductsPage(page);

    //Test Case 14: Place Order: Register while Checkout
    this.addressDelivery = page.locator('#address_delivery');
    this.addressInvoice = page.locator('#address_invoice');
    this.fillDescription = page.locator('#ordermsg').locator('.form-control');
    this.bPlaceOrder = page.getByRole('link', { name: 'Place Order' });

    this.fillNameOnCard = page.getByTestId('name-on-card');
    this.fillCardNumber = page.getByTestId('card-number');
    this.fillCvc = page.getByTestId('cvc');
    this.fillExpiryMonth = page.getByTestId('expiry-month');
    this.fillExpiryYear = page.getByTestId('expiry-year');
    this.bPay = page.getByTestId('pay-button');
    this.toastMessage = page.locator('#success_message');

    this.bProceedToCheckout = page.getByText('Proceed To Checkout');
    this.bRegisterLogin = page.getByRole('link', { name: 'Register / Login' });

    this.bDeleteQuantity = page.locator('a.cart_quantity_delete');
    this.divCartEmpty = page.locator('#empty_cart');

    //Test Case 24: Download Invoice after purchase order
    this.bDownloadInvoice = page.locator('.check_out');
    this.bContinue = page.locator('.btn-primary');
  }

  async checkoutFromCartPage(): Promise<void> {
    await this.homePage.expectCartPage();
    await this.bProceedToCheckout.click();
    await this.bRegisterLogin.click();
  }

  async proceedToCheckout(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.bProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.product.expectAddProductQuantity();
    await this.fillDescription.fill(description);
    await this.bPlaceOrder.click();
  }

  async checkoutWithoutExpectProductQuantity(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.bProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.fillDescription.fill(description);
    await this.bPlaceOrder.click();
  }

  async proceedToCheckoutWithAddressVerification(deliveryAddress: string, deliveryInvoice: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.bProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
  }

  async fillCartInformation(
    firstName: string,
    lastName: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string,
  ): Promise<void> {
    await this.fillNameOnCard.fill(firstName + lastName);
    await this.fillCardNumber.fill(cardNumber);
    await this.fillCvc.fill(cvc);
    await this.fillExpiryMonth.fill(expiryMonth);
    await this.fillExpiryYear.fill(expiryYear);
    await this.bPay.click();
    await this.toastMessage.isVisible();
  }
}
