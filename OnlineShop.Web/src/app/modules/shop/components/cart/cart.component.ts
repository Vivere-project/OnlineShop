import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../../services/cart.service";
import {OrderService} from "../../../../services/order.service";
import {ItemCount} from "../../../../models/cart";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../../../models/contact";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemCounts: ItemCount[] = [];
  isCartEmpty = false;
  contact: Contact = {fullName: "", email: "", phoneNumber:""}
  contactForm = new FormGroup({
    fullName: new FormControl('fullName', Validators.required),
    phoneNumber: new FormControl('phoneNumber'),
    email: new FormControl('email'),
  });

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.itemCounts = Object.values(this.cartService.getCart()).filter(i => i.count !== 0);
    this.isCartEmpty = this.itemCounts.every(i => i.count === 0);
    this.patchContact();
  }

  buyItems() {
    this.orderService.makeOrder(this.itemCounts.map(i => i.item)).subscribe();
    this.cartService.removeItems();
  }

  patchContact() {
    this.contactForm.patchValue({
      fullName: this.contact.fullName,
      phoneNumber: this.contact.phoneNumber,
      email: this.contact.email
    });
  }
}
