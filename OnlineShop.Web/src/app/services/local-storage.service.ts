import {Inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LOCAL_STORAGE} from "./tokens";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends Observable<Map<string, string>> implements OnDestroy {
  private readonly _entireStorage$:BehaviorSubject<Map<string, string>>
    = new BehaviorSubject(this._allStorage());


  constructor(@Inject(LOCAL_STORAGE) private _localStorage: Storage) {
    super( subscriber => {
      this._entireStorage$.subscribe(subscriber);
    })
  }


  ngOnDestroy(){
    this._entireStorage$.complete();
  }

  addToStorage(itName:string, itValue:string){
    itName && itValue &&  this._localStorage.setItem(itName , itValue);
    this._entireStorage$.next(this._allStorage());
  }

  removeFromStorage(itName:string){
    itName && this._localStorage.removeItem(itName);
    this._entireStorage$.next(this._allStorage());
  }

  private  _allStorage():Map<string, string> {
    let values = new Map(),
      keys = Object.keys(this._localStorage),
      i = keys.length;
    while ( i-- ) {
      values.set( keys[i], this._localStorage.getItem(keys[i]) );
    }
    return values;
  }
}
