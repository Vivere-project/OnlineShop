import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./toolbar/navigation-bar.component";
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CartBadgeComponent } from './cart-badge/cart-badge.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    CarouselComponent,
    CartBadgeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent,
    CarouselComponent,
    CartBadgeComponent
  ]
})
export class SharedModule { }
