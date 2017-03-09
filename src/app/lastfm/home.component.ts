import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { LastFM, Artist } from './lastfm.service';
import { ErrorMessage } from '../shared/error-message';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  potentials: Observable<Array<Artist>>;
  error: ErrorMessage;
  model: any = { artist: 'The Cure' };
  maxResults: number = 10;

  constructor(private _lastFM: LastFM) {

  }

  onSubmit() {

    this.error = null;

    const search$: Observable<any> = this._lastFM
      .Artist.search(this.model.artist, { limit: this.maxResults })
      .share(); // so we don't get 2 network requests with the subscription for error handling (below...)

    this.potentials = search$;

    search$
      .filter(data => data.error || !data.length)
      .map(data => new ErrorMessage('No Results', data.message || 'Sorry, nothing found at last.fm...'))
      .subscribe(
      (error) => this.error = error,                                 // last.fm problems
      (error) => this.error = new ErrorMessage('Error', <any>error)  // http errors
      );
  }

}
