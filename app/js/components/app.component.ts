import {Component}         from '@angular/core';
import {RouteConfig,
        RouterOutlet,
        ROUTER_DIRECTIVES,
        ROUTER_PROVIDERS}  from '@angular/router-deprecated';

import {HomeComponent}     from './home.component';
import {AboutComponent}    from './about.component';
import {ArtistComponent}   from './artist.component';
import {AlbumComponent}    from './album.component';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/artist/:name', name: 'Artist', component: ArtistComponent },
    { path: '/artist/:name/album/:mbid', name: 'Album', component: AlbumComponent }
])

@Component({
    selector: 'lastfm-app',
    directives: [RouterOutlet, ROUTER_DIRECTIVES],
    template: `
                <div class="top-bar">
                    <div class="row">
                        <div class="top-bar-left">
                            <ul class="dropdown menu" data-dropdown-menu>
                                <li class="menu-text">Angular2-FM</li>
                                <li><a [routerLink]="['Home']">Home</a></li>
                                <li><a [routerLink]="['About']">About</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <router-outlet></router-outlet>
        `
})
export class AppComponent {

}