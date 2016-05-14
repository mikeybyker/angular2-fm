import {Component}         from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NgForm}            from '@angular/common';

import {LastFmService}     from '../services/lastfm.service';
import {Artist}            from '../models/artist';
import {LimitPipe}         from '../pipes/limit-pipe';
import {ResultsPipe}       from '../pipes/results-pipe';
import {ErrorMessage}      from '../utils/error-message';

@Component({
    selector: 'home',
    providers: [LastFmService],
    pipes: [ResultsPipe, LimitPipe],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './app/views/home.component.html'
})

export class HomeComponent {
    potentials:Array<Artist>;
    error: ErrorMessage;
    model:any = {artist:'The Cure'};
    maxResults: number = 5;

    constructor(public lastFmService: LastFmService) {

    }
    onSubmit(){
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

}