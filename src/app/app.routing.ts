import { Routes, RouterModule }    from '@angular/router';
import { HomeComponent }           from './home/home.component';
import { AboutComponent }          from './about/about.component';
import { ArtistComponent }         from './artist/artist.component';
import { AlbumComponent }          from './album/album.component';

const appRoutes: Routes = [
    { path: '',                    component: HomeComponent },
    { path: 'about',               component: AboutComponent },
    { path: 'artist/:name',        component: ArtistComponent },
    { path: 'artist/:name/:mbid',  component: AlbumComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
