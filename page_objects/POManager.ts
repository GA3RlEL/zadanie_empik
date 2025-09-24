import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class POManager {
  public homePage: HomePage;

  constructor(private page: Page) {
    this.homePage = new HomePage(this.page);
  }

  getHomePage(): HomePage {
    return this.homePage;
  }
}
