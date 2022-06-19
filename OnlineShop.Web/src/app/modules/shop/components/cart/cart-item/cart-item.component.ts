import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Item} from "../../../../../models/item";
import {ItemService} from "../../../../../services/item.service";
import {CartService} from "../../../../../services/cart.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../../../../services/local-storage.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item!: Item;
  @Input() count = 1;
  isCountValid = true;
  countAdded = new Observable<number>();
  imageToShow: any;
  isImageLoading: boolean = true;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.countAdded = this.localStorageService.pipe(map(localStorage => localStorage.getCartItemCount(this.item.id)))
    this.showImage();
  }

  addToCart() {
    this.cartService.addItems(this.item, this.count);
  }

  counterAddOne() {
    this.count ++;
  }

  counterDropOne() {
    if (this.count > 1)
      this.count --;
  }

  onCountChange(newValue: any) {
    this.isCountValid = !isNaN(Number(newValue)) && (Number(newValue) > 0);
    if (this.isCountValid)
      this.count = Number(newValue);
  }

  showImage() {
    if (this.item.hasPhoto) {
      this.itemService.getItemPhoto(this.item.id)
        .subscribe(image =>
          {
            this.imageToShow = image
          },
          error => {
            this.isImageLoading = false;
            console.log("no image found");
          })
    } else {
      this.isImageLoading = false;
    }
  }
}
