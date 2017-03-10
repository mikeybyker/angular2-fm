import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params
} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LastFM - Angular 2';
  // breadcrumbs: any[];
  // test: Observable<Params>;
  // test: Observable<ActivatedRouteSnapshot>;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      //  .do((route) => console.log('?: ', route)) // aha! here!
      .mergeMap(route => route.data)


      .subscribe((event) => this.titleService.setTitle(event['title']));


    // this.test = this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .map(() => this.activatedRoute)
    //   .map(route => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   })
    //   .filter(route => route.outlet === 'primary')
    //   .map(route => route.snapshot)
    //   .do((snapshot) => console.log('snapshot: ', snapshot))
    // so there is route.snapshot.routeConfig.path > ":name/:albumName"
    // actually route.snapshot.url is array so can use that
    // but route to use for links?
    // parent.url.path
    // .map(route => ({ url: route.snapshot.url, params: route.snapshot.params, parent: route.snapshot.parent }))
    // just pass the bloody ActivatedRouteSnapshot in
    // .map(route => route.snapshot.params)
    // .do((o) => console.log('?: ', o));

    // this.test.subscribe((params) => console.log());

    /*
        this.router.events
          .filter(event => event instanceof NavigationEnd)
          .map(() => this.activatedRoute)
          .map(route => {
            while (route.firstChild) route = route.firstChild;
            return route;
          })
          .filter(route => route.outlet === 'primary')
          .map((route) => route.snapshot.url)
          // .do(url => console.log('?: ', url))
          // sweet! array starting at path: "The Cure"
          .subscribe((urlSegments) => this.breadcrumbs = urlSegments);*/
  }
}
