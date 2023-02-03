import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../models/item";
import {ItemService} from "../../../services/item.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-base-item-card',
  templateUrl: './base-item-card.component.html',
  styleUrls: ['./base-item-card.component.scss']
})
export class BaseItemCardComponent implements OnInit {

  @Input() item!: Item;
  imageToShow: any;
  isImageLoading: boolean = true;

  constructor(
      private itemService: ItemService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.showImage();
  }

  goToItemDetails() {
    this.router.navigate(['/item', this.item.id]);
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

  displayVolume(item: Item) {
    return item.volume?.endsWith('L') ? item.volume : item.volume + 'L'
  }
}
