import { expect, test } from "@playwright/test";
import { POManager } from "../page_objects/POManager";

test.beforeEach(async ({ page }) => {
  await page.waitForLoadState("networkidle");
});

test("Check and display the price difference between the cheapest and the most expensive book from the latest category", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const bannerCookies = poManager.getBannerCookies();
  const homePage = poManager.getHomePage();
  const searchListPage = poManager.getSearchListPage();

  // Navigate to the home page
  await homePage.goTo();

  // Accept cookies if the banner is visible
  await bannerCookies.acceptCookies();

  // Wait for potential ads to appear
  await homePage.waitForSomeTime(3000);

  // Navigate to the latest books category (Książki > Nowości)
  await homePage.goToCategory("Książki", "Nowości");

  // Assert that we are /nowosci/ksiazki
  await searchListPage.isAt("/nowosci/ksiazki");

  // Assert that the search list is visible
  const isSearchListVisible = await searchListPage.hasSearchList();
  await expect(isSearchListVisible).toBeTruthy();

  // Sort the books by price ascending
  await searchListPage.sortByPrice("priceAsc");

  // Get the price of the cheapest book
  const cheapestBook = await searchListPage.getSearchItem(0);

  // Sort the books by price descending
  await searchListPage.sortByPrice("priceDesc");

  // Get the price of the most expensive book
  const mostExpensiveBook = await searchListPage.getSearchItem(0);

  // Calculate the price difference
  const priceDifference = mostExpensiveBook.price - cheapestBook.price;

  // Log the results
  console.log(
    `Cheapest book: ${cheapestBook.title} - ${cheapestBook.price} PLN`
  );
  console.log(
    `Most expensive book: ${mostExpensiveBook.title} - ${mostExpensiveBook.price} PLN`
  );
  console.log(`Price difference: ${priceDifference.toFixed(2)} PLN`);
});
