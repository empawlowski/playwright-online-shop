import { userData } from './user.data';

export const homeData = {
  titleHome: 'Automation Exercise',
  titleLogin: 'Automation Exercise - Signup / Login',
  // loggedUser: /^Logged in as w+$/,
  loggedInAs: 'Logged in as',
  loggedUser: `Logged in as ${userData.fakeUsername}`,
  incorrectEmail: 'Your email or password is incorrect!',
  emailExist: 'Email Address already exist!',
  confirmationSubscribe: 'You have been successfully subscribed!',
};
