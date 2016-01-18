import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {HTTP_BINDINGS, Http} from 'angular2/http';

import {BreadcrumbsComponent} from './breadcrumbs.component';
import {LastFmService} from '../services/lastfm.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {ResultsPipe} from '../pipes/results-pipe';
import {LimitPipe} from '../pipes/limit-pipe';
import {ExternalHrefPipe} from '../pipes/external-href-pipe';
import {ErrorMessage} from '../utils/error-message';

@Component({
    selector: 'artist',
    bindings: [LastFmService],
    providers: [LastFmService],
    pipes: [ResultsPipe, LimitPipe, ExternalHrefPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
    // styles: [`
    //   .foo {
    //     background-image: {{artist.images.extralarge}}; // this would be nice!
    //   }`],
    template: `
        <breadcrumbs [links]="links"></breadcrumbs>
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
        <div class="row" *ngIf="artist">
            <div class="small-12 medium-6 columns">
                <img class="thumbnail main-artist" [src]="artist.images.mega">
            </div>
            <div class="small-12 medium-6 columns">
                <h3>{{artist?.name}}</h3>
                <!-- ang2 version of bind-as-html... -->
                <p [innerHTML]="artist?.bio?.summary | externalhref"></p>
                <dl *ngIf="artist">
                    <dt>Listeners</dt>
                    <dd>{{artist.stats.listeners}}</dd>
                    <dt>Play Count</dt>
                    <dd>{{artist.stats.playcount}}</dd>
                </dl>
            </div>
        </div>
        <div *ngIf="artist">
            <div class="row">
                <div class="columns">
                    <h3>Popular Albums</h3>
                </div>
            </div>
            <div class="row">
                <div class="columns small-6 medium-4 large-2" *ngFor="#album of albums">
                    <a *ngIf="album.images.extralarge" [routerLink]="['/Album', {name: album.artist.name, mbid: album.mbid}]"><img class="thumbnail" [src]="album.images.extralarge"></a>
                </div>
            </div>
            <div *ngIf="artist.similar.length">
                <div class="row">
                    <div class="columns">
                        <h3>Similar Artists</h3>
                    </div>
                </div>
                <div class="row align-spaced">
                    <div class="column small-5 medium-4" *ngFor="#similar of artist.similar | limit:4">
                       <div class="artist" >
                            <a [routerLink]="['Artist', {name: similar.name}]">
                                <img class="thumbnail" [src]="similar.images.large">
                            </a>
                            <div class="artist-caption">
                                <div class="artist-name">
                                    <h4>{{ similar.name }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
})

export class ArtistComponent {
    potentials:Array<Artist>;
    artist: Artist;
    albums: Array<Album> = [];
    artistName: string;
    links: Array<any> = [];
    error: ErrorMessage;

    constructor(public lastFmService: LastFmService, private _routeParams: RouteParams) {

    }

    ngOnInit(){

        this.artistName = decodeURI(this._routeParams.get('name')); // necc?
        if(!this.artistName)
        {
            this.error = new ErrorMessage('Error', 'Artist not specified');
            return;
        }

        this.error = null;
        this.links.push({ title: this.artistName, url: `artist/${this.artistName}` });

        this.lastFmService.getAllArtist(this.artistName, {}, { limit: 6 })
            .subscribe(res => {
                console.log('getAllArtist > result ::: ', res);
                if (res[0].error || res[1].error)
                {
                    let err:any = res[0] || res[1];
                    this.error = new ErrorMessage('Error', err.message);
                    return;
                }
                this.artist = res[0];
                this.albums = res[1];
            },
            error => {
                let err: any = error.json ? error.json() : error;
                this.error = new ErrorMessage('Error', err.message);
            });
    }
}