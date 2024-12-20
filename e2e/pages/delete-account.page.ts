import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './e2e/base.page';
import { HomePage } from './e2e/home.page';

export class DeleteAccountPage extends BasePage {
  readonly headerAccountDeleted: Locator;
  readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.headerAccountDeleted = this.page.getByTestId('account-deleted');
    this.buttonContinue = this.page.getByTestId('continue-button');
  }

  async clickContinue(): Promise<HomePage> {
    await this.buttonContinue.click();
    return new HomePage(this.page);
  }
}
