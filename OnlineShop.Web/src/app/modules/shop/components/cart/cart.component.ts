import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {Item} from "../../../../models/item";
import {CartState} from "../../../../store/cart.store";
import {CartService} from "../../../../services/cart.service";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // @Select(CartState) items$!: Observable<Item[]>;

  items!: Item[];

  constructor(
    private store: Store,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // this.store.select(state => state.cart)
    //   .subscribe(res => this.items2$ = res);

    this.items = this.cartService.getItems();
  }

  buyItems() {
    this.orderService.makeOrder(this.items).subscribe();
    this.cartService.removeItems();
    this.items = this.cartService.getItems();
  }
}
