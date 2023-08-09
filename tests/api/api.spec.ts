import { test, expect } from '@playwright/test';

// reqres.in;

test.describe('APIs List for practice', () => {
  test('API 0: 404 Page', async ({ request }) => {
    //Assert
    const response = await request.get('/api/notExistEndpoint');
    //Act
    //Assert
    expect(response.status()).toBe(404);

    // API 0: 404 Page
    // API URL: https://automationexercise.com//api/notExistEndpoint
    // Request Method: GET
    // Response Code: 404
  });
  test('API 0: Bad status code', async ({ request }) => {
    //Assert
    test.fail(); //! Test is fail so is true ;-)
    const response = await request.get('/api/productsList');
    //Act
    //Assert
    expect(response.status()).toBe(400);

    // API 0: Bad status code //!
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 400
  });
  test('API 1: Get All Products List', async ({ request }) => {
    //Assert
    const response = await request.get('/api/productsList');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody); //! ? //TODO:

    // API 1: Get All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All products list
  });

  test('API 1.1: Get Details Product', async ({ request }) => {
    //Assert
    const response = await request.get('/api/productsList/1'); //! id for 1?
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    expect(responseBody.products.id).toBe(1); //! id details
    expect(responseBody.products.name).toBe('Blue Top'); //! id details
    expect(responseBody.products.email).toBeTruthy(); //! some value = pass (for date)
    console.log(responseBody);
    console.log('Name: ', responseBody.products.name); //! assertion more

    // API 1: Get All Products List //!
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All products list
  });

  test('API 2: POST To All Products List', async ({ request }) => {
    //Assert
    const response = await request.post('/api/productsList', {
      data: {
        id: 44,
        name: 'Gray Hoodie',
        price: 'Rs. 660',
        brand: 'Patagonia',
        category: [Object],
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Assert
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');

    // API 2: POST To All Products List
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: POST
    // Response Code: 405
    // Response Message: This request method is not supported.
  });
  test('API 3: GET All Brands List', async ({ request }) => {
    //Assert
    const response = await request.get('/api/brandsList');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response).toBeTruthy();
    //Arrange
    console.log(responseBody);

    // API 3: GET All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: GET
    // Response Code: 200
    // Response JSON: All brands list
  });
  test('API 4: PUT To All Brands List', async ({ request }) => {
    //Assert
    const response = await request.put('/api/brandsList', {
      data: {
        id: 45,
        brand: 'Patagonia',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');

    // API 4: PUT To All Brands List
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: PUT
    // Response Code: 405
    // Response Message: This request method is not supported.
  });

  test.fixme('API 5: POST To Search Product', async ({ request }) => {
    //Assert
    test.fail();
    const response = await request.post('/api/searchProduct', {
      data: {
        search_product: 'top',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    // expect(responseBody.message).toBe('Searched products list');

    // API 5: POST To Search Product
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Request Parameter: search_product (For example: top, tshirt, jean)
    // Response Code: 200
    // Response JSON: Searched products list
  });
  test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    //Assert
    const response = await request.post('/api/searchProduct');
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');

    // expect(responseBody.responseCode).toBe(200);
    // expect(responseBody.message).toBe('This request method is not supported.');

    // API 6: POST To Search Product without search_product parameter
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Response Code: 400
    // Response Message: Bad request, search_product parameter is missing in POST request.
  });
  test.fixme('API 7: POST To Verify Login with valid details', async ({ request }) => {
    //Assert
    test.fail();
    const response = await request.post('/api/verifyLogin', {
      data: {
        email: 'fake@email.cc',
        password: 'fake!Password00',
      },
    });
    const responseBody = JSON.parse(await response.text());
    //Act
    expect(response.status()).toBe(200);
    //Arrange
    console.log(responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User exists!');

    // API 7: POST To Verify Login with valid details
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    // Request Parameters: email, password
    // Response Code: 200
    // Response Message: User exists!
  });
});
