import { Page, expect } from '@playwright/test';
import { HomePage } from '../components/home.component';
import { NavbarPage } from './navbar.page';

export class CartPage {
  constructor(private page: Page) {}
  homePage = new HomePage(this.page);
  navbar = new NavbarPage(this.page);

  //* POM for Cart page  (#proceedToCheckout) (#fillCartInformation)
  //Test Case 14: Place Order: Register while Checkout
  addressDelivery = this.page.locator('#address_delivery');
  addressInvoice = this.page.locator('#address_invoice');
  fillDescription = this.page.locator('#ordermsg').locator('.form-control');
  bPlaceOrder = this.page.getByRole('link', { name: 'Place Order' });

  fillNameOnCard = this.page.getByTestId('name-on-card');
  fillCardNumber = this.page.getByTestId('card-number');
  fillCvc = this.page.getByTestId('cvc');
  fillExpiryMonth = this.page.getByTestId('expiry-month');
  fillExpiryYear = this.page.getByTestId('expiry-year');
  bPay = this.page.getByTestId('pay-button');
  toastMessage = this.page.locator('#success_message');

  //   Proceed To Checkout

  async proceedToCheckout(deliveryAddress: string, deliveryInvoice: string, description: string): Promise<void> {
    await expect(this.addressDelivery).toHaveText(deliveryAddress);
    await expect(this.addressInvoice).toHaveText(deliveryInvoice);
    await this.navbar.expectAddProductQuantity();
    await this.fillDescription.fill(description);
    await this.bPlaceOrder.click();
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

  //   async checkout(): Promise<void> {
  //     await this.proceedToCheckout();
  //   }
}
