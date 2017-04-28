import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessage } from './error-message';

@Component({
  selector: 'simple-error',
  templateUrl: './simple-error.component.html'
})
export class SimpleErrorComponent implements OnInit {

  @Input()
  error: ErrorMessage;

  displayClass: string;

  constructor() { }

  @Input()
  callout: string = 'secondary'; // alert primary secondary success warning 

  ngOnInit() {
    this.displayClass = `callout ${this.callout}`;
  }

}
