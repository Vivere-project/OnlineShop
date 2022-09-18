import {Component, OnInit} from '@angular/core';
import {Item} from "../../../../models/item";
import {ItemService} from "../../../../services/item.service";

@Component({
  selector: 'app-store',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  $items: Promise<Item[]> | null = null;
  items: Item[] = [];

  constructor(
    private itemService: ItemService) { }

  async ngOnInit() {
    this.$items = this.itemService.refreshCache().then(s => this.items = s);
  }

}
