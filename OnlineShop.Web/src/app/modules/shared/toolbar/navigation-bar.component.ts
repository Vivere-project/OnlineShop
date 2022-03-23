import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Constants} from "../constants";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-toolbar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  searchText = "";
  language = localStorage.getItem('locale') || 'en';
  theme = 'light';
  itemsInCartCount = new Observable<number>()
  isAdmin = new Observable<boolean>()

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.itemsInCartCount =
      this.localStorageService.pipe(map(data => Object.keys(data.cart).length));

    this.localStorageService.subscribe(localStorage => this.theme = localStorage.theme)
    this.isAdmin = this.localStorageService.pipe(map(data =>data.isAdmin))
  }

  changeLanguage(e:any){
    this.localStorageService.addToStorage('locale', e.target.value);
  }

  toggleDarkTheme(): void {
    if (this.theme != 'dark')
      this.localStorageService.addToStorage('theme', 'dark');
    else
      this.localStorageService.addToStorage('theme', 'light');
  }
}
