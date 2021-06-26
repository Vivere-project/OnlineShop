import {Item} from "../models/item";

export namespace Cart {
  export class AddItem {
    static readonly type = '[Cart] Add Item';
    constructor(public payload: Item) {
    }
  }
}
