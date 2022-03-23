import {Inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LOCAL_STORAGE} from "./tokens";
import {LocalStorage} from "../models/localStorage";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends Observable<LocalStorage> implements OnDestroy {
  private readonly _entireStorage$:BehaviorSubject<LocalStorage>
    = new BehaviorSubject(this._allStorage());

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {
    super( subscriber => {
      this._entireStorage$.subscribe(subscriber);
    })
  }

  ngOnDestroy() {
    this._entireStorage$.complete();
  }

  addToStorage(itName:string, itValue:string) {
    itName && itValue &&  this.localStorage.setItem(itName , itValue);
    this._entireStorage$.next(this._allStorage());
  }

  removeFromStorage(itName:string) {
    itName && this.localStorage.removeItem(itName);
    this._entireStorage$.next(this._allStorage());
  }

  private _allStorage(): LocalStorage {
    return new LocalStorage(this.localStorage);
  }
}
