import {Component, OnInit}     from '@angular/core';
import {ROUTER_DIRECTIVES,
        ActivatedRoute}        from '@angular/router';
import {Observable}            from 'rxjs/Observable';

import {BreadcrumbsComponent}  from '../utils/breadcrumbs.component';
import {LastFM}                from '../lastfm/lastfm.service';
import {Artist}                from './artist';
import {Album}                 from '../album/album';
import {ResultsPipe}           from '../pipes/results-pipe';
import {LimitPipe}             from '../pipes/limit-pipe';
import {ExternalHrefPipe}      from '../pipes/external-href-pipe';
import {ErrorMessage}          from '../utils/error-message';

@Component({
    selector: 'artist',
    moduleId: module.id,
    pipes: [ResultsPipe, LimitPipe, ExternalHrefPipe],
    directives: [ROUTER_DIRECTIVES, BreadcrumbsComponent],
    // styles: [`
    //   .foo {
    //     background-image: {{artist.images.extralarge}}; // this would be nice!
    //   }`],
    templateUrl: 'artist.component.html'
})

export class ArtistComponent implements OnInit {
    potentials:Array<Artist>;
    artist: Artist;
    albums: Array<Album> = [];
    artistName: string;
    links: Array<any> = [];
    error: ErrorMessage;
    maxAlbums: number = 12;


    constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

    }

    ngOnInit(){

        this.route.params.subscribe(params => {
            this.artistName = decodeURI(params['name']);
            this.links.push({ title: this.artistName });
            if(!this.artistName)
            {
                this.error = new ErrorMessage('Error', 'Artist not specified');
                return;
            }
            this.getArtist(this.artistName, this.maxAlbums)
        });

        this.error = null;

    }

    getArtist(artistName, maxAlbums){
        Observable
            .forkJoin(
                this._lastFM.Artist.getInfo(artistName),
                this._lastFM.Artist.getTopAlbums(artistName, { limit: maxAlbums })
            )
            .subscribe(data => {
                const artist = data[0],
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