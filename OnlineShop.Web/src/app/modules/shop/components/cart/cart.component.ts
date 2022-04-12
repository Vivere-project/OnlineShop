import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {Item} from "../../../../models/item";
import {CartState} from "../../../../store/cart.store";
import {CartService} from "../../../../services/cart.service";
import {OrderService} from "../../../../services/order.service";
import {Cart, ItemCount} from "../../../../models/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemCounts: ItemCount[] = [];

  constructor(
    private store: Store,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.itemCounts = Object.values(this.cartService.getCart());
  }

  buyItems() {
    this.orderService.makeOrder(this.itemCounts.map(i => i.item)).subscribe();
    this.cartService.removeItems();
    // this.items = this.cartService.getItems();
  }
}
