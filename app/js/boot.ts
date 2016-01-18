import {bootstrap}    from 'angular2/platform/browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {AppComponent} from './components/app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
    .catch(err => console.error(err));