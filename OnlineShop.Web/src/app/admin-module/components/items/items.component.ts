import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../services/item.service";
import {Item} from "../../../models/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

}
