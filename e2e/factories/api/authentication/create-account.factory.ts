import { faker } from '@faker-js/faker';
import { Configuration } from '../../../config/configuration';
import { CreateAccountAPIModel } from '../../../models/api/authentication/create-account.model';

export function createAccountAPI(): CreateAccountAPIModel {
  const createAccount: CreateAccountAPIModel = {
    name: Configuration.userAPI,
    email: Configuration.emailAPI,
    password: Configuration.password,
    title: 'Mr',
    birth_date: faker.number.int({ min: 1, max: 31 }).toString(),
    birth_month: faker.date.month(),
    birth_year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress({ useFullAddress: true }),
    address2: faker.location.secondaryAddress(),
    country: 'Australia',
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
  return createAccount;
}
