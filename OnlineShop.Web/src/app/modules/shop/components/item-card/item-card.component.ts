import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../models/item";
import {ItemService} from "../../../../services/item.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() item!: Item;
  imageToShow: any;
  isImageLoading: boolean = true;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.showImage();
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
