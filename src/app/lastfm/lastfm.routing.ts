import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { LastFMComponent } from './lastfm.component';
import { ArtistComponent } from './artist.component';
import { AlbumComponent } from './album.component';
import { HomeComponent } from './home.component';

const lastfmRoutes: Routes = [
  {
    path: '',
    redirectTo: '/artist',
    pathMatch: 'full'
  },
  {
    path: 'artist',
    component: LastFMComponent,
    data: { title: 'Search' },
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        //   path: ':name/:mbid', // easier but messier url :-|
        path: ':name/:albumName',
        component: AlbumComponent,
        data: { title: 'Album' },
      },
      {
        path: ':name',
        component: ArtistComponent,
        data: { title: 'Artist' }
      }
    ]
  }
];

export const lastfmRouting: ModuleWithProviders = RouterModule.forChild(lastfmRoutes);
