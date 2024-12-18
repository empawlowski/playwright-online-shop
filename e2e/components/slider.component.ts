import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/e2e/base.page';

export class SliderComponent extends BasePage {
  private readonly buttonTestCases: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonTestCases = page.getByRole('button', { name: 'Test Cases', exact: true });
  }

  async openTestCasesFromSlider(): Promise<void> {
    await this.buttonTestCases.click();
  }
}
