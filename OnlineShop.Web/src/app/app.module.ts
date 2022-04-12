import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {CartState} from "./store/cart.store";
import {AdminModule} from "./modules/admin/admin.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShopModule} from "./modules/shop/shop.module";
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
    NgxsModule.forRoot([CartState], {
      developmentMode: !environment.production
    }),
    AdminModule,
    ShopModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    // When loading translation at runtime we need to set locale manually
    { provide: LOCALE_ID, useValue: localStorage.getItem('locale') || 'en' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
