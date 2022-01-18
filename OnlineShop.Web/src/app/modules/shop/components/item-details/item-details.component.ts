import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../models/item";
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "../../../../services/item.service";
import {Cart} from "../../../../store/cart.action";
import AddItem = Cart.AddItem;
import {Store} from "@ngxs/store";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: Item = new Item();
  imageToShow: any;
  isImageLoading: boolean = false;
  itemsInCartCount: number = 0

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private store: Store,
    private cartService: CartService) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(itemId).subscribe(item =>
      {
        this.item = item;
        this.showImage()
      }
    );
  }

  addItemToCart() {
    // this.store.dispatch(new AddItem(this.item)).subscribe(_ => alert("Add to cart succeeded"));
    this.cartService.addItem(this.item);
  }

  showImage(){
    this.itemService.getItemPhoto(this.item.id)
      .subscribe(image =>
        {
          this.imageToShow = image
        },
        error => {
         console.log(error)
        }
      )
  }
}
