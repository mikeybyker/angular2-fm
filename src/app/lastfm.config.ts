import { environment } from '../environments/environment';
export const LastFMConfig = [
  {
    provide: 'LastFMConfig',
    useValue: {
      apiKey: environment.apiKey
    }
  }
];
