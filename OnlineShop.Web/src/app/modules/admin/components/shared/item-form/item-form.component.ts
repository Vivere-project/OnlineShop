import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Item} from "../../../../../models/item";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestItem} from "../../../../../models/request-item";
import { Output, EventEmitter } from '@angular/core';
import {AlertService} from "../../../../shared/alert/alert.service";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnChanges{

  @Input() item: Item = new Item();
  @Output() onSubmit = new EventEmitter<RequestItem>();

  chosenColor = '';

  itemForm = new FormGroup({
    name: new FormControl('name', Validators.required),
    description: new FormControl('description',),
    volume: new FormControl('volume'),
    price: new FormControl('price'),
    minimalBuyQuantity: new FormControl('minimalBuyQuantity'),
    quantityInStock: new FormControl('quantityInStock'),
    colorName: new FormControl('colorName')
  });

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.patchItemForm();
  }

  submit() {
    if(this.itemForm.invalid) {
        this.alertService.error($localize`The form is not valid`, this.alertOptions);
      return
    }

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
