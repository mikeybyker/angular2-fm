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

  error: ErrorMessage;
  sub: Subscription;

  albums$: Observable<Album[]>;
  artist$: Observable<Artist>;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

  }

  ngOnInit() {

    const maxAlbums = 12;

    this.sub = this.route.paramMap
      .map((params: ParamMap) => params.get('name'))
      .subscribe(artist => {
        if (!artist) {
          this.error = new ErrorMessage('Error', 'Artist not specified');
          return;
        }
        this.getArtist(artist, maxAlbums);
      });

    this.error = null;

  }

  getArtist(artistName, maxAlbums) {

    const info$: Observable<Artist> = this._lastFM.Artist
      .getInfo(artistName)
      .catch(err => {
        this.error = new ErrorMessage('Error', <string>err); // Catch 400's
      })
      .share();

    const albumData$ = this._lastFM.Artist
      .getTopAlbums(artistName, { limit: maxAlbums })
      .catch(err => {
        this.error = new ErrorMessage('Error', <string>err); // Catch 400's
      })
      .share();

    // Filter out any data/search errors
    this.albums$ = albumData$
      .filter((albums: any) => !albums.error);
    this.artist$ = info$
      .filter((artist: any) => !artist.error);

    // Data/Search errors
    Observable
      .forkJoin(info$, albumData$)
      .filter(([artist, albums]: [any, any]) => artist.error || albums.error)
      .map(([artist, albums]: [any, any]) => artist.error ? artist.message || artist.error : albums.message || albums.error)
      .map((message) => new ErrorMessage('Sorry', message))
      .subscribe((error) => this.error = error);

  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}
