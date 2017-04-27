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
  error: ErrorMessage;
  sub: Subscription;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.sub = this.route.paramMap
      .map((params: ParamMap) => ({ artist: params.get('name'), album: params.get('albumName') }))
      .subscribe(({ artist, album }) => {
        if (!artist || !album) {
          this.error = new ErrorMessage('Error', 'Missing search data');
          return;
        }
        this.getAlbum(artist, album);
      });

    this.error = null;

  }

  getAlbum(...args) {

    const data$ = this._lastFM
      .Album.getInfo(...args)
      .catch(err => {
        this.error = new ErrorMessage('Error', <string>err);
      })
      .share();

    this.album$ = data$
      .filter(data => !data.error);

    // Display last.fm errors
    data$
      .filter(data => data.error)
      .map(data => data.message || data.error)
      .map((error) => new ErrorMessage('Sorry', error || 'Nothing found...'))
      .subscribe(error => this.error = error);
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

}
