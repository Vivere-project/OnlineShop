import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {loadTranslations} from "@angular/localize";

if (environment.production) {
  enableProdMode();
}


// Check localstorage for language and load the file
console.log('Localstorage locale', localStorage.getItem('locale'));
const locale = localStorage.getItem('locale') || 'en';

const theme = localStorage.getItem('theme') || 'light';

if (locale !== 'en') {
  fetch('/assets/translations/' + locale + '.json')
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

      // Bootstrap app
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    })
    .catch(error => {
      console.log(error)
      //Err
    });
} else {
  // Bootstrap app
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

if (theme == "dark") {
  document.body.classList.add('dark-theme');
}
else {
  document.body.classList.remove('dark-theme');
}
