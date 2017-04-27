import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  LastFM,
  Artist
} from '../lastfm.service';
import { ErrorMessage } from '../../shared/error-message';

interface ArtistSearch {
  artist: string
}

@Component({
  selector: 'home',
  templateUrl: './search.component.html'
})

export class SearchComponent {

  potentials$: Observable<Artist[] | any>;
  error: ErrorMessage;
  sub$: Subscription;
  model: ArtistSearch = { artist: 'The Cure' };
  maxResults: number = 10;

  constructor(private _lastFM: LastFM) {

  }

  onSubmit() {

    this.error = null;

    this.potentials$ = this._lastFM
      .Artist.search(this.model.artist, { limit: this.maxResults })
      .share(); // so we don't get 2 network requests with the subscription for error handling (below...)

    this.sub$ = this.potentials$
      .filter(data => data.error || !data.length)
      .map(data => new ErrorMessage('No Results', data.message || 'Sorry, nothing found at last.fm...'))
      .subscribe(
      (error) => this.error = error,                                 // data problems
      (error) => this.error = new ErrorMessage('Error', <any>error)  // http errors
      );
  }

  ngOnDestroy() {
    this.sub$ && this.sub$.unsubscribe();
  }

}
