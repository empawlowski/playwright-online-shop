import { faker } from '@faker-js/faker';
import { UserSignupModel } from '../models/login.model';

export function createSignupUser(sex?: 'female' | 'male'): UserSignupModel {
  const name = faker.person.firstName(sex) ?? faker.person.firstName();
  const userSignupModel: UserSignupModel = {
    name: name,
    email: faker.internet.email({ firstName: name, provider: 'fakerjs.dev' }),
  };
  return userSignupModel;
}
