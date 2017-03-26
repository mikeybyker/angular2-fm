import { environment } from '../environments/environment';

declare var apiKey; // If we declare an API Key in the html to override environment...

export function LastFMConfigFactory() {
  const ak: Object = window['apiKey'] ? { apiKey: window['apiKey'] } : {};
  return Object.assign({}, environment, ak);
}

export const LastFMConfig = {
  provide: 'LastFMConfig',
  useFactory: LastFMConfigFactory
}
