import {Component, provide}    from '@angular/core';
import {RouteConfig,
        RouterOutlet,
        ROUTER_DIRECTIVES,
        ROUTER_PROVIDERS}      from '@angular/router-deprecated';

import {HomeComponent}         from './home/home.component';
import {AboutComponent}        from './about/about.component';
import {ArtistComponent}       from './artist/artist.component';
import {AlbumComponent}        from './album/album.component';
import {ExploreComponent}      from './explore/explore.component';
import {LastFM}                from './services/lastfm.service';
import {LastFMConfig}          from './lastfm.config';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/explore', name: 'Explore', component: ExploreComponent },
    { path: '/artist/:name', name: 'Artist', component: ArtistComponent },
    { path: '/artist/:name/album/:mbid', name: 'Album', component: AlbumComponent }
])

@Component({
    selector: 'lastfm-app',
    directives: [RouterOutlet, ROUTER_DIRECTIVES],
    providers:[LastFM, LastFMConfig], // *
    template: `
        <div class="top-bar">
            <div class="row">
                <div class="top-bar-left">
                    <ul class="dropdown menu" data-dropdown-menu>
                        <li class="menu-text">{{title}}</li>
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
    title = 'LastFM - Angular 2'
}
/*
Or...
    provide('LastFMConfig', {
        useValue: {
            api_key: 'YOUR_API_KEY'
        }
    })
*/