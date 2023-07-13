import { test, expect, chromium } from '@playwright/test';
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
