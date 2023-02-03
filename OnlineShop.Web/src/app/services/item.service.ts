import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RequestItem} from "../models/request-item";
import {LocalStorageService} from "./local-storage.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {
  }

  hashCode(str: string, salt: string): number {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i) + salt.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }

  async refreshCache(): Promise<Item[]> { // TODO: Make the cache temporary
    this.localStorageService.removeFromStorage("itemsCache");
    return this.getItems();
  }

  async getItems(): Promise<Item[]> {
    let itemList = this.localStorageService._allStorage().itemsCache;
    if (itemList.length == 0) {
      itemList = await this.http.get<Item[]>(`${this.baseUrl}/item`).toPromise();
      this.localStorageService.addToStorage("itemsCache", JSON.stringify(itemList));
    }
    return itemList;
  }

  getItem(id: number): Observable<Item> {
    let item
    this.localStorageService.subscribe(data => item = data.itemsCache.find(item => item.id === id))

    return this.http.get<Item>(`${this.baseUrl}/item/${id}`);
  }

  getItemPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/item/${id}/image`,  { responseType: 'blob' });
  }

  createItem(item: RequestItem, image: File | null): Observable<Item> {
    let formItem = new FormData();
    formItem.append("itemRequest", JSON.stringify(item));
    if (image != null)
      formItem.append("image", image);

    return this.http.post<Item>(`${this.baseUrl}/item`, formItem);
  }

  updateItem(id: number, item: RequestItem): Observable<Item> {
    // this.http.post<Item>(`${this.baseUrl}/item/${id}`, item).subscribe();
    return this.http.put<Item>(`${this.baseUrl}/item/${id}`, item);
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.baseUrl}/item/${id}`);
  }

  updateFile(id: number, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);

    return this.http.post(`${this.baseUrl}/item/image/${id}`, formData);
  }
}
