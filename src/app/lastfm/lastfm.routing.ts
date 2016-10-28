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
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':name/:mbid',
        component: AlbumComponent
      },
      {
        path: ':name',
        component: ArtistComponent
      }
    ]
  }
];

export const lastfmRouting: ModuleWithProviders = RouterModule.forChild(lastfmRoutes);
