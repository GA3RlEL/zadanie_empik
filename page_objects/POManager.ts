import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { SearchListPage } from "./SearchListPage";
import { BannerCookies } from "./BannerCookies";

export class POManager {
  public homePage: HomePage;
  public searchListPage: SearchListPage;
  public bannerCookies: BannerCookies;

  constructor(private page: Page) {
    this.homePage = new HomePage(this.page);
    this.searchListPage = new SearchListPage(this.page);
    this.bannerCookies = new BannerCookies(this.page);
  }

  getHomePage(): HomePage {
    return this.homePage;
  }

  getSearchListPage(): SearchListPage {
    return this.searchListPage;
  }

  getBannerCookies(): BannerCookies {
    return this.bannerCookies;
  }
}
