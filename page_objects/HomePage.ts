import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  selectors = {
    desktop: {
      menuCategories: ".tina-adv .main-nav",
      mainCategory: (name: string) => `a.nav-categories__link[title='${name}']`,
      subCategory: (name: string) =>
        `a.nav-subcategories__link[title='${name}']`,
    },
    mobile: {
      menuCategories: ".scrollbarElements--mobile a[href*='/mapa-strony']",
      categoriesMobileBox: "div[data-box-key='MobileCategoryNavigationBox']",
    },
  };

  constructor(page: Page) {
    super(page);
  }

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }

  async goToCategoryDesktop(
    mainCategory: string,
    subCategory?: string
  ): Promise<void> {
    const menuCategories = this.page.locator(
      this.selectors.desktop.menuCategories
    );

    try {
      const mainCategoryLocator = menuCategories.locator(
        this.selectors.desktop.mainCategory(mainCategory)
      );
      if (subCategory) {
        await mainCategoryLocator.hover();
        const subCategoryLocator = menuCategories.locator(
          this.selectors.desktop.subCategory(subCategory)
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

  async goToCategoryMobile(
    mainCategory: string,
    subCategory: string
  ): Promise<void> {
    const menuCategories = this.page.locator(
      this.selectors.mobile.menuCategories
    );

    try {
      await menuCategories.click();

      const mobileOptionsBox = this.page.locator(
        this.selectors.mobile.categoriesMobileBox
      );
      const mainCategoryButton = mobileOptionsBox.getByRole("button", {
        name: mainCategory,
        exact: true,
      });
      await mainCategoryButton.click();
      const subCategoryButton = this.page
        .getByRole("link", {
          name: subCategory,
          exact: true,
        })
        .first();
      await subCategoryButton.click();
    } catch (error) {
      throw new Error(
        `An issue occured while navigating to given category: ${error}`
      );
    }
  }
}
