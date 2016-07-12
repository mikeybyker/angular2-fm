import {bootstrap}             from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS}        from '@angular/http';
import {ROUTER_PROVIDERS}      from '@angular/router-deprecated';
import {AppComponent}          from './components/app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
    .catch(err => console.error(err));