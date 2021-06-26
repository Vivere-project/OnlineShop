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

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getImageFromService();
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
      this.imageToShow = "../../../assets/image-not-found.png";
      console.log(error);
    });
  }
}
