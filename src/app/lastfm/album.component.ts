import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  BreadcrumbsComponent,
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
  links: Array<any> = [];
  error: ErrorMessage;

  constructor(private _lastFM: LastFM, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this.artistName = params['name'];
        const mbid = params['mbid'];
        if (!this.artistName || !mbid) {
          this.error = new ErrorMessage('Error', 'Did not find an album to look for...');
          return;
        }
        this.links.push({ title: decodeURI(this.artistName) });
        this.getAlbum(mbid);
      });

    this.error = null;

  }

  getAlbum(mbid) {
    const album$: Observable<any> = this._lastFM
      .Album.getInfo(mbid)
      .share();

    // Display album - async pipe
    this.album = album$;

    // Update the breadcrumbs with the album name
    album$
      .subscribe((album) => {
        this.links.push({ title: album.name });
      },
      error => {
        this.error = new ErrorMessage('Error', <string>error); // http problems
      });

    // Display last.fm errors
    album$
      .filter(data => data.error)
      .map(data => data.message || data.error)
      .map((error) => new ErrorMessage('Error', error || 'Nothing found...'))
      .subscribe(error => this.error = error);

  }
}
