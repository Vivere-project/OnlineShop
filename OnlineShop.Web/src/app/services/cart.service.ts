import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable, of} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private localStorageService: LocalStorageService) { }

  addItem(item: Item): void {
    let itemListString = ""
    this.localStorageService.subscribe(data => itemListString = data.get('cart') ?? "")
    if (itemListString) {
      const itemList: Item[] = JSON.parse(itemListString);
      this.localStorageService.addToStorage("cart", JSON.stringify(itemList.concat(item)))
    } else {
      this.localStorageService.addToStorage("cart", JSON.stringify([item]))
    }
  }

  getItems(): Item[] {
    let itemListString = ""
    this.localStorageService.subscribe(data => itemListString = data.get('cart') ?? "")
    if (itemListString){
      return JSON.parse(itemListString);
    } else {
      return [];
    }
  }

  removeItems(): void{
    this.localStorageService.removeFromStorage('cart')
    // localStorage.setItem('cart', "");
  }
}
