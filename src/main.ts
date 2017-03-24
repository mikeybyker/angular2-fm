import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.apiKey === 'YOUR_API_KEY') {
  alert('You need to add an apiKey to environment.ts');
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
