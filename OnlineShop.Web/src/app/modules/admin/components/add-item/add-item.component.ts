import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../models/item";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../../../services/item.service";
import {RequestItem} from "../../../../models/request-item";

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {

    this.imageToShow = "../../../assets/image-not-found.png";
  }

  parseError(error: any) {
    if (error?.error?.errors != null) {
      for (let error_ in error.error.errors){
        console.log(error)
        alert(error_)
      }
    }
  }

  submit(event: RequestItem){
    this.itemService.createItem(
      event,
      this.fileToUpload
    ).subscribe(
      _ =>
        this.router.navigate(['admin'])
      ,
      error =>
        this.parseError(error)
        // alert(error.error.errors.Name ?? error.error.errors.Price[0])
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
