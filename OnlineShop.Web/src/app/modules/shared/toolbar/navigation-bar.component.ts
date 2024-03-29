import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-toolbar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  idProd = true;
  searchText = "";
  language = localStorage.getItem('locale') || 'en';
  theme = 'light';
  itemsInCartCount = new Observable<number>()
  isAdmin = new Observable<boolean>()

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {
    this.idProd = environment.production;
  }

  ngOnInit(): void {
    this.itemsInCartCount =
      this.localStorageService.pipe(map(data => data.getCartItemsCount()));

    this.localStorageService.subscribe(localStorage => this.theme = localStorage.theme)
    this.isAdmin = this.localStorageService.pipe(map(data =>data.isAdmin))
  }

  changeLanguage(e:any){
    this.localStorageService.addToStorage('locale', e.target.value);
    location.reload();
  }

  toggleDarkTheme(): void {
    if (this.theme != 'dark')
      this.localStorageService.addToStorage('theme', 'dark');
    else
      this.localStorageService.addToStorage('theme', 'light');
  }
}
