import {Component, OnInit}              from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {Observable}                     from 'rxjs/Observable';

import {BreadcrumbsComponent}           from '../utils/breadcrumbs.component';

import {LastFM}                         from '../services/lastfm.service.new';

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
    // mbid: string;
    album: Album;
    links: Array<any> = [];
    error: ErrorMessage;

    // album:Observable<Album>; // why not? Why can't I have
    // this.album = this._lastFM.getAlbumInfo(this.mbid, {}) etc. like in home/search?

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
            .getAlbumInfo(mbid, {})
            .share();
            // console.log('pre album$  : ', album$, typeof album$);

            // Display album (if any)
            album$
                .filter(album => !!album.artist) // make sure is album data (note before subscribe!)
                .map(album => new Album(album))
                .subscribe(album => {
                     this.album = album;
                     console.log('album$ ::: ', album$);
                },
                error => {
                    this.error = new ErrorMessage('Error', <string>error);
                });

            // Display error (if any)
            album$
                .subscribe(data => {
                    if (data.error) {
                        this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                        return;
                    }
                });
        // this.album = 
        /*this._lastFM
            .getAlbumInfo(this.mbid, {})
            // .subscribe(album => new Album(album));
            .subscribe(album => {

                 this.album = album.artist ? new Album(album) : null; // or would we want error?
                 // this.artist =  artist.name ? new Artist(artist) : null;
            },
            error => {
                console.log('HMMMM');
                this.error = new ErrorMessage('Error', <string>error);
            });*/


                 /*if(!album.artist){
                    // throw error??
                    console.log('HERE! THROW'); // nope, is not caught
                    throw new Error('This request has failed '); // Or do you handle errors in the service??
                    // What if you want to do something else though - like not all users of the service want to 
                    // repond same way...
                 }*/
        // Or have another sub that shows errors? like home...sort of
    }
}