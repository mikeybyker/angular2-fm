import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Artist } from './../lastfm.service';

@Component({
  selector: 'similar-list',
  templateUrl: './similar-list.component.html',
  styleUrls: ['./similar-list.component.css']
})
export class SimilarList implements OnInit {

  @Input()
  similar: Artist[];

  // Control number of results
  @Input()
  resultsLimit: number = 4;

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
