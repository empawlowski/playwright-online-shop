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
  readonly fieldDescription: Locator;
  readonly buttonPlaceOrder: Locator;

  readonly fieldNameOnCard: Locator;
  readonly fieldCardNumber: Locator;
  readonly fieldCvc: Locator;
  readonly fieldExpiryMonth: Locator;
  readonly fieldExpiryYear: Locator;
  readonly buttonPay: Locator;
  readonly toastMessage: Locator;

  readonly buttonProceedToCheckout: Locator;
  readonly buttonRegisterLogin: Locator;

  readonly buttonDeleteQuantity: Locator;
  readonly divCartEmpty: Locator;

  readonly buttonDownloadInvoice: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(page);
    this.product = new ProductsPage(page);

    //Test Case 14: Place Order: Register while Checkout
    this.addressDelivery = page.locator('#address_delivery');
    this.addressInvoice = page.locator('#address_invoice');
    this.fieldDescription = page.locator('#ordermsg').locator('.form-control');
    this.buttonPlaceOrder = page.getByRole('link', { name: 'Place Order' });

    this.fieldNameOnCard = page.getByTestId('name-on-card');
    this.fieldCardNumber = page.getByTestId('card-number');
    this.fieldCvc = page.getByTestId('cvc');
    this.fieldExpiryMonth = page.getByTestId('expiry-month');
    this.fieldExpiryYear = page.getByTestId('expiry-year');
    this.buttonPay = page.getByTestId('pay-button');
    this.toastMessage = page.locator('#success_message');

    this.buttonProceedToCheckout = page.getByText('Proceed To Checkout');
    this.buttonRegisterLogin = page.getByRole('link', { name: 'Register / Login' });

    this.buttonDeleteQuantity = page.locator('a.cart_quantity_delete');
    this.divCartEmpty = page.locator('#empty_cart');

    //Test Case 24: Download Invoice after purchase order
    this.buttonDownloadInvoice = page.locator('.check_out');
    this.buttonContinue = page.locator('.btn-primary');
  }

  async checkoutFromCartPage(): Promise<void> {
    await this.homePage.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await this.buttonRegisterLogin.click();
  }

  async proceedToCheckout(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.product.expectAddProductQuantity();
    await this.fieldDescription.fill(description);
    await this.buttonPlaceOrder.click();
  }

  async checkoutWithoutExpectProductQuantity(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.buttonProceedToCheckout.click();
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.fieldDescription.fill(description);
    await this.buttonPlaceOrder.click();
  }

  async proceedToCheckoutWithAddressVerification(deliveryAddress: string, deliveryInvoice: string): Promise<void> {
    await this.headerComponent.cart.click();
    await this.homePage.expectCartPage();
    await this.buttonProceedToCheckout.click();
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
    await this.fieldNameOnCard.fill(firstName + lastName);
    await this.fieldCardNumber.fill(cardNumber);
    await this.fieldCvc.fill(cvc);
    await this.fieldExpiryMonth.fill(expiryMonth);
    await this.fieldExpiryYear.fill(expiryYear);
    await this.buttonPay.click();
    await this.toastMessage.isVisible();
  }
}
