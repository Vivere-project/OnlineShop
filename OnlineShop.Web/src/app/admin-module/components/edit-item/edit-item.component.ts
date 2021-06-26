import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemService} from "../../../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../../models/item";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item: Item = {id: 0, name: "loading..", description: "loading..", price: 0, minimalBuyQuantity: 0, quantityInStock: 0};
  imageToShow: any;
  isImageLoading: boolean = false
  fileToUpload: File | null = null;

  itemForm = new FormGroup({
    name: new FormControl('name'),
    description: new FormControl('description'),
    price: new FormControl('price'),
    minimalBuyQuantity: new FormControl('minimalBuyQuantity'),
    quantityInStock: new FormControl('quantityInStock')
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
          price: item.price,
          minimalBuyQuantity: item.minimalBuyQuantity,
          quantityInStock: item.quantityInStock
        });
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
    this.itemService.updateItem(this.item.id,
      {
        name: this.itemForm.get("name")?.value,
        description: this.itemForm.get("description")?.value,
        price: +this.itemForm.get("price")?.value,
        quantityInStock: +this.itemForm.get("quantityInStock")?.value,
        minimalBuyQuantity: +this.itemForm.get("minimalBuyQuantity")?.value,
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
