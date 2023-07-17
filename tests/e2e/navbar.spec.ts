import { test, expect, chromium } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Contact Us Form', async ({ page }) => {
  const username = 'fakeUserName';
  const email = 'fake@email.cc';
  const subject = 'Fake Subject';
  const message = 'Message';

  await chromium.launch();

  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Contact us' }).click();

  await expect(page.getByRole('heading', { name: 'GET IN TOUCH' })).toBeVisible(); //Verify that only header is visible

  await page.getByTestId('name').fill(username);
  await page.getByTestId('email').fill(email);
  await page.getByTestId('subject').fill(subject);
  await page.locator('#message').fill(message);

  await page.locator('input[name="upload_file"]').setInputFiles('./test-upload/image.jpg');

  await page.getByTestId('submit-button').click();
  //   page.on('dialog', (dialog) => dialog.accept());

  page.on('dialog', (dialog) => {
    dialog.accept();
    console.log('Alert dialog submitted');
  });

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
  await page.locator('#form-section').getByRole('link', { name: ' Home' }).click();
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');

  // Test Case 6: Contact Us Form
  // 1. Launch browser
  // 2. Navigate to url 'await page.goto('https://automationexercise.com/');
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Contact Us' button
  // 5. Verify 'GET IN TOUCH' is visible
  // 6. Enter name, email, subject and message
  // 7. Upload file
  // 8. Click 'Submit' button
  // 9. Click OK button
  // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  // 11. Click 'Home' button and verify that landed to home page successfully
});

test('Verify Test Cases Page', async ({ page }) => {
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: ' Test Cases' }).click();
  // await page.getByRole('button', { name: 'Test Cases' }).click();

  await expect(page).toHaveURL('/test_cases');
  await expect(page).toHaveTitle('Automation Practice Website for UI Testing - Test Cases');
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();

  // Test Case 7: Verify Test Cases Page
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Test Cases' button
  // 5. Verify user is navigated to test cases page successfully
});

test('Verify All Products and product detail page', async ({ page }) => {
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Products' }).click();

  await expect(page).toHaveURL('/products');
  await expect(page).toHaveTitle('Automation Exercise - All Products');
  await expect(page.getByRole('heading', { name: 'All Products', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'View Product' }).first().click();
  await expect(page).toHaveURL('product_details/1');
  await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
  await expect(page.getByText('Category:')).toBeVisible();
  await expect(page.getByText('Rs.')).toBeVisible();
  await expect(page.getByText('Availability:')).toBeVisible();
  await expect(page.getByText('Condition:')).toBeVisible();
  await expect(page.getByText('Brand:')).toBeVisible();

  // Test Case 8: Verify All Products and product detail page
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Products' button
  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  // 6. The products list is visible
  // 7. Click on 'View Product' of first product
  // 8. User is landed to product detail page
  // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
});

test('Search Product', async ({ page }) => {
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole('link', { name: 'Products' }).click();

  await expect(page).toHaveURL('/products');
  await expect(page).toHaveTitle('Automation Exercise - All Products');
  await expect(page.getByRole('heading', { name: 'All Products', exact: true })).toBeVisible();

  await page.locator('#search_product').fill('Top');
  await page.locator('#submit_search').click();

  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

  // await page.getByRole('link', { name: 'View Product' }).first().click();
  await expect(page.getByRole('link', { name: 'View Product' }).first()).toBeVisible();

  // Test Case 9: Search Product
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click on 'Products' button
  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  // 6. Enter product name in search input and click search button
  // 7. Verify 'SEARCHED PRODUCTS' is visible
  // 8. Verify all the products related to search are visible
});

test('Verify Subscription in home page', async ({ page }) => {
  const fakeEmail = faker.internet.email({ provider: 'fakerjs.dev' });
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await expect(page.getByRole('heading', { name: 'Subscription', exact: true })).toBeVisible();
  await page.locator('#susbscribe_email').fill(fakeEmail);

  await page.locator('#subscribe').click();
  // await expect(page.locator('#success-subscribe').getByText('You have been successfully subscribed!')).toBeVisible();

  await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');

  // Test Case 10: Verify Subscription in home page
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Scroll down to footer
  // 5. Verify text 'SUBSCRIPTION'
  // 6. Enter email address in input and click arrow button
  // 7. Verify success message 'You have been successfully subscribed!' is visible
});

test('Verify Subscription in Cart page', async ({ page }) => {
  const fakeEmail = faker.internet.email({ provider: 'fakerjs.dev' });
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');

  await page.getByRole('link', { name: 'Cart' }).click();

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await expect(page.getByRole('heading', { name: 'Subscription', exact: true })).toBeVisible();
  await page.locator('#susbscribe_email').fill(fakeEmail);
  await page.locator('#subscribe').click();
  await expect(page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');

  // Test Case 11: Verify Subscription in Cart page
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click 'Cart' button
  // 5. Scroll down to footer
  // 6. Verify text 'SUBSCRIPTION'
  // 7. Enter email address in input and click arrow button
  // 8. Verify success message 'You have been successfully subscribed!' is visible
});

test('Add Products in Cart', async ({ page }) => {
  const fakeEmail = faker.internet.email({ provider: 'fakerjs.dev' });
  await chromium.launch();

  await page.route('**/*', (route) => {
    if (route.request().url().startsWith('https://googleads.')) {
      route.abort();
    } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Automation Exercise');

  await page.getByRole('link', { name: 'Products' }).click();

  // await page.locator('.product-image-wrapper').locator('.single-products').locator('.productinfo text-center').first().hover();
  await page.getByText('Blue Top').first().hover();

  // await page.locator('.productinfo text-center').first().hover();

  await page.getByText('Add to cart').first().click();
  // await page.locator('.overlay-content').locator('.btn btn-default add-to-cart').getByText('Add to cart').first().click();

  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  await page.getByText('Men Tshirt', { exact: true }).first().hover();
  // await page.locator('.overlay-content > .btn').nth(1).hover();
  // await page.locator('.overlay-content').locator('.btn btn-default add-to-cart').filter({ hasText: 'Add to cart' }).click();
  await page.getByText('Add to cart').nth(3).click();
  await page.getByRole('link', { name: 'View Cart' }).click();

  // 9. Verify both products are added to Cart
  // const rowCount = await page.locator('.ant-table-tbody').locator('tr').count();
  const rowCount = await page.locator('#cart_info_table').locator('tbody').locator('tr').count();
  // const rowCount = await page.locator('tbody').locator('tr').count();
  await expect(rowCount).toBe(2);
  // await page.locator('#product-1').getByRole('link', { name: 'Product Image' }).click();
  await expect(page.locator('#product-1')).toBeVisible();
  // await page.locator('#product-2').getByRole('link', { name: 'Product Image' }).click();
  await expect(page.locator('#product-2')).toBeVisible();
  // 10. Verify their prices, quantity and total price
  // await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_price')).toHaveText('Rs. 500');
  await expect(page.locator('#product-1').locator('.cart_price')).toHaveText('Rs. 500');
  await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_quantity')).toHaveText('1');
  await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_total_price')).toHaveText('Rs. 500');
  await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_price')).toHaveText('Rs. 400');
  await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_quantity')).toHaveText('1');
  await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_total_price')).toHaveText('Rs. 400');

  // Test Case 12: Add Products in Cart
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully
  // 4. Click 'Products' button
  // 5. Hover over first product and click 'Add to cart'
  // 6. Click 'Continue Shopping' button
  // 7. Hover over second product and click 'Add to cart'
  // 8. Click 'View Cart' button
  // 9. Verify both products are added to Cart
  // 10. Verify their prices, quantity and total price
});
