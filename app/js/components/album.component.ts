import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {HTTP_BINDINGS, Http} from 'angular2/http';

import {BreadcrumbsComponent} from './breadcrumbs.component';
import {LastFmService} from '../services/lastfm.service';
import {Album} from '../models/album';
import {TrackDurationPipe} from '../pipes/duration-pipe';
import {ErrorMessage} from '../utils/error-message';

@Component({
    selector: 'album',
    bindings: [LastFmService],
    providers: [LastFmService],
    pipes: [TrackDurationPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
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
        <div class="row">
            <div class="small-12 columns">
                <h3><a [routerLink]="['Artist', {name: artistName}]">{{album?.artist}}</a></h3>
            </div>
            <div class="small-12 medium-6 columns">
                <a [href]="album?.url" target="_blank"><img *ngIf="album" class="thumbnail main-artist" [src]="album.images.mega"></a>
            </div>
            <div class="small-12 medium-6 columns">
                <h4>{{album?.name}}</h4>
                <ol *ngIf="album" class="track-list">
                    <li *ngFor="#track of album.tracks.track">
                        <a [href]="track.url" target="_blank">{{track.name}}</a> ({{track.duration | trackduration}})
                    </li>
                </ol>
            </div>
        </div>   
        `
})
export class AlbumComponent { 
    artistName: string;
    mbid: string;
    album: Album;
    links: Array<any> = [];
    error: ErrorMessage;

    constructor(public lastFmService: LastFmService, private _routeParams: RouteParams) {
        
    }

    ngOnInit(){
        this.artistName = this._routeParams.get('name');
        this.mbid = this._routeParams.get('mbid');
        this.links.push({title: decodeURI(this.artistName), url: `artist/${this.artistName}` });
        if (!this.artistName || !this.mbid) {
            this.error = new ErrorMessage('Error', 'Did not find an album to look for...');
            return;
        }
        this.error = null;
        this.lastFmService.getAlbumInfo(this.mbid, {})
            .subscribe(res => {
                console.log('getAlbumInfo > result ::: ', res);                
                if (res.error) {
                    this.error = new ErrorMessage('Error', res.message);
                    return;
                }
                this.album = res;
                if (!this.album) {
                    this.error = new ErrorMessage('Error', 'Nothing found...');
                    return;
                }
                this.links.push({ title: this.album.name, url: '' });
            },
            error => {
                let err: any = error.json ? error.json() : error;
                this.error = new ErrorMessage('Error', err.message);
            });
    }
}