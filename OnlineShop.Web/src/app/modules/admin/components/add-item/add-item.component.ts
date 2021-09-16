import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../models/item";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../../../services/item.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  chosenColor = ''
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
    colorName: new FormControl('colorName')
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemForm.patchValue({
      name: '',
      description: '',
      volume: null,
      price: '',
      minimalBuyQuantity: 1,
      quantityInStock: 1
    });

    this.imageToShow = "../../../assets/image-not-found.png";
  }

  submit(){
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
    this.itemService.createItem(
      {
        name: this.itemForm.get("name")?.value,
        description: this.itemForm.get("description")?.value,
        volume: +this.itemForm.get('volume')?.value,
        price: +this.itemForm.get("price")?.value ?? 0,
        quantityInStock: +this.itemForm.get("quantityInStock")?.value,
        minimalBuyQuantity: +this.itemForm.get("minimalBuyQuantity")?.value,
        color: colorObj,
      },
      this.fileToUpload
    ).subscribe(
      _ =>
        this.router.navigate(['admin'])
      ,
      error =>
        alert(error.error.errors.Name ?? error.error.errors.Price[0])
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

  handleFileInput(event:Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length)
      return;

    this.fileToUpload = input.files.item(0);
    if (this.fileToUpload == null)
      return;
    this.imageToShow = "../../../assets/loading.gif";
    // this.imageToShow = URL.createObjectURL(this.fileToUpload)
    this.createImageFromBlob(this.fileToUpload!);
  }

}
