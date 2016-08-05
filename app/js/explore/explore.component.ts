import {Component, OnInit}                 from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams}    from '@angular/router-deprecated';
import {Observable}                        from 'rxjs/Observable';

import {BreadcrumbsComponent}              from '../utils/breadcrumbs.component';
import {LastFM}                            from '../services/lastfm.service.new';
import {ApiInputComponent}                 from './api-input.component';
import { MethodsService }                  from './methods.service';


@Component({
    selector: 'explore',
    providers: [MethodsService],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent, ApiInputComponent],
    templateUrl: 'app/js/explore/explore.component.html'
})

export class ExploreComponent implements OnInit {

    links: Array<any> = [{title:'Explore', url:''}];
    methods:any[] = [];
    output:string = '[Waiting...]';

    constructor(private _lastFM: LastFM, private methodsService: MethodsService) {

    }

    ngOnInit(){
        this.methods = this.methodsService.getMethods();
    }

    apiCall(o){

        let data = o.data,
            params = o.params,
            fn = data.fn || '',
            group = data.group || '',
            call;
        this.output = '[Loading...]';
        call =  group ? this._lastFM[group][fn] : this._lastFM[fn];
        // console.log('/*call*/ : ', call);
        if(typeof call !== 'function') return;
        call.apply(this, params)
            .subscribe(data => {
                    this.output = data;
                },
                error => {
                    this.output = <string>error;
                });
    }

}