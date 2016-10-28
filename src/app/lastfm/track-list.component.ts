import { Component, Input } from '@angular/core';

@Component({
  selector: 'track-list',
  templateUrl: './track-list.component.html',
})
export class TrackList {
  @Input()
  tracks: Array<any>;
}