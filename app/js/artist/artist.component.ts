import {Component}             from '@angular/core';
import {ROUTER_DIRECTIVES,
        RouteParams}           from '@angular/router-deprecated';

import {Observable}            from 'rxjs/Observable';

import {BreadcrumbsComponent}  from '../utils/breadcrumbs.component';

import {LastFM}                from '../services/lastfm.service.new';


import {Artist}                from './artist';
import {Album}                 from '../album/album';
import {ResultsPipe}           from '../pipes/results-pipe';
import {LimitPipe}             from '../pipes/limit-pipe';
import {ExternalHrefPipe}      from '../pipes/external-href-pipe';
import {ErrorMessage}          from '../utils/error-message';

@Component({
    selector: 'artist',
    pipes: [ResultsPipe, LimitPipe, ExternalHrefPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
    // styles: [`
    //   .foo {
    //     background-image: {{artist.images.extralarge}}; // this would be nice!
    //   }`],
    templateUrl: 'app/js/artist/artist.component.html'
})

export class ArtistComponent {
    potentials:Array<Artist>;
    artist: Artist;
    albums: Array<Album> = [];
    artistName: string;
    links: Array<any> = [];
    error: ErrorMessage;
    maxAlbums: number = 12;

    constructor(private _lastFM: LastFM, private _routeParams: RouteParams) {

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


        Observable.forkJoin(
            this._lastFM.getArtistInfo(this.artistName),
            this._lastFM.getTopAlbums(this.artistName, { limit: this.maxAlbums })
        )
            .subscribe(data => {
                let artist = data[0],
                    albums = data[1];
                if (artist.error || albums.error) {
                    this.error = new ErrorMessage('Error', artist.error ? artist.message : albums.message);
                    return;
                }
                this.artist =  artist.name ? new Artist(artist) : null;
                this.albums = albums.map(album => new Album(album));
            },
            error => {
                this.error = new ErrorMessage('Error', <string>error);
            });
    }
}