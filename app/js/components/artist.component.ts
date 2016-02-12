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
    templateUrl: './app/views/artist.component.html'
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