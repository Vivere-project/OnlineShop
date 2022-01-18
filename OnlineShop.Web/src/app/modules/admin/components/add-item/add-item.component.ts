import { Component, OnInit } from '@angular/core';
import {Item} from "../../../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../../../services/item.service";
import {RequestItem} from "../../../../models/request-item";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  item: Item = new Item();
  file: any;
  isImageLoading: boolean = false
  fileToUpload: File | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
  }

  parseError(error: any) {
    if (error?.error?.errors != null) {
      for (let error_ in error.error.errors){
        // console.log(error)
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
        this.router.navigate(['admin']),
      error =>
        this.parseError(error)
    );
  }

  handleFileInput(event:Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length)
      return;

    this.fileToUpload = input.files.item(0);
    if (this.fileToUpload == null)
      return;
  }
}
