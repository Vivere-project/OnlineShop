import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {loadTranslations} from "@angular/localize";
import {LocalStorageService} from "./app/services/local-storage.service";

if (environment.production) {
  enableProdMode();
}

// Check localstorage for language and load the file
console.log('Localstorage locale', localStorage.getItem('locale'));
const locale = localStorage.getItem('locale') || 'ro';

fetch('/assets/translations/' + locale + '.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then((json) => {
    loadTranslations(json.translations);
    $localize.locale = json.locale;

    // Bootstrap app
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then(ref => {
        const localStorageService = ref.injector.get(LocalStorageService); //get instance of LocalStorageService
        localStorageService.subscribe(localStorage => {
          if (localStorage.theme == "dark")
            document.body.classList.add('dark-theme');
          else
            document.body.classList.remove('dark-theme');
        })
      })
      .catch((err) => console.error(err));
  })
  .catch(error => console.log(error));
