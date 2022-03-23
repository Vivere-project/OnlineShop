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

// Bootstrap app
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(ref => {
    const localStorageService = ref.injector.get(LocalStorageService);
    localStorageService.subscribe(localStorage => {
      if (localStorage.theme == "dark") {
        document.body.classList.add('dark-theme');
      }
      else {
        document.body.classList.remove('dark-theme');
      }

      // if (localStorage.locale !== 'en') {
        fetch('/assets/translations/' + localStorage.locale + '.json')
          .then((response) => {
            if (!response.ok) {
              throw new Error('HTTP error ' + response.status);
            }
            return response.json();
          })
          .then((json) => {
            // Load translation
            loadTranslations(json.translations);
            $localize.locale = json.locale;
          })
          .catch(error => {
            console.log(error)
          });
      // } else { }
    })
  })
  .catch((err) => console.error(err));
