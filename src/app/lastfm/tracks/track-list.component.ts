import { Component, Input } from '@angular/core';

import { Track } from './../lastfm.interface';

@Component({
  selector: 'track-list',
  templateUrl: './track-list.component.html',
})
export class TrackList {

  @Input()
  tracks: Track[];

}
