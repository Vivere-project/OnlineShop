import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestItem} from "../models/request-item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>("api/item");
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`api/item/${id}`);
  }

  getItemPhoto(id: number): Observable<Blob> {
    return this.http.get(`api/item/image/${id}`,  { responseType: 'blob' });
  }

  createItem(item: RequestItem, image: File | null): Observable<Item> {
    let formItem = new FormData();
    formItem.append("name", item.name);
    formItem.append("description", item.description);
    formItem.append("price", item.price.toString());
    formItem.append("minimalBuyQuantity", item.minimalBuyQuantity.toString());
    formItem.append("quantityInStock", item.quantityInStock.toString());
    if (image != null)
      formItem.append("image", image);

    return this.http.post<Item>("api/item", formItem);
  }

  updateItem(id: number, item: RequestItem): Observable<Item> {
    return this.http.put<Item>(`api/item/${id}`, item,  { headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`api/item/${id}`);
  }

  updateFile(id: number, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);

    return this.http.post(`api/item/image/${id}`, formData);
  }
}
