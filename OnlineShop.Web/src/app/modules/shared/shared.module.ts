import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./toolbar/navigation-bar.component";
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CartBadgeComponent } from './cart-badge/cart-badge.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { AlertComponent } from './alert/alert.component';
import {FormsModule} from "@angular/forms";
import { BaseItemCardComponent } from './base-item-card/base-item-card.component';
import { ColorCircleComponent } from './color-circle/color-circle.component';
import { CountInputComponent } from './count-input/count-input.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    CarouselComponent,
    CartBadgeComponent,
    ImageViewerComponent,
    AlertComponent,
    BaseItemCardComponent,
    ColorCircleComponent,
    CountInputComponent,
    // NgbModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent,
    CarouselComponent,
    CartBadgeComponent,
    ImageViewerComponent,
    AlertComponent,
    BaseItemCardComponent
  ]
})
export class SharedModule { }
