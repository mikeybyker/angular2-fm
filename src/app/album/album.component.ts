import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute }            from '@angular/router';
import { Observable }                from 'rxjs/Observable';

import { BreadcrumbsComponent }      from '../utils/breadcrumbs.component';
import { LastFM }                    from '../lastfm/lastfm.service';
import { Album }                     from './album';
import { ErrorMessage }              from '../utils/error-message';

@Component({
    selector: 'album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit { 
    artistName: string;
    album:Observable<Album>;
    links: Array<any> = [];
    error: ErrorMessage;

    constructor(private _lastFM: LastFM, private route: ActivatedRoute) {
        
    }

    ngOnInit(){

        this.route.params
            .subscribe(params => {
                this.artistName = params['name'];
                const mbid = params['mbid'];
                if (!this.artistName || !mbid) {
                    this.error = new ErrorMessage('Error', 'Did not find an album to look for...');
                    return;
                }
                this.links.push({title: decodeURI(this.artistName), url: `artist/${this.artistName}` });
                this.getAlbum(mbid);
            });

        this.error = null;

    }

    getAlbum(mbid){

        const album$:Observable<any> = this._lastFM
            .Album.getInfo(mbid)
            .share();

            // Display album (if any) - async pipe
            this.album = album$
                .filter(album => !!album.artist) // make sure is album data (note before subscribe!)
                .map(album => new Album(album));

            // Update the breadcrumbs with the album name
            this.album
                .subscribe((album) => {
                    this.links.push({ title: album.name });
                });

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
//     .filter(album => !!album.artist)
//     .map(album => new Album(album))
//     .subscribe(album => {
//          this.album = album;
//     },
//     error => {
//         this.error = new ErrorMessage('Error', <string>error);
//     });
