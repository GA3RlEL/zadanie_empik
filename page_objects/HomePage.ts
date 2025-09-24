import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }
}
