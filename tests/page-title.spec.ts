import { test, expect } from "@playwright/test";
import { POManager } from "../page_objects/POManager";

// Test to check the page title
test("Check page title", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();

  // Navigate to the page
  await page.goto("/");

  // Get page title
  const title = await homePage.getPageTitle();

  // Assert that the title containts "Empik"
  await expect(title).toContain("Empik");
});
