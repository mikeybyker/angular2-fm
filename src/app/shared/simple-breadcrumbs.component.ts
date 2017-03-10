import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  UrlSegment,
  ActivatedRouteSnapshot
} from "@angular/router";

@Component({
  selector: 'simple-breadcrumbs',
  template: `
    <div class="row">
      <div class="columns">
        <nav aria-label="You are here:" role="navigation">
          <ul class="breadcrumbs">
            <li *ngFor="let link of breadcrumbs; let first = first; let last = last;" [class.disabled]='last'>
              <span [ngSwitch]="last && !first">
                <span *ngSwitchCase="true">{{link.name}}</span>
              <a [routerLink]="[link.path]" *ngSwitchDefault>{{link.name}}</a>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>  
  `
})
export class SimpleBreadcrumbsComponent implements OnInit {

  breadcrumbs: {
    name: string;
    path: string
  }[] = [];

  @Input()
  snapshot: Observable<ActivatedRoute>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.breadcrumbs = this.getBreadcrumbs(this.getFirstNode(this.router.routerState.snapshot.root));
      })
  }

  getFirstNode(node) {
    while (node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }

  // There *really* has to be an easier way to pluck out the path...
  getBreadcrumbs(node: ActivatedRouteSnapshot) {

    const segments: UrlSegment[] = node.pathFromRoot.reduce((acc, curr) => {
      acc = [...acc, ...curr.url];
      return acc;
    }, []);

    if (segments.length === 1) {
      return [];
    }

    let breadcrumbs = segments.reduce((acc, curr) => {
      let newPath = curr.path,
        currentPath = acc.length ? acc[acc.length - 1].path : '',
        o = { name: newPath, path: `${currentPath}/${newPath}` };
      acc.push(o);
      return acc;
    }, []);

    breadcrumbs.splice(0, 1, { name: 'Home', path: '' });
    return breadcrumbs;

  }

}
