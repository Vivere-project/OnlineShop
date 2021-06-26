import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../models/item";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() item!: Item;
  imageToShow: any;
  isImageLoading: boolean = false;
  isCreateNewItemCard = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // if (this.item === undefined) {
    //   this.isCreateNewItemCard = true
    // } else {
      this.getImageFromService(this.item);
    // }
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

  getImageFromService(item: Item) { // Todo: these two methods repeat in multiple components
    this.isImageLoading = true;
    this.itemService.getItemPhoto(item.id).subscribe(data => {
      this.createImageFromBlob(data)
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      this.imageToShow = "../../../assets/image-not-found.png";
      console.log(error);
    });
  }

  deleteItem() {
    this.itemService.deleteItem(this.item.id).subscribe(_ =>
    {
      alert("Delete succeeded");
    });
  }
}
