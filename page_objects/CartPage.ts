import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Item } from "../types/item";

export class CartPage extends BasePage {
  selectors = {
    cartItems: "div[data-ta*='product-box']",

    productName: "a[data-ta*='product-title']",
    productPrice: "span[data-ta*='product-main-price']",
  };

  constructor(page: Page) {
    super(page);
  }

  async getCartCount(): Promise<number> {
    const cartItems = await this.page.locator(this.selectors.cartItems).all();
    return cartItems.length;
  }

  async getProductsInCart(): Promise<Item[]> {
    const products: Item[] = [];
    const cartItems = await this.page.locator(this.selectors.cartItems).all();

    for (let product of cartItems) {
      const title = await product
        .locator(this.selectors.productName)
        .textContent();

      const priceString = await product
        .locator(this.selectors.productPrice)
        .textContent();

      const price = priceString
        ? parseFloat(priceString.trim().replace(",", ".").split(/\s/)[0])
        : NaN;

      products.push({ title: title?.trim() || "", price: price });
    }

    return products;
  }
}
