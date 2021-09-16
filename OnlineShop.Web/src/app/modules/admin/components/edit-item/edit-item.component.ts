import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemService} from "../../../../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {Item, ItemColor} from "../../../../models/item";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  chosenColor = '';

  item: Item = {
    id: 0,
    name: "loading..",
    volume: null,
    description: "loading..",
    price: 0,
    minimalBuyQuantity: 0,
    quantityInStock: 0,
    color: null,
  };
  imageToShow: any;
  isImageLoading: boolean = false
  fileToUpload: File | null = null;

  itemForm = new FormGroup({
    name: new FormControl('name'),
    description: new FormControl('description'),
    volume: new FormControl('volume'),
    price: new FormControl('price'),
    minimalBuyQuantity: new FormControl('minimalBuyQuantity'),
    quantityInStock: new FormControl('quantityInStock'),
    colorName: new FormControl("colorName"),
  });

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(itemId).subscribe(item =>
      {
        this.item = item;
        this.getImageFromService(this.item);
        this.itemForm.patchValue({
          name: item.name,
          description: item.description,
          volume: item.volume,
          price: item.price,
          minimalBuyQuantity: item.minimalBuyQuantity,
          quantityInStock: item.quantityInStock,
          colorHex: item.color?.colorHex,
          colorName: item.color?.name,
        });
        this.chosenColor = this.item.color?.colorHex ?? '';
      }
    );
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

  editItemSubmit() {
    const colorObj =
      this.chosenColor != ''
      ? {
          name: this.itemForm.get("colorName")?.value,
          colorHex: this.chosenColor,
        }
      : null

    if (colorObj != null && colorObj.name == '') {
      colorObj.name = colorObj.colorHex
    }

    this.itemService.updateItem(this.item.id,
      {
        name: this.itemForm.get("name")?.value,
        description: this.itemForm.get("description")?.value,
        volume: +this.itemForm.get('volume')?.value,
        price: +this.itemForm.get("price")?.value,
        quantityInStock: +this.itemForm.get("quantityInStock")?.value,
        minimalBuyQuantity: +this.itemForm.get("minimalBuyQuantity")?.value,
        color: colorObj,
      }).subscribe(_ => alert("Update succeeded"));
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length)
      return;

    this.imageToShow = "../../../assets/loading.gif";
    this.fileToUpload = input.files.item(0);
    if (this.fileToUpload == null)
      return;

    this.itemService.updateFile(this.item.id, this.fileToUpload)
      .subscribe(_ => this.createImageFromBlob(this.fileToUpload!));
  }
}
