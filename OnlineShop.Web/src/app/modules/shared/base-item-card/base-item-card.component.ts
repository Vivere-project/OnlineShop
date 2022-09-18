import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../models/item";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-base-item-card',
  templateUrl: './base-item-card.component.html',
  styleUrls: ['./base-item-card.component.scss']
})
export class BaseItemCardComponent implements OnInit {

  @Input() item?: Item;
  imageToShow: any = undefined;
  isImageLoading: boolean = true;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.showImage();
  }

  showImage() {
    if (this.item && this.item.hasPhoto) {
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
