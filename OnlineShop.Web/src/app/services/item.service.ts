import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestItem} from "../models/request-item";
import {LocalStorageService} from "./local-storage.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getItems(): Observable<Item[]> {
    let itemList = []
    this.localStorageService.subscribe(data => itemList = data.itemsCache)
    if (itemList.length != 0) {
      return this.localStorageService.pipe(map(data => data.itemsCache));
    } else {
      this.http.get<Item[]>("api/item").subscribe(data =>
        this.localStorageService.addToStorage("itemsCache", JSON.stringify(data)));
      return this.localStorageService.pipe(map(data => data.itemsCache));
    }
  }

  getItem(id: number): Observable<Item> {
    let item
    this.localStorageService.subscribe(data => item = data.itemsCache.find(item => item.id === id))

    return this.http.get<Item>(`api/item/${id}`);
  }

  getItemPhoto(id: number): Observable<Blob> {
    return this.http.get(`api/item/image/${id}`,  { responseType: 'blob' });
  }

  /// Adds every property of item separately!
  createItem(item: RequestItem, image: File | null): Observable<Item> {
    let formItem = new FormData();
    formItem.append("itemRequest", JSON.stringify(item));
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
