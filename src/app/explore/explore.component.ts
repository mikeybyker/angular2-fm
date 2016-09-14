import { Component, OnInit }                 from '@angular/core';
import { Observable }                        from 'rxjs/Observable';

import { LastFM }                            from '../lastfm/lastfm.service';
import { ApiService }                        from './api-methods.service';

@Component({
    selector: 'explore',
    styleUrls: ['./explore.component.css'],
    templateUrl: './explore.component.html'
})

export class ExploreComponent implements OnInit {

    links: Array<any> = [{title:'Explore', url:''}];
    methods:any[] = [];
    output:string;

    constructor(private _lastFM: LastFM, private ApiService: ApiService) {

    }

    ngOnInit(){
        if(this._lastFM.getApiKey() === 'YOUR_API_KEY'){
            alert(`Please add your Last.fm api key (for this demo, look in index.html)\n...it won't work without one!`);
        }
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
