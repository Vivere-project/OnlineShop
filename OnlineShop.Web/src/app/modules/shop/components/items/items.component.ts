import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../models/item";
import {ItemService} from "../../../../services/item.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-store',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []
  itemsInCartCount: number = 0

  constructor(
    private itemService: ItemService,
    private httpClient: HttpClient,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
    this.itemsInCartCount = this.cartService.getItemsCount();
    this.httpClient.get('https://jsonip.com').subscribe(
      (value:any) => {
        console.log(value);
        // this.userIP = value.ip;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getIpAddress() {
    fetch('https://jsonip.com', { mode: 'cors' })
      .then((resp) => resp.json())
      .then((ip) => {
        console.log(ip);
      });
  }
}
