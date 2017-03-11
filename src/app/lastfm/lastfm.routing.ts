import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { LastFMComponent } from './lastfm.component';
// Doesn't like us importing the following from './index'
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { SearchComponent } from './search/search.component';

const lastFMRoutes: Routes = [
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
        component: SearchComponent
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

export const lastFMRouting: ModuleWithProviders = RouterModule.forChild(lastFMRoutes);
