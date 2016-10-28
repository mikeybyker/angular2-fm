import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'potentials',
  templateUrl: './potentials.component.html'
})
export class Potentials implements OnInit {
  @Input()
  potentials: Array<any>;

  // Control number of results
  @Input()
  resultsLimit: number = 6;

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