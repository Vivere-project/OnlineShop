import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './components/items/items.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { ItemCardComponent } from './components/item-card/item-card.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemCardComponent,
    EditItemComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
