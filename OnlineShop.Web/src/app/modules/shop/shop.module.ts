import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsComponent} from "./components/items/items.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ItemCardComponent} from "./components/items/item-card/item-card.component";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";
import {CartComponent} from "./components/cart/cart.component";
import {ShopRoutingModule} from "./shop-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartItemComponent} from "./components/cart/cart-item/cart-item.component";

@NgModule({
  declarations: [
    CartComponent,
    ContactComponent,
    ItemCardComponent,
    ItemDetailsComponent,
    ItemsComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShopModule {
}
