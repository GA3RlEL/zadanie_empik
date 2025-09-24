import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Item } from "../types/item";

export class SearchListPage extends BasePage {
  selectors = {
    searchList: ".search-list",
    sortSelect: "#search-sort-select",
    items: ".search-list-item",

    itemTitle: ".ta-product-title",
    itemPrice: ".price",
    addToCartButton: ".addToCart",
  };

  constructor(page: Page) {
    super(page);
  }

  async hasSearchList(): Promise<boolean> {
    const searchList = this.page.locator(this.selectors.searchList);
    await searchList.waitFor({ state: "visible", timeout: 5000 });
    return await searchList.isVisible();
  }

  async sortByPrice(option: "priceAsc" | "priceDesc"): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(this.selectors.items);
    await this.page.selectOption(this.selectors.sortSelect, option);
  }

  async getProductDetails(item: Locator): Promise<Item> {
    const title = await item.locator(this.selectors.itemTitle).textContent();
    const priceString = await item
      .locator(this.selectors.itemPrice)
      .textContent();

    const price = priceString
      ? parseFloat(priceString.trim().replace(",", ".").split(/\s/)[0])
      : NaN;

    if (!title || isNaN(price)) {
      throw new Error("Failed to retrieve item details");
    }

    return { title: title.trim(), price: price };
  }

  async getSearchItem(index: number): Promise<Item> {
    await this.page.waitForSelector(this.selectors.items);

    const items = await this.page.locator(this.selectors.items);
    const item = items.nth(index);

    if (!item) {
      throw new Error(`Item at index ${index} does not exist`);
    }

    const newItem = await this.getProductDetails(item);

    return newItem;
  }

  async addItemToCart(index: number, cartProducts: Item[]): Promise<Item[]> {
    await this.page.waitForSelector(this.selectors.items);

    const items = await this.page.locator(this.selectors.items);
    const item = items.nth(index);

    if (!item) {
      throw new Error(`Item at index ${index} does not exist`);
    }

    await item.hover();
    const addToCartButton = await item.locator(this.selectors.addToCartButton);
    await addToCartButton.waitFor({ state: "visible", timeout: 5000 });

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (resp) =>
          resp.url().includes("/gateway/api/graphql/cart") &&
          resp.status() === 200
      ),
      addToCartButton.click(),
    ]);

    if (!response.ok()) {
      throw new Error("Failed to add item to cart");
    }

    const newItem = await this.getProductDetails(item);
    cartProducts.push(newItem);

    return cartProducts;
  }
}
