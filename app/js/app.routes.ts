import {provideRouter, RouterConfig}   from '@angular/router';
import {HomeComponent}                 from './home/home.component';
import {AboutComponent}                from './about/about.component';
import {ArtistComponent}               from './artist/artist.component';
import {AlbumComponent}                from './album/album.component';
import {ExploreComponent}              from './explore/explore.component';

const routes: RouterConfig = [
    { path: '',                    component: HomeComponent },
    { path: 'about',               component: AboutComponent },
    { path: 'explore',             component: ExploreComponent },
    { path: 'artist/:name',        component: ArtistComponent },
    { path: 'artist/:name/:mbid',  component: AlbumComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];