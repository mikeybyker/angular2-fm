import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
  ActivatedRouteSnapshot,
  NavigationEnd
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  template: `
    <simple-breadcrumbs [snapshot]="snapshot"></simple-breadcrumbs>
    <router-outlet></router-outlet>
  `
})
export class LastFMComponent implements OnInit {

  snapshot: Observable<ActivatedRouteSnapshot>;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.snapshot = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .map(route => route.snapshot);
  }

}
