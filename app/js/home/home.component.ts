import {Component}         from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NgForm}            from '@angular/forms';
import {Observable}        from 'rxjs/Observable';

import {LastFmService}     from '../services/lastfm.service';

import {LastFM}             from '../services/lastfm.service.new';

import {Artist}            from '../artist/artist';
import {LimitPipe}         from '../pipes/limit-pipe';
import {ResultsPipe}       from '../pipes/results-pipe';
import {ErrorMessage}      from '../utils/error-message';

@Component({
    selector: 'home',
    providers: [LastFmService],
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

    constructor(public lastFmService: LastFmService, private _LastFM: LastFM) {

    }
    onSubmit(){

        console.log(this.model.artist);
        this.error = null;

        this.potentials = this._LastFM
            .searchArtists(this.model.artist, { limit: this.maxResults })
            .map(artists =>{
                return artists
                    .filter(artist => this._LastFM.checkUsableImage(artist))
                    .map((artist)=> new Artist(artist))
            })
            .do(data => console.log(data))
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)

        this.potentials
            .subscribe(data => {
                if (!data.length) {
                    this.error = new ErrorMessage('Error', 'Nothing found...');
                    return;
                }
            },
            error => {
                this.error = new ErrorMessage('Error', <any>error);
            });

        // return false; // doesn't stop the form making a GET request
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