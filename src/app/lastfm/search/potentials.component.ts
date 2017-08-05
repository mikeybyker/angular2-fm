import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Artist } from './../lastfm.service';

@Component({
  selector: 'potentials',
  templateUrl: './potentials.component.html'
})
export class Potentials implements OnInit {

  _potentials: Array<Artist>;

  @Input()
  potentials: Array<Artist>;

  // Control number of results
  @Input()
  limit: number = 6;

  // Control layout
  @Input()
  medium: number = 4;

  @Input()
  small: number = 6;

  displayClass: string;

  ngOnInit() {
    this.displayClass = `column small-${this.small} medium-${this.medium}`;
  }
}
