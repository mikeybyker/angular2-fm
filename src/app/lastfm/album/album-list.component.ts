import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Album } from './../lastfm.service';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumList implements OnInit {


  @Input()
  albums: Album[];

  // Control layout: How many cells per row for medium and small screens
  @Input()
  medium: number = 3;

  @Input()
  small: number = 2;

  gridClass: string;

  ngOnInit() {
    this.gridClass = `grid-x grid-padding-x small-up-${this.small} medium-up-${this.medium}`;
  }

}
