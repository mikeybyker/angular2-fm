import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  ErrorMessage
} from '../shared';
import { LastFM, Artist, Album } from '../lastfm/lastfm.service';


@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit {
  potentials: Array<Artist>;
  artist: Artist;
  albums: Array<Album>;
  artistName: string;
  error: ErrorMessage;
  maxAlbums: number = 12;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this.artistName = decodeURI(params['name']);
        if (!this.artistName) {
          this.error = new ErrorMessage('Error', 'Artist not specified');
          return;
        }
        this.getArtist(this.artistName, this.maxAlbums);
      });

    this.error = null;

  }

  getArtist(artistName, maxAlbums) {
    const artist$ = Observable
      .forkJoin(
      this._lastFM.Artist.getInfo(artistName),
      this._lastFM.Artist.getTopAlbums(artistName, { limit: maxAlbums })
      )
      .share();

    artist$
      .filter(([artist, albums]: [any, any]) => !artist.error && !albums.error)
      .subscribe(
      ([artist, albums]: [any, any]) => {
        this.artist = artist;
        this.albums = albums;
      },
      error => {
        this.error = new ErrorMessage('Error', <string>error); // http problems
      });

    // Data errors
    artist$
      .filter(([artist, albums]: [any, any]) => artist.error || albums.error)
      .map(([artist, albums]: [any, any]) => artist.error ? artist.message || artist.error : albums.message || albums.error)
      .map((message) => new ErrorMessage('Sorry', message))
      .subscribe((error) => this.error = error);
  }
}
