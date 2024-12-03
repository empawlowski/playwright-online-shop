import { faker } from '@faker-js/faker';
import { UserSignupBasicInfoModel } from '../models/signup.model';

// export function createSignupUserBasicInfo(): UserSignupBasicInfoModel {
//   const userBasicInfo: UserSignupBasicInfoModel = {
//     password: faker.internet.password(),
//     day: faker.number.int({ min: 1, max: 31 }).toString(),
//     month: faker.date.month(),
//     year: faker.number.int({ min: 1900, max: 2021 }).toString(),
//   };
//   return userBasicInfo;
// }

export function createSignupUserBasicInfo(): UserSignupBasicInfoModel {
  const password = faker.internet.password();
  const day = faker.number.int({ min: 1, max: 31 }).toString();
  const month = faker.date.month();
  const year = faker.number.int({ min: 1900, max: 2021 }).toString();
  return { password, day, month, year };
}
