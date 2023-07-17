# e2e-online-shop

prettier
code spell checker
npm install --save-dev @faker-js/faker
dodanie import { faker } from '@faker-js/faker';
wywołanie email: faker.internet.email(),

edit readme:
add about data-qa
ad block 2x

info odnośnie timeout?
scroll down
scroll up
await page.evaluate(() => {
window.scrollTo(0, 0);
});
i obsługa alerta? await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');

hover?
zliczenie rekordów .count();
