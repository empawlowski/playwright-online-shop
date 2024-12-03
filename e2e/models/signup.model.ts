export interface UserSignupBasicInfoModel {
  password: string;
  day: string;
  month: string;
  year: string;
}

export interface UserSignupAddressInfoModel {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}