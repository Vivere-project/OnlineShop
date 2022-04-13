import {Cart} from "./cart";
import {Item} from "./item";

export class LocalStorage {
  cart: Cart = {}
  itemsCache: Item[] = []
  locale: string = ""
  theme: string = ""
  isAdmin: boolean = false

  constructor(rawLocalStorage: Storage){
    this.cart = JSON.parse(rawLocalStorage.getItem("cart") ?? "{}");
    this.itemsCache = JSON.parse(rawLocalStorage.getItem("itemsCache") ?? "[]");
    this.locale = rawLocalStorage.getItem("locale") ?? "";
    this.theme = rawLocalStorage.getItem("theme") ?? "";
    this.isAdmin = +(rawLocalStorage.getItem("is_a") ?? "") == 2;
  }

  getCartItemsCount() {
    let count = 0;
    for (let itemId in this.cart) {
      count += this.cart[itemId].count
    }
    return count
  }

  getCartItemCount(id: number) {
    let count = 0;
    for (let itemId in this.cart) {
      if (Number(itemId) == id)
        count += this.cart[itemId].count
    }
    return count
  }
}
