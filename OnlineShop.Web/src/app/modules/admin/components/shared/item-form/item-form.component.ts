import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Item} from "../../../../../models/item";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestItem} from "../../../../../models/request-item";
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnChanges{

  @Input() item: Item = {
    id: 0,
    name: "",
    volume: null,
    description: "",
    price: 1,
    minimalBuyQuantity: 1,
    quantityInStock: 1000,
    color: null,
  };
  @Output() onSubmit = new EventEmitter<RequestItem>();

  chosenColor = '';

  itemForm = new FormGroup({
    name: new FormControl('name', Validators.required),
    description: new FormControl('description'),
    volume: new FormControl('volume'),
    price: new FormControl('price', Validators.min(1)),
    minimalBuyQuantity: new FormControl('minimalBuyQuantity', Validators.min(1)),
    quantityInStock: new FormControl('quantityInStock', Validators.min(0)),
    colorName: new FormControl('colorName')
  });

  constructor() {
  }

  ngOnInit() {
    this.patchItemForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.patchItemForm();
  }


  submit() {
    const colorObj =
      this.chosenColor != ''
        ? {
          name: this.itemForm.get("colorName")?.value != "" ? this.itemForm.get("colorName")?.value : this.chosenColor,
          colorHex: this.chosenColor,
        }
        : null

    this.onSubmit.emit({
      name: this.itemForm.get("name")?.value,
      description: this.itemForm.get("description")?.value,
      volume: this.itemForm.get('volume')?.value ?? null,
      price: +this.itemForm.get("price")?.value ?? 0,
      quantityInStock: +this.itemForm.get("quantityInStock")?.value,
      minimalBuyQuantity: +this.itemForm.get("minimalBuyQuantity")?.value,
      color: colorObj,
    })
  }

  private patchItemForm() {
    this.itemForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      volume: this.item.volume,
      price: this.item.price,
      minimalBuyQuantity: this.item.minimalBuyQuantity,
      quantityInStock: this.item.quantityInStock,
      colorName: this.item.color?.name ?? ""
    });
    this.chosenColor = this.item.color?.colorHex ?? "";
  }
}
