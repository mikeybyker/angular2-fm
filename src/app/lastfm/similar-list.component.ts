import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'similar-list',
  templateUrl: './similar-list.component.html',
  styleUrls: ['./similar-list.component.css']
})
export class SimilarList implements OnInit {
  @Input()
  similar: Array<any>;

  // Control number of results
  @Input()
  resultsLimit: number = 4;

  // Control layout
  @Input()
  medium: number = 4;

  @Input()
  small: number = 5;

  displayClass: string;

  ngOnInit() {
    this.displayClass = `column small-${this.small} medium-${this.medium}`;
  }

}