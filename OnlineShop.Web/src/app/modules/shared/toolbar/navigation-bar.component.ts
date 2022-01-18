import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-toolbar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  language = localStorage.getItem('locale') || 'en';
  theme = localStorage.getItem('theme') || 'light';
  itemsInCartCount = new Observable<number>()


  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // this.itemsInCartCount = this.cartService.getItemsCount();
    this.itemsInCartCount =
      this.localStorageService.pipe(map(data =>
    {
      console.log(data)
      if (data.get("cart"))
        return JSON.parse(data.get("cart")!).length ?? 0;
    }));
  }

  changeLanguage(e:any){
    localStorage.setItem('locale', e.target.value);
    window.open('/', '_self');
  }

  toggleDarkTheme(): void {
    if (this.theme != 'dark')
      localStorage.setItem('theme', 'dark');
    else
      localStorage.setItem('theme', 'light');
    window.open('/', '_self');
  }
}
