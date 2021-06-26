import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemsComponent } from './shop-module/components/items/items.component';
import { ContactComponent } from './shop-module/components/contact/contact.component';
import { ItemCardComponent } from './shop-module/components/item-card/item-card.component';
import {HttpClientModule} from "@angular/common/http";
import { ItemDetailsComponent } from './shop-module/components/item-details/item-details.component';
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import { CartComponent } from './shop-module/components/cart/cart.component';
import {CartState} from "./store/cart.store";
import {AdminModule} from "./admin-module/admin.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared-module/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ContactComponent,
    ItemCardComponent,
    ItemDetailsComponent,
    CartComponent
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
