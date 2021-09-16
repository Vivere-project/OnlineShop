import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addItem(item: Item): void {
    const itemListString = localStorage.getItem("cart");
    if (itemListString) {
      const itemList: Item[] = JSON.parse(itemListString);
      localStorage.setItem('cart', JSON.stringify(itemList.concat(item)));
    } else {
      localStorage.setItem('cart', JSON.stringify([item]));
    }
  }

  getItems(): Item[] {
    const itemListString = localStorage.getItem("cart");
    if (itemListString){
      return JSON.parse(itemListString);
    } else {
      return [];
    }
  }

  getItemsCount(): number {
    let itemListString = localStorage.getItem("cart");
    if (itemListString){
      return JSON.parse(itemListString).length;
    } else {
      return 0;
    }
  }

  removeItems(): void{
    localStorage.setItem('cart', "");
  }
}
