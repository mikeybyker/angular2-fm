import {Component, OnInit}              from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {Observable}                     from 'rxjs/Observable';

import {BreadcrumbsComponent}           from '../utils/breadcrumbs.component';
import {LastFM}                         from '../services/lastfm.service';
import {Album}                          from './album';
import {TrackDurationPipe}              from '../pipes/duration-pipe';
import {ErrorMessage}                   from '../utils/error-message';

@Component({
    selector: 'album',
    pipes: [TrackDurationPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
    templateUrl: 'app/js/album/album.component.html'
})
export class AlbumComponent implements OnInit{ 
    artistName: string;
    album:Observable<Album>;
    links: Array<any> = [];
    error: ErrorMessage;

    constructor(private _lastFM: LastFM, private _routeParams: RouteParams) {
        
    }

    ngOnInit(){
        this.artistName = this._routeParams.get('name');
        const mbid = this._routeParams.get('mbid');
        this.links.push({title: decodeURI(this.artistName), url: `artist/${this.artistName}` });
        if (!this.artistName || !mbid) {
            this.error = new ErrorMessage('Error', 'Did not find an album to look for...');
            return;
        }
        this.error = null;

        const album$:Observable<any> = this._lastFM
            .Album.getInfo(mbid)
            .share();

            // Display album (if any) - async pipe
            this.album = album$
                .filter(album => !!album.artist) // make sure is album data (note before subscribe!)
                .map(album => new Album(album));

            // Display error (if any)
            album$
                .subscribe(data => {
                    if (data.error) {
                        this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                        return;
                    }
                });
    }
}
// Alt.
// album$
//     .filter(album => !!album.artist) // make sure is album data (note before subscribe!)
//     .map(album => new Album(album))
//     .subscribe(album => {
//          this.album = album;
//     },
//     error => {
//         this.error = new ErrorMessage('Error', <string>error);
//     });