import { Page } from "@playwright/test";

export class BannerCookies {
  constructor(private page: Page) {}

  async acceptCookies(): Promise<void> {
    const button = this.page.getByRole("button", {
      name: "Zaakceptuj zgody",
    });
    await button.waitFor({ state: "visible", timeout: 5000 }).catch(() => null);
    if (await button.isVisible()) {
      await button.click();
    }
  }
}
