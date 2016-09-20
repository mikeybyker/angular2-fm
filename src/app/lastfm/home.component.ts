import { Component }       from '@angular/core';
import { NgForm }          from '@angular/forms';
import { Observable }      from 'rxjs/Observable';

import { LastFM }          from './lastfm.service';
import { ErrorMessage }    from '../shared/error-message';
import { Artist }          from './artist';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    potentials:Observable<Array<Artist>>;
    error: ErrorMessage;
    model:any = {artist:'The Cure'};
    maxResults: number = 10;

    constructor(private _lastFM: LastFM) {

    }
    
    onSubmit(){

        this.error = null;

        const search$:Observable<any> = this._lastFM
            .Artist.search(this.model.artist, { limit: this.maxResults })
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)
        
        this.potentials = search$
            .map(artists =>{
                return artists
                    .filter(artist => this._lastFM.checkUsableImage(artist))
                    .map((artist)=> new Artist(artist))
            });

        search$
            .subscribe(data => {
                if (!data.length || data.error) {
                    this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                    return;
                }
            },
            error => {
                // http errors
                this.error = new ErrorMessage('Error', <any>error);
            });
    }

}
