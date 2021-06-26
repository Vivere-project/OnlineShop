import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./components/items/items.component";
import {EditItemComponent} from "./components/edit-item/edit-item.component";
import {AddItemComponent} from "./components/add-item/add-item.component";

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'edit-item/:id', component: EditItemComponent },
  { path: 'add-item', component: AddItemComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
