import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async isAt(url: string): Promise<boolean> {
    return await this.page.url().includes(url);
  }

  async waitForSomeTime(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
