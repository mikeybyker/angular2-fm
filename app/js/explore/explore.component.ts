import {Component, OnInit}     from '@angular/core';
import {ROUTER_DIRECTIVES,
        RouteParams}           from '@angular/router-deprecated';

import {Observable}            from 'rxjs/Observable';

import {BreadcrumbsComponent}  from '../utils/breadcrumbs.component';

import {LastFM}                from '../services/lastfm.service.new';

import {ApiInputComponent}     from './api-input.component';
import { MethodsService } from './methods.service';

import {ErrorMessage}          from '../utils/error-message';

@Component({
    selector: 'explore',
    providers: [MethodsService],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent, ApiInputComponent],
    templateUrl: 'app/js/explore/explore.component.html'
})

export class ExploreComponent implements OnInit {

    links: Array<any> = [{title:'Explore', url:''}];
    error: ErrorMessage;
    methods:any[] = [];

    // @todo : get from service
 
    constructor(private _lastFM: LastFM, private methodsService: MethodsService) {

    }

    ngOnInit(){
        this.methods = this.methodsService.getMethods();
    }

    apiCall(data, params){
        console.log('called...');
            // var fn;
            // $ctrl.output = '';

            // fn = data.fn;
            // if(!fn) return;

            // fn.apply(this, params)
            //     .then(function(data) {
            //         $ctrl.output = JSON.stringify(data, null, '    ');
            //     })
            //     .catch(function(reason) {
            //         $log.warn('Error ::: ', reason);
            //         $ctrl.output = reason.statusText || 'Error';
            //     });
        }
}