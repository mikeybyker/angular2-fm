import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  ErrorMessage
} from '../shared';
import { LastFM, Album } from '../lastfm/lastfm.service';


@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  artistName: string;
  album: Observable<Album>;
  error: ErrorMessage;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this.artistName = params['name'];
        const albumName = params['albumName'];
        if (!this.artistName || !albumName) {
          this.error = new ErrorMessage('Error', 'Did not find an album to look for...');
          return;
        }
        this.getAlbum(this.artistName, albumName);
      });

    this.error = null;


  }

  getAlbum(...args) {

    const album$ = this._lastFM
      .Album.getInfo(...args)
      .share();

    // Display album - async pipe
    this.album = album$;

    // Display last.fm errors
    album$
      .filter(data => data.error)
      .map(data => data.message || data.error)
      .map((error) => new ErrorMessage('Error', error || 'Nothing found...'))
      .subscribe(error => this.error = error);
  }

}
