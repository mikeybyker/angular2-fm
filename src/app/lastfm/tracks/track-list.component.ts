import { Component, Input } from '@angular/core';

import { Track } from './../lastfm.service';

@Component({
  selector: 'track-list',
  templateUrl: './track-list.component.html',
})
export class TrackList {

  @Input()
  tracks: Track[];

}
