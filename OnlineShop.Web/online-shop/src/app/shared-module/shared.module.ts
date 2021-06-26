import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./toolbar/navigation-bar.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavigationBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class SharedModule { }
