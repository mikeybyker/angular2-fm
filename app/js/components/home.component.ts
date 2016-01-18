import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_BINDINGS, Http} from 'angular2/http';
import {NgForm} from 'angular2/common';

import {LastFmService} from '../services/lastfm.service';
import {Artist} from '../models/artist';
import {LimitPipe} from '../pipes/limit-pipe';
import {ResultsPipe} from '../pipes/results-pipe';
import {ErrorMessage} from '../utils/error-message';

@Component({
    selector: 'home',
    bindings: [HTTP_BINDINGS, LastFmService],
    providers: [LastFmService],
    pipes: [ResultsPipe, LimitPipe],
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div class="row align-center">
            <div class="medium-6 large-4 column">
                <form (ngSubmit)="onSubmit()" #searchForm="ngForm">
                    <h4 class="text-center">Search Last.fm</h4>
                    <label>
                        <input #artist type="text" placeholder="Artist" value="The Cure" required
                        [(ngModel)]="model.artist" ngControl="artist"  #artist="ngForm">
                    </label>
                    <p>
                        <button type="submit" [disabled]="!searchForm.form.valid" class="button expanded">Search</button>
                    </p>
                    <div [hidden]="artist.valid" class="alert callout">
                        <p>
                            <i class="fi-alert"></i> Please enter an artist to search for...
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <div class="row align-center" *ngIf="error">
            <div class="medium-6 large-4 column">
                <div class="callout alert">
                    <h5>{{error.title}}</h5>
                    <p>
                        {{error.message}}
                    </p>
                </div>
            </div>
        </div>
        <div class="row align-center" *ngIf="potentials && potentials.length">
            <div class="column small-6 medium-4" *ngFor="#artist of potentials | results : 'extralarge' | limit: 6">
                <div class="callout">
                    <p>{{ artist.name }}</p>
                    <p>
                        <a [routerLink]="['Artist', {name: artist.name}]" >
                            <img class="thumbnail" [src] = "artist.images.extralarge">
                        </a>
                    </p>
                </div>
            </div>
        </div>
        `
})

export class HomeComponent {
    potentials:Array<Artist>;
    error: ErrorMessage;
    model:any = {artist:'The Cure'};

    constructor(public lastFmService: LastFmService) {

    }
    onSubmit(){
        console.log(this.model.artist);
        this.error = null;
        this.lastFmService.searchArtists(this.model.artist, { limit: 5 })
            .subscribe(res => {
                console.log('searchArtists > result ::: ', res);
                if (res.error) {
                    this.error = new ErrorMessage('Error', res.message);
                    return;
                }
                this.potentials = res;
                if (!this.potentials.length) {
                    this.error = new ErrorMessage('Error', 'Nothing found...');
                }
            },
            error => {
                let err: any = error.json ? error.json() : error;
                this.error = new ErrorMessage('Error', err.message || 'Some Error...');
            });
    }

}