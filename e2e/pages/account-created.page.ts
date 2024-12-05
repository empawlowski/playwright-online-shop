import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HomePage } from './home.page';

export class AccountCreatedPage extends BasePage {
  readonly headerAccountCreated: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.headerAccountCreated = this.page.getByTestId('account-created');
    this.buttonContinue = this.page.getByTestId('continue-button');
  }

  async clickContinue(): Promise<HomePage> {
    await this.buttonContinue.click();
    return new HomePage(this.page);
  }
}
