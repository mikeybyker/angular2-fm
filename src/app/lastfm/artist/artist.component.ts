import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  ErrorMessage
} from '../../shared';
import { LastFM, Artist, Album } from '../../lastfm/lastfm.service';


@Component({
  selector: 'artist',
  templateUrl: './artist.component.html'
})

export class ArtistComponent implements OnInit {

  albums$: Observable<Album[]>;
  artist$: Observable<Artist>;
  error$: Observable<ErrorMessage>;
  sub: Subscription;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) { }

  ngOnInit() {

    const maxAlbums = 12;

    this.sub = this.route.paramMap
      .map((params: ParamMap) => params.get('name'))
      .subscribe(artist => {
        this.getArtist(artist, maxAlbums);
      });
  }

  getArtist(artistName, maxAlbums) {

    const info$: Observable<Artist> = this._lastFM.Artist
      .getInfo(artistName)
      .catch(err => {
        return Observable.of({ error: 1, message: err.message });
      })
      .share();

    const albumData$ = this._lastFM.Artist
      .getTopAlbums(artistName, { limit: maxAlbums })
      .catch(err => {
        return Observable.of({ error: 1, message: err.message });
      })
      .share();

    // Filter out any data/search errors
    this.albums$ = albumData$
      .filter((albums: any) => !albums.error);
    this.artist$ = info$
      .filter((artist: any) => !artist.error);

    // Handle errors (400's or lastfm data/search errors)
    this.error$ = Observable
      .forkJoin(info$, albumData$)
      .filter(([artist, albums]: [any, any]) => artist.error || albums.error)
      .map(([artist, albums]: [any, any]) => artist.error ? artist.message : albums.message)
      .map((message) => new ErrorMessage('Sorry', message));

  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
