# Test Automation for page: `https://automationexercise.com`

## Used extensions and library in project

- ### Playwright Test for VSCode
- ### GitHub Actions/ GitLens Inspect
- ### Prettier (installation below)
- ### Better Comments
- ### Code Spell Checker
- ### Auto-Open Markdown Preview
- ### VSCode-icons
- ### Faker (installation bellow) (`library`)

## Playwright snippets

- advertisements blocker

```javascript
await page.route('**/*', (route) => {
  if (route.request().url().startsWith('https://googleads.')) {
    route.abort();
  } else if (route.request().url().startsWith('https://fonts.googleapis.')) {
    route.abort();
  } else {
    route.continue();
  }
});
```

- interact with the web page `dialogs` [ `navbar.spec.ts` > `Test Case 6: Contact Us Form` ]

```javascript
page.on('dialog', (dialog) => dialog.accept());
await page.locator('#dialog').click();
```

- `scroll down` the page [ `navbar.spec.ts` > `Test Case 10: Verify Subscription in home page` ]

```javascript
// Scroll Down
await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

// Scroll Up
await page.evaluate(() => {
  window.scrollTo(0, 0);
});
```

- `catch` success alert [ `navbar.spec.ts` > `Test Case 10: Verify Subscription in home page` ]

```javascript
await expect(page.locator('#alert')).toContainText('Success!');
```

- `count` all rows in table [ `navbar.spec.ts` > `Test Case 12: Add Products in Cart` ]

```javascript
const rowCount = await page.locator('tr').count();
await expect(rowCount).toBe(number);
```

- use `regex` to check changing link "Logged in as `userName`"

```javascript
/^Logged in as \w+$/;
```

- edit

```javascript

```

- edit

```javascript

```

## Playwright Config modifications

- add `timeout` and `expect timeout`
  ```javascript
  timeout: 30 * 1000,
  expect: {
      /**
      * Maximum time expect() should wait for the condition to be met.
      * For example in `await expect(locator).toHaveText();`
      */
        timeout: 5000,
        },
  ```
- add other `attribute` for `testid`
  ```javascript
  use: {
      // Set the test id to use a custom data attribute.
      testIdAttribute: 'data-qa',
      },
  ```
- add `Trace Viewer`, `Video` and `Screenshot` when retrying failed test
  ```javascript
  use: {
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
  ```

## Installation

- ### `Project installation`
- edit

```javascript
npm install
npm init playwright@latest
```

- ### `Prettier`
- install
  ```javascript
   npm install --save-dev --save-exact prettier
  ```
- configure

  - exclude files in `.prettierignore`

    ```
    package - lock.json
    playwright - report
    test - download
    test - upload
    test - results
    ```

  - set rules in `.prettierrc.json`

    ```javascript
    {
    "singleQuote": true,
    "endOfLine": "auto",
    "printWidth": 150
    }
    ```

- ### `Faker`
- install
  ```javascript
  npm install --save-dev @faker-js/faker
  ```
- usage
  ```javascript
  import { faker } from '@faker-js/faker';
  const email = faker.internet.email();
  ```
