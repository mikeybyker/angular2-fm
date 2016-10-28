import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { LastFMConfig } from './app/lastfm.config';

if (environment.production) {
  enableProdMode();
}
// if(LastFMConfig[0].useValue.api_key === 'YOUR_API_KEY'){
if (environment.apiKey === 'YOUR_API_KEY') {
  // alert('You need to add an api_key to lastfm.config.ts');
  alert('You need to add an api_key to environment.ts');
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
