import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./shop-module/components/items/items.component";
import {ContactComponent} from "./shop-module/components/contact/contact.component";
import {ItemDetailsComponent} from "./shop-module/components/item-details/item-details.component";
import {CartComponent} from "./shop-module/components/cart/cart.component";

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin',
    loadChildren: () => import('./admin-module/admin.module').then(m => m.AdminModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
