import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./components/items/items.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
    { path: '', component: ItemsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'item/:id', component: ItemDetailsComponent },
    { path: 'cart', component: CartComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopRoutingModule { }
