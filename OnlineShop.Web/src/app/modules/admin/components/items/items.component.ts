import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../../services/item.service";
import {Item} from "../../../../models/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []

  constructor(private itemService: ItemService) { }

  async ngOnInit(): Promise<void> {
    await this.refreshItems()
  }

  async refreshItems() {
    this.items = await this.itemService.refreshCache();
  }

}
