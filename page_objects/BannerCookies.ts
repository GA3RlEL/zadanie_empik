import { Page } from "@playwright/test";

export class BannerCookies {
  selectors = {
    banner: ".InfoPage-module_buttonsDesktop__M6SUt",
    acceptButton: 'button[data-ta="cookie-btn-accept-all"]',
  };

  constructor(private page: Page) {}

  async acceptCookies(): Promise<void> {
    const bannerLocator = this.page.locator(this.selectors.banner);
    if (await bannerLocator.isVisible()) {
      const acceptButton = bannerLocator.locator(this.selectors.acceptButton);
      await acceptButton.click();
    }
  }
}
