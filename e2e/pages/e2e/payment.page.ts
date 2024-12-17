import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { CardInfoModel } from '../../models/payment.model';
import { PaymentDonePage } from './payment-done.page';

export class PaymentPage extends BasePage {
  readonly fieldNameOnCard: Locator;
  readonly fieldCardNumber: Locator;
  readonly fieldCvc: Locator;
  readonly fieldExpiryMonth: Locator;
  readonly fieldExpiryYear: Locator;
  readonly buttonPayAndConfirm: Locator;
  readonly alert: Locator;

  readonly done: PaymentDonePage;

  constructor(page: Page) {
    super(page);
    this.fieldNameOnCard = page.getByTestId('name-on-card');
    this.fieldCardNumber = page.getByTestId('card-number');
    this.fieldCvc = page.getByTestId('cvc');
    this.fieldExpiryMonth = page.getByTestId('expiry-month');
    this.fieldExpiryYear = page.getByTestId('expiry-year');
    this.buttonPayAndConfirm = page.getByTestId('pay-button');
    this.alert = page.locator('#success_message');

    this.done = new PaymentDonePage(this.page);
  }

  async fillCardInformation(card: CardInfoModel): Promise<void> {
    await this.fieldNameOnCard.fill(card.fullName);
    await this.fieldCardNumber.fill(card.cardNumber);
    await this.fieldCvc.fill(card.cvc);
    await this.fieldExpiryMonth.fill(card.expiryMonth);
    await this.fieldExpiryYear.fill(card.expiryYear);
  }

  async isAlertVisible(): Promise<void> {
    await this.alert.isVisible();
  }

  async clickPayAndConfirm(): Promise<PaymentDonePage> {
    await this.buttonPayAndConfirm.click();
    await this.isAlertVisible();
    return new PaymentDonePage(this.page);
  }
}
