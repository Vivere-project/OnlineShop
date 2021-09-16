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

  item: Item = {
    id: 0,
    name: "loading..",
    description: "loading..",
    volume: null,
    price: 0,
    minimalBuyQuantity: 0,
    quantityInStock: 0,
    color: null,
  };
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
        this.getImageFromService();
      }
    );
    this.itemsInCartCount = this.cartService.getItemsCount();
  }

  addItemToCart() {
    // this.store.dispatch(new AddItem(this.item)).subscribe(_ => alert("Add to cart succeeded"));
    this.cartService.addItem(this.item);
    this.itemsInCartCount = this.cartService.getItemsCount();
  }

  createImageFromBlob(image: Blob) { // Todo: these two methods repeat in multiple components
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() { // Todo: these two methods repeat in multiple components
    this.isImageLoading = true;
    this.itemService.getItemPhoto(this.item.id).subscribe(data => {
      this.createImageFromBlob(data)
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
      this.imageToShow = "../../../assets/image-not-found.png";
    });
  }
}
