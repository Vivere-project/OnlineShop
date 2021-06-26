import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item} from "../models/item";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  makeOrder(items: Item[]): Observable<any> {
    return this.http.post("api/order", items);
  }
}
