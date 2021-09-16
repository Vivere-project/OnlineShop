import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsComponent} from "./components/items/items.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ItemCardComponent} from "./components/item-card/item-card.component";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";
import {CartComponent} from "./components/cart/cart.component";
import {ShopRoutingModule} from "./shop-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    CartComponent,
    ContactComponent,
    ItemCardComponent,
    ItemDetailsComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    HttpClientModule,

  ]
})
export class ShopModule {
}
