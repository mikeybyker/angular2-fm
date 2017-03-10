import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, UrlSegment, RouterStateSnapshot, Params, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'simple-breadcrumbs',
  templateUrl: './simple-breadcrumbs.component.html',
  styleUrls: ['./simple-breadcrumbs.component.css']
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
    let segments: UrlSegment[] = [];
    node.pathFromRoot.forEach(routerState => {
      segments = segments.concat(routerState.url);
    });

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
