import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {CartState} from "./store/cart.store";
import {AdminModule} from "./modules/admin/admin.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./modules/shared/shared.module";
import {ShopModule} from "./modules/shop/shop.module";

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
    ShopModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
