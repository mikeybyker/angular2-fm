import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.components.html'
})
export class AlbumList implements OnInit {
  @Input()
  albums: Array<any>;

  // Control number of results
  @Input()
  resultsLimit: number = 4;

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
