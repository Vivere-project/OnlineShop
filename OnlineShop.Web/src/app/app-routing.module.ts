import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./modules/shop/components/items/items.component";
import {ContactComponent} from "./modules/shop/components/contact/contact.component";
import {ItemDetailsComponent} from "./modules/shop/components/item-details/item-details.component";
import {CartComponent} from "./modules/shop/components/cart/cart.component";

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
  },
  { path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
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
