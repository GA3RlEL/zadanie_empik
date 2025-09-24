import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { SearchListPage } from "./SearchListPage";
import { BannerCookies } from "./BannerCookies";
import { CartPage } from "./CartPage";

export class POManager {
  public homePage: HomePage;
  public searchListPage: SearchListPage;
  public bannerCookies: BannerCookies;
  public cartPage: CartPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(this.page);
    this.searchListPage = new SearchListPage(this.page);
    this.bannerCookies = new BannerCookies(this.page);
    this.cartPage = new CartPage(this.page);
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

  getCartPage(): CartPage {
    return this.cartPage;
  }
}
