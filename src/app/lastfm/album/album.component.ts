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
import {
  LastFM,
  Album
} from '../../lastfm/lastfm.service';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album$: Observable<Album>;
  error$: Observable<ErrorMessage>;
  sub: Subscription;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.paramMap
      .map((params: ParamMap) => ({ artist: params.get('name'), album: params.get('albumName') }))
      .subscribe(({ artist, album }) => {
        this.getAlbum(artist, album);
      });

  }

  getAlbum(...args) {


    // Method 1: Filter out the errors and have a subscription (following)
    // to show any errors. i.e. have album$ concerned only with correct data

    const data$ = this._lastFM
      .Album.getInfo(...args)
      .catch(err => {
        return Observable.of({ error: 1, message: err.message });
      })
      .share();

    this.album$ = data$
      .filter(data => !data.error);

    // Handle errors (400's or lastfm data/search errors)
    this.error$ = data$
      .filter(data => data.error)
      .map(data => data.message)
      .map((message) => new ErrorMessage('Sorry', message));

    // Alternative...
    // Method 2: Let the template handle showing either the album data or the error, whichever comes in.
    /*
    this.album$ = this._lastFM
      .Album.getInfo(...args)
      .catch(err => {
        return Observable.of({ error: 1, message: err.message });
      });
    */


  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

}
