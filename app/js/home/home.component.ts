import {Component}         from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NgForm}            from '@angular/forms';
import {Observable}        from 'rxjs/Observable';

import {LastFM}            from '../services/lastfm.service.new';

import {Artist}            from '../artist/artist';
import {LimitPipe}         from '../pipes/limit-pipe';
import {ResultsPipe}       from '../pipes/results-pipe';
import {ErrorMessage}      from '../utils/error-message';

@Component({
    selector: 'home',
    pipes: [ResultsPipe, LimitPipe],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/js/home/home.component.html'
})

export class HomeComponent {
    // potentials:Array<Artist>;  When *not* using the angular async pipe...
    potentials:Observable<Array<Artist>>;
    error: ErrorMessage;
    model:any = {artist:'The Cure'};
    maxResults: number = 10;

    constructor(private _lastFM: LastFM) {

    }
    onSubmit(){

        console.log(this.model.artist);
        this.error = null;
// console.log('this._lastFM.artist.search : ', this._lastFM.artist().search);
// console.log('this._lastFM.xxx.search : ', this._lastFM.xxx.search);

        const search$:Observable<any> = this._lastFM
            .Artist.search(this.model.artist, { limit: this.maxResults })
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)

        // Note: not subscribe! Does the async pipe do that for you? "and subscribes to the input automatically," - Yes!            
        this.potentials = search$
            .map(artists =>{
                return artists
                    .filter(artist => this._lastFM.checkUsableImage(artist))
                    .map((artist)=> new Artist(artist))
            });
            // .do(data => console.log(data));
            
/*
If I type the return of searchArtists...
then it will complain on data.error below - no such on the Observable<Array<any>>
Cos - if successful - get an array returned
If data error - get object
How to deal with that?!
Maybe just : :Observable<any>
Rather than specifying array of anything...
*/
        search$
            .subscribe(data => {
                if (!data.length || data.error) {
                    this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                    return;
                }
            },
            error => {
                // Keeping this for http errors
                this.error = new ErrorMessage('Error', <any>error);
            });
    }

}

/*
When *not* using the angular async pipe...
onSubmit() {
    console.log(this.model.artist);
    this.error = null;
    this.lastFmService
        .searchArtists(this.model.artist, { limit: this.maxResults })
        .subscribe(data => {
            if (data.error || !data.length) {
                this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                this.potentials = [];
                return;
            }
            this.potentials = data;
        },
        error => {
            this.error = new ErrorMessage('Error', <any>error);
        });
}
*/