import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Item} from "../../../../models/item";
import {ItemService} from "../../../../services/item.service";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item!: Item;
  count = 1;
  isCountValid = true;

  constructor(
    private itemService: ItemService,
    private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addItem(this.item)
  }

  addOne() {
    this.count ++;
  }

  dropOne() {
    if (this.count > 1)
      this.count --;
  }

  onCountChange(newValue: any) {
    this.isCountValid = !isNaN(Number(newValue)) && Number(newValue) > 0;
  }
}
