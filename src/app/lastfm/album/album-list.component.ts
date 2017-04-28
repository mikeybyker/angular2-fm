import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Album } from './../lastfm.service';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.components.html'
})
export class AlbumList implements OnInit {

  @Input()
  albums: Album[];

  // Control layout
  @Input()
  large: number = 2;

  @Input()
  medium: number = 4;

  @Input()
  small: number = 6;

  displayClass: string;

  ngOnInit() {
    this.displayClass = `column small-${this.small} medium-${this.medium} large-${this.large}`;
  }
}
