import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Item} from "../../../../../models/item";
import {ItemService} from "../../../../../services/item.service";
import {CartService} from "../../../../../services/cart.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../../../../services/local-storage.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item!: Item;
  countToAdd = 1;
  isCountValid = true;
  countAdded = new Observable<number>();

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.countToAdd = this.item.minimalBuyQuantity ?? 1;
    this.countAdded = this.localStorageService.pipe(map(localStorage => localStorage.getCartItemCount(this.item.id)))
  }

  addToCart() {
    this.cartService.addItems(this.item, this.countToAdd);
  }

  counterAddOne() {
    this.countToAdd ++;
  }

  counterDropOne() {
    if (this.countToAdd >  1)
      this.countToAdd --;
  }

  onCountChange(newValue: any) {
    this.isCountValid = !isNaN(Number(newValue)) && (Number(newValue) > 0);
    if (this.isCountValid)
      this.countToAdd = Number(newValue);
  }
}
