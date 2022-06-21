import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {Item} from "../../../../models/item";
import {CartState} from "../../../../store/cart.store";
import {CartService} from "../../../../services/cart.service";
import {OrderService} from "../../../../services/order.service";
import {Cart, ItemCount} from "../../../../models/cart";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../../../models/contact";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemCounts: ItemCount[] = [];
  contact: Contact = {fullName: "", email: "", phoneNumber:""}
  contactForm = new FormGroup({
    fullName: new FormControl('fullName', Validators.required),
    phoneNumber: new FormControl('phoneNumber'),
    email: new FormControl('email'),
  });

  constructor(
    private store: Store,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.itemCounts = Object.values(this.cartService.getCart()).filter(i => i.count !== 0);
    this.patchContact(this.contact);
  }

  buyItems() {
    this.orderService.makeOrder(this.itemCounts.map(i => i.item)).subscribe();
    this.cartService.removeItems();
    // this.items = this.cartService.getItems();
  }

  patchContact(contact: Contact) {
    this.contactForm.patchValue({
      fullName: this.contact.fullName,
      phoneNumber: this.contact.phoneNumber,
      email: this.contact.email
    });
  }
}
