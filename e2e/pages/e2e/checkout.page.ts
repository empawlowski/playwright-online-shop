import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import * as data from '../../assets/data/e2e/app.data.json';
import { UserSignupAddressInfoModel } from '../../models/signup.model';
import { PaymentPage } from './payment.page';
import { CheckoutDescModel } from '../../models/checkout.model';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressLocator: Locator;
  readonly headerDeliveryAddress: Locator;
  readonly invoiceAddressLocator: Locator;
  readonly headerDeliveryInvoice: Locator;
  readonly fieldDescription: Locator;
  readonly buttonPlaceOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressLocator = page.locator('#address_delivery');
    this.headerDeliveryAddress = this.deliveryAddressLocator.locator('.page-subheading');
    this.invoiceAddressLocator = page.locator('#address_invoice');
    this.headerDeliveryInvoice = this.invoiceAddressLocator.locator('.page-subheading');
    this.fieldDescription = page.locator('textarea');
    this.buttonPlaceOrder = page.getByRole('link', { name: 'Place Order' });
  }

  async checkDeliveryAddress(address: UserSignupAddressInfoModel): Promise<void> {
    const strAddress = `Mrs. ${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`;
    await expect(this.headerDeliveryAddress).toContainText(data.checkout.yourDeliveryAddress);
    await expect.soft(this.deliveryAddressLocator).toContainText(strAddress);
  }

  async checkDeliveryInvoice(address: UserSignupAddressInfoModel): Promise<void> {
    const strAddress = `Mrs. ${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`;
    await expect(this.headerDeliveryInvoice).toContainText(data.checkout.yourDeliveryInvoice);
    await expect.soft(this.invoiceAddressLocator).toContainText(strAddress);
  }

  async fillDescription(desc: CheckoutDescModel): Promise<void> {
    await this.fieldDescription.fill(desc.description);
  }

  async clickPlaceOrder(): Promise<PaymentPage> {
    await this.buttonPlaceOrder.click();
    return new PaymentPage(this.page);
  }
}
