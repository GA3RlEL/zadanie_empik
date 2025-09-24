import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  selectors = {
    menuCategories: ".tina-adv .main-nav",
    mainCategory: (name: string) => `a.nav-categories__link[title='${name}']`,
    subCategory: (name: string) => `a.nav-subcategories__link[title='${name}']`,
  };

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }

  async goToCategory(
    mainCategory: string,
    subCategory?: string
  ): Promise<void> {
    const menuCategories = this.page.locator(this.selectors.menuCategories);

    try {
      const mainCategoryLocator = menuCategories.locator(
        this.selectors.mainCategory(mainCategory)
      );
      if (subCategory) {
        await mainCategoryLocator.hover();
        const subCategoryLocator = menuCategories.locator(
          this.selectors.subCategory(subCategory)
        );
        await subCategoryLocator.click();
      } else {
        await mainCategoryLocator.click();
      }
    } catch (error) {
      throw new Error(
        `An issue occured while navigating to given category: ${error}`
      );
    }
  }
}
