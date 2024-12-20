import { expect } from '@playwright/test';
import { CreateAccountBodyAPIModel } from '../../../models/api/authentication/create-account.model';

export class ResponseAPIPage {
  constructor() {}

  checkResponseCode(responseBody: CreateAccountBodyAPIModel, code: number): void {
    expect.soft(responseBody.responseCode).toBe(code);
  }

  checkResponseMessage(responseBody: CreateAccountBodyAPIModel, message: string): void {
    expect.soft(responseBody.message).toBe(message);
  }
}
