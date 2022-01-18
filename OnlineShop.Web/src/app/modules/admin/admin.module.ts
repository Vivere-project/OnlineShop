import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsComponent} from './components/items/items.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {ItemCardComponent} from './components/item-card/item-card.component';
import {EditItemComponent} from './components/edit-item/edit-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AddItemComponent} from './components/add-item/add-item.component';
import {ColorPickerModule} from "ngx-color-picker";
import { ItemFormComponent } from './components/shared/item-form/item-form.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ItemsComponent,
    ItemCardComponent,
    EditItemComponent,
    AddItemComponent,
    ItemFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ColorPickerModule,
    SharedModule
  ]
})
export class AdminModule {
}
