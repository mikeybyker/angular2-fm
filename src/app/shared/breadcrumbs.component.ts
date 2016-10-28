import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  template: `
      <div class="row">
        <div class="columns">
          <nav aria-label="You are here:" role="navigation">
            <ul class="breadcrumbs">
              <li *ngFor="let link of links; let first = first; let last = last;" [class.disabled]='last'>
                <span [ngSwitch]="last && !first">
                  <span *ngSwitchCase="true">{{link.title}}</span>
                  <a [routerLink]="[link.url]" *ngSwitchDefault >{{link.title}}</a>
                </span>
              </li>
            </ul>
          </nav>
        </div>  
      </div>  
    `
})
// [routerLink]="['../']">
// [href]="link.url"
export class BreadcrumbsComponent {

  @Input() links: Array<any> = [];

  ngOnInit() {

    let str: string = '../',
      popped = this.links.length > 1 ? this.links.pop() : null;
    if (!this.links.length) {
      return;
    }
    this.links.reverse();
    for (const link of this.links) {
      link.url = str;
      str += str;
    }

    this.links.reverse().unshift({ title: 'HOME', url: '' });
    popped && this.links.push(popped);
  }
}
