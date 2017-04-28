import { Component, Input } from '@angular/core';

import { Artist } from '../../lastfm.service';

@Component({
  selector: 'artist-view',
  templateUrl: './artist-view.component.html'
})
export class ArtistViewComponent {

  @Input()
  artist: Artist;

  constructor() { }

}
