import { faker } from '@faker-js/faker';
import { CheckoutDescModel } from '../models/checkout.model';

export function randomDesc(): CheckoutDescModel {
  const description = faker.lorem.text();
  return { description };
}
