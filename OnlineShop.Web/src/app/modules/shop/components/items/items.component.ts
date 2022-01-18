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

  constructor(
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }
}
