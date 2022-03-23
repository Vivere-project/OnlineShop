import {Item} from "./item";

export class ItemCount {
  item: Item;
  count: number;

  constructor(item: Item, count: number) {
    this.item = item;
    this.count = count;
  }

}

export type Cart = {[id: number]: ItemCount};
