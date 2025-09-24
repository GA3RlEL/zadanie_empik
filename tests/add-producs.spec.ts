import { test, expect } from "@playwright/test";
import { POManager } from "../page_objects/POManager";
import { Item } from "../types/item";

test("Add the product and validate the cart page, along with adding cookie", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const bannerCookies = poManager.getBannerCookies();
  const searchListPage = poManager.getSearchListPage();
  const cartPage = poManager.getCartPage();

  let products: Item[] = [];

  // Navigate to bestsellery/ksiazki by url
  await searchListPage.goTo("/nowosci/ksiazki");

  // Accept cookies if the banner is visible
  await bannerCookies.acceptCookies();

  // Assert that we are /nowosci/ksiazki
  await searchListPage.isAt("/nowosci/ksiazki");

  // Get the number of products in the cart before adding any product
  const itemsInCartBefore = await searchListPage.getCartItemCount();

  // Add first product to cart
  products = await searchListPage.addItemToCart(0, products);

  // Get the number of products in the cart after adding a product
  const itemsInCartAfter = await searchListPage.getCartItemCount();

  // Assert that the number of products in the cart has increased by 1
  expect(itemsInCartAfter).toBe(itemsInCartBefore + 1);

  // Set cookie with name "rekrutacja" and value "2025"
  await searchListPage.addCookie("rekrutacja", "2025");

  // Verify that the cookie has been set
  const cookie = await searchListPage.getCookie("rekrutacja");
  expect(cookie?.value).toBe("2025");

  // Go to cart page
  await cartPage.goToCart();

  // Assert that we are at the cart page
  await cartPage.isAt("/cart");

  // Verify that the number of products in the cart is correct
  const itemsInCart = await cartPage.getCartCount();
  expect(itemsInCart).toBe(products.length);

  // Verify that the products in the cart are correct
  const productsInCart = await cartPage.getProductsInCart();
  expect(productsInCart).toEqual(products);
});
