import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../../../models/item";
import {RequestItem} from "../../../../models/request-item";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  isLoading = true;
  item: Item = {
    id: 0,
    name: "loading..",
    volume: null,
    description: "loading..",
    hasPhoto: false,
    price: 0,
    minimalBuyQuantity: 1,
    quantityInStock: 0,
    color: null,
  }
  file: any;
  fileToUpload: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(itemId).subscribe(item =>
      {
        this.item = item;
        if (this.item.hasPhoto)
          this.showImage(this.item);
        else
          this.isLoading = false;
      }
    );
  }

  submit(event: RequestItem){
    this.itemService.updateItem(this.item.id, event).subscribe(_ => alert("Update succeeded"));
  }

  showImage(item: Item) {
    this.itemService.getItemPhoto(item.id).subscribe(itemImage => {
      this.file = itemImage
    }, error => {
      console.log(error);
    });
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length)
      return;
    this.fileToUpload = input.files.item(0);
    if (this.fileToUpload == null)
      return;

    this.itemService.updateFile(this.item.id, this.fileToUpload)
      .subscribe(_ => this.showImage(this.item));
  }
}
