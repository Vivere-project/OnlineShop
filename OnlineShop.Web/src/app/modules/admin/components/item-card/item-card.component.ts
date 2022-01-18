import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Output() refreshItemsEvent = new EventEmitter();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    if (this.item.hasPhoto) {
      this.showPhoto(this.item);
    } else {
      this.isImageLoading = false;
    }
  }

  showPhoto(item: Item) {
    this.itemService.getItemPhoto(item.id).subscribe(image => {
        this.imageToShow = image
      }, error => {
        console.log(error) // Todo: add norma error banners
      }
    )
  }

  deleteItem() {
    this.itemService.deleteItem(this.item.id).subscribe(_ =>
    {
      alert("Delete succeeded");
      this.refreshItemsEvent.emit()
    });
  }
}
