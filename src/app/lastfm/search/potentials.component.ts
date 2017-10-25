import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Artist } from './../lastfm.service';

@Component({
  selector: 'potentials',
  templateUrl: './potentials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Potentials implements OnInit {

  _potentials: Array<Artist>;

  @Input()
  potentials: Array<Artist>;

  // Control number of results
  @Input()
  limit: number = 6;

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
