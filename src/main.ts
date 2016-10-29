import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

if (environment.apiKey === 'YOUR_API_KEY') {
  alert('You need to add an apiKey to environment.ts');
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
