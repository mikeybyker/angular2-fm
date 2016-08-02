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
    output:string = '';


    constructor(private _lastFM: LastFM, private methodsService: MethodsService) {

    }

    ngOnInit(){
        this.methods = this.methodsService.getMethods();
    }

    apiCall(o){

        let data = o.data,
            params = o.params,
            fn,
            call;
        this.output = '';
        fn =  data.fn.split('.');
        if(fn.length !==2) return;

/*
Could do this with angular1 as well!


*/
        call = this._lastFM[fn[0]][fn[1]];
        console.log('/*call*/ : ', call);
            // fn.apply(this, params)
            // this._lastFM.Album.getInfo('91fa2331-d8b4-4d1f-aa4d-53b1c54853e5', '', {});
        //fn.apply(this, params)
        if(typeof call !== 'function') return;
        call.apply(this, params)
            .subscribe(data => {
                    this.output = data;
                },
                error => {
                    this.output = <string>error;
                });
    }

    // getAlbumInfo(artist, album){
    //     return this._lastFM.Album.getInfo(artist, album, {});

    // }
    // getArtistInfo(artistName: string, options: any = {}) {
    //      return this._lastFM.Artist.getInfo(artistName, {});
    // }

}