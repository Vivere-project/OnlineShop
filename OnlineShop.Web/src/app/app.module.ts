import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from './modules/shop/components/items/items.component';
import { ContactComponent } from './modules/shop/components/contact/contact.component';
import { ItemCardComponent } from './modules/shop/components/item-card/item-card.component';
import {HttpClientModule} from "@angular/common/http";
import { ItemDetailsComponent } from './modules/shop/components/item-details/item-details.component';
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import { CartComponent } from './modules/shop/components/cart/cart.component';
import {CartState} from "./store/cart.store";
import {AdminModule} from "./modules/admin/admin.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./modules/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    NgxsModule.forRoot([CartState], {
      developmentMode: !environment.production
    }),
    AdminModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
