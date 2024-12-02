import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { contactUsData } from '../assets/data/e2e/contact-us.data';

export class ContactUsPage extends BasePage {
  readonly header: Locator;
  readonly fieldName: Locator;
  readonly fieldEmail: Locator;
  readonly fieldSubject: Locator;
  readonly fieldMessage: Locator;
  readonly fieldFileUpload: Locator;
  readonly buttonSubmit: Locator;
  readonly alertMessage: Locator;
  readonly buttonBackHome: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { name: contactUsData.header });
    this.fieldName = page.getByTestId('name');
    this.fieldEmail = page.getByTestId('email');
    this.fieldSubject = page.getByTestId('subject');
    this.fieldMessage = page.getByTestId('message');
    this.fieldFileUpload = page.locator('input[name="upload_file"]');
    this.buttonSubmit = page.getByTestId('submit-button');
    this.alertMessage = page.locator('#contact-page').locator('.alert-success');
    this.buttonBackHome = page.locator('.btn-success');
  }

  async fillContactUs(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.fieldName.fill(name);
    await this.fieldEmail.fill(email);
    await this.fieldSubject.fill(subject);
    await this.fieldMessage.fill(message);
    await this.fieldFileUpload.setInputFiles('./e2e/assets/images/image.jpg');
    await this.buttonSubmit.click();
  }
}
