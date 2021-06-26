import { Component, OnInit } from '@angular/core';
import {Item} from "../../../models/item";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-store',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  openItemDetails() {

  }
}
