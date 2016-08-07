import {Component, OnInit}                 from '@angular/core';
import {Observable}                        from 'rxjs/Observable';

import {BreadcrumbsComponent}              from '../utils/breadcrumbs.component';
import {LastFM}                            from '../lastfm/lastfm.service';
import {ServiceInputComponent}             from './service-input.component';
import {ApiService}                        from './api-methods.service';


@Component({
    selector: 'explore',
    providers: [ApiService],
    directives: [BreadcrumbsComponent, ServiceInputComponent],
    templateUrl: 'app/js/explore/explore.component.html'
})

export class ExploreComponent implements OnInit {

    links: Array<any> = [{title:'Explore', url:''}];
    methods:any[] = [];
    output:string; // = '[Waiting...]';

    constructor(private _lastFM: LastFM, private ApiService: ApiService) {

    }

    ngOnInit(){
        this.methods = this.ApiService.getApiMethods();
        this.clearView();
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

    clearView(){
        this.output = '[Waiting...]';
    }

}