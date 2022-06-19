import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {LocalStorageService} from "./local-storage.service";
import {Cart, ItemCount} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private localStorageService: LocalStorageService) { }

  addItem(item: Item): void {
    this.addItems(item, 1);
  }

  addItems(item: Item, count: number): void {
    let cart = this.localStorageService._allStorage().cart;

    if (cart[item.id] != undefined) {
      cart[item.id].count += count;
      this.localStorageService.addToStorage("cart", JSON.stringify(cart))
    } else {
      let items = this.localStorageService._allStorage().itemsCache;
      items.forEach((item_: Item) => {
          cart[item_.id] = new ItemCount(item_, item_.id == item.id ? count : 0)
        });
      this.localStorageService.addToStorage("cart", JSON.stringify(cart));
    }
  }

  getCart(): Cart {
    let cart: Cart = {}
    this.localStorageService.subscribe(data => cart = data.cart)
    return cart;
  }

  removeItems(): void{
    let cart: Cart = {}
    this.localStorageService.subscribe(data => cart = data.cart);
    for (let itemId in cart)
        cart[itemId].count = 0;
    
    this.localStorageService.addToStorage("cart", JSON.stringify(cart));
  }
}
