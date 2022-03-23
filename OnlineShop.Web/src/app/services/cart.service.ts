import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable, of} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {Cart} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) { }

  addItem(item: Item): void {
    let cart: Cart = []
    this.localStorageService.subscribe(data => cart = data.cart);
    if (cart[item.id]) {
      cart[item.id].count += 1;
      this.localStorageService.addToStorage("cart", JSON.stringify(cart))
    } else {
      this.localStorageService.subscribe(data => {
        // cart = (JSON.parse(data.get('items') ?? "") as Item[]).map(item => {iditem.id: item})
        this.localStorageService.addToStorage("cart", JSON.stringify([item]))
      })
    }
  }

  addItems(item: Item, count: number): void {
    let cart: Cart = []
    this.localStorageService.subscribe(data => cart = data.cart)
    if (Object.keys(cart).length != 0) {
      this.localStorageService.addToStorage("cart", JSON.stringify(item))
    } else {
      this.localStorageService.addToStorage("cart", JSON.stringify([item]))
    }
  }

  getItems(): Cart {
    let cart: Cart = []
    this.localStorageService.subscribe(data => cart = data.cart)
    if (Object.keys(cart).length != 0){
      return cart;
    } else {
      return [];
    }
  }

  removeItems(): void{
    this.localStorageService.removeFromStorage('cart')
    // localStorage.setItem('cart', "");
  }
}
