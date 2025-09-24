import { Cookie, Page } from "@playwright/test";
import { DOMAIN } from "../constants/config";

export class BasePage {
  protected baseSelectors = {
    cartItemCount: ".ta-counter",
    cartButton: "a[href*='/cart/']",
  };

  constructor(protected page: Page) {}

  async getCartItemCount(): Promise<number> {
    const countLocator = await this.page.locator(
      this.baseSelectors.cartItemCount
    );
    const isVisible = await countLocator.isVisible();

    if (isVisible) {
      const countText = await countLocator.textContent();
      return countText ? parseInt(countText) : 0;
    } else {
      return 0;
    }
  }

  async isAt(url: string): Promise<boolean> {
    return await this.page.url().includes(url);
  }

  async waitForSomeTime(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async goTo(url?: string): Promise<void> {
    await this.page.goto(url ? url : "/");
  }

  async goToCart(): Promise<void> {
    await this.page.click(this.baseSelectors.cartButton);
  }

  async addCookie(name: string, value: string): Promise<void> {
    const newCookie: Cookie = {
      name: name,
      value: value,
      domain: DOMAIN,
      path: "/",
      expires: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
    };
    await this.page.context().addCookies([newCookie]);
  }

  async getCookie(name: string): Promise<Cookie | undefined> {
    const cookies = await this.page.context().cookies();
    const cookie = cookies.find((c) => c?.name === name);
    return cookie ? cookie : undefined;
  }
}
