import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './e2e/base.page';
import * as data from '../assets/data/e2e/app.data.json';

export class TestCasesPage extends BasePage {
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { name: 'Test Cases', exact: true });
  }

  async expectTestCasePage(): Promise<void> {
    await expect(this.page).toHaveURL('/test_cases');
    await expect(this.page).toHaveTitle(data.title.testCase);
    await expect(this.header).toBeVisible();
  }
}
