import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../models/item";
import {ItemService} from "../../../../services/item.service";

@Component({
  selector: 'app-store',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []

  constructor(
    private itemService: ItemService) { }

  async ngOnInit() {
    this.items = await this.itemService.refreshCache();
  }
}
