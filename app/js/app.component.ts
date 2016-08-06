import {Component, provide}    from '@angular/core';
import {ROUTER_DIRECTIVES}     from '@angular/router';

import {HomeComponent}         from './home/home.component';
import {AboutComponent}        from './about/about.component';
import {ArtistComponent}       from './artist/artist.component';
import {AlbumComponent}        from './album/album.component';
import {ExploreComponent}      from './explore/explore.component';
import {LastFM}                from './services/lastfm.service';
import {LastFMConfig}          from './lastfm.config';

@Component({
    selector: 'lastfm-app',
    directives: [ROUTER_DIRECTIVES],
    precompile: [HomeComponent, AboutComponent, ArtistComponent, AlbumComponent, ExploreComponent],
    providers:[LastFM, LastFMConfig], // *
    template: `
        <div class="top-bar">
            <div class="top-bar-left">
                <ul class="menu">
                    <li class="menu-text">{{title}}</li>
                    <li><a [routerLink]="['']">Home</a></li>
                    <li><a [routerLink]="['/about']">About</a></li>
                </ul>
            </div>
            <div class="top-bar-right">
                <ul class="menu">
                    <li><a [routerLink]="['/explore']">Explore API</a></li>
                </ul>
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