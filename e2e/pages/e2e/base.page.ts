import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly buttonAcceptDialog: Locator;
  readonly buttonScrollUp: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.buttonAcceptDialog = page.getByRole('button', { name: 'Submit' });
    this.buttonScrollUp = page.locator('#scrollUp');
  }

  async goTo(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async catchDialog(): Promise<void> {
    this.page.on('dialog', (dialog) => {
      console.log('Dialog message: ', dialog.message());
      console.log('Type of dialog: ', dialog.type());
      dialog.accept();
    });
  }

  async scrollDownPage(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollUpPage(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async clickScrollUpArrow(): Promise<void> {
    await this.buttonScrollUp.click();
  }

  async takeScreenShot(screenShotName: string) {
    await this.page.screenshot({ path: `./e2e/download/ui/home/${screenShotName}.png` });
  }

  async giveMeSmallSecond(timeout: number = 200) {
    await this.page.waitForTimeout(timeout);
  }
}
