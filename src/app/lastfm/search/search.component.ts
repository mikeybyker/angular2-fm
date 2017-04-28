import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
  LastFM,
  Artist
} from '../lastfm.service';
import { ErrorMessage } from '../../shared/error-message';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'home',
  templateUrl: './search.component.html'
})

export class SearchComponent {

  potentials$: Observable<Artist[] | any>;
  error$: Observable<ErrorMessage>;

  constructor(private _lastFM: LastFM) { }

  onSearch({ artist, limit }) {

    const results$ = this._lastFM
      .Artist.search(artist, { limit })
      .catch(err => {
        return Observable.of({ error: 1, message: err.message });
      })
      .share();

    this.potentials$ = results$
      .filter((albums: any) => !albums.error);

    this.error$ = results$
      .filter(data => data.error || !data.length)
      .map(data => data.error ? data.message : 'Nothing found at last.fm...')
      .map((message) => new ErrorMessage('Sorry', message));

  }

}
