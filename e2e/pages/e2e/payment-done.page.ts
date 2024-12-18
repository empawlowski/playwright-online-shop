import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HomePage } from './home.page';

export class PaymentDonePage extends BasePage {
  private readonly buttonDownloadInvoice: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonDownloadInvoice = page.getByRole('link', { name: 'Download Invoice' });
    this.buttonContinue = page.getByRole('link', { name: 'Continue' });
  }

  async downloadInvoice(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.buttonDownloadInvoice.click();
    const download = await downloadPromise;
    if (download) {
      await download.saveAs('./e2e/download/invoice/invoice.txt');
      console.log('File downloaded successfully.');
    } else {
      console.log('File download failed.');
    }
  }

  async clickContinue(): Promise<HomePage> {
    await this.buttonContinue.click();
    return new HomePage(this.page);
  }
}
