import {Component}                      from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';

import {BreadcrumbsComponent}           from '../utils/breadcrumbs.component';
import {LastFmService}                  from '../services/lastfm.service';
import {Album}                          from './album';
import {TrackDurationPipe}              from '../pipes/duration-pipe';
import {ErrorMessage}                   from '../utils/error-message';

@Component({
    selector: 'album',
    providers: [LastFmService],
    pipes: [TrackDurationPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
    templateUrl: 'app/js/album/album.component.html'
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
        this.lastFmService
            .getAlbumInfo(this.mbid, {})
            .subscribe(data => {           
                if (data.error) {        // Search errors i.e. not api errors
                    this.error = new ErrorMessage('Error', data.message);
                    return;
                }
                this.album = <Album>data;
                this.links.push({ title: this.album.name, url: '' });
            },
            error => {                   // api errors eg. no api_key
                this.error = new ErrorMessage('Error', <any>error);
            });
    }
}