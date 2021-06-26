import { Injectable } from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {Item} from "../models/item";
import {Cart} from "./cart.action";
import AddItem = Cart.AddItem;

@State<Item[]>({
  name: 'cart',
  defaults: []
})

@Injectable()
export class CartState {

  @Action(AddItem)
  addItem(ctx: StateContext<Item[]>, { payload }: AddItem) {
    const state = ctx.getState();
    ctx.setState([
      ...state,
      payload
    ]);
  }

}
