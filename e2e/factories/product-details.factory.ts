import { faker } from '@faker-js/faker';
import { ProductReviewModel } from '../models/product-details.model';

export function createProductReview(): ProductReviewModel {
  const productReview = {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    review: faker.lorem.text(),
  };
  return productReview;
}
