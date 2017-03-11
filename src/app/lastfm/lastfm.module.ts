import {
  NgModule,
  ValueProvider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  LastFMComponent,
  ArtistComponent,
  AlbumComponent,
  SearchComponent,
  TrackList,
  AlbumList,
  SimilarList,
  Potentials,
  LastFM,
  lastFMRouting
} from './index';

import { LastFMConfig } from '../lastfm.config';
import { pipes, SimpleBreadcrumbsComponent } from '../shared/';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    lastFMRouting
  ],
  declarations: [
    ArtistComponent,
    AlbumComponent,
    SearchComponent,
    LastFMComponent,
    TrackList,
    AlbumList,
    SimilarList,
    Potentials,
    SimpleBreadcrumbsComponent,
    pipes
  ],
  providers: [
    LastFM,
    LastFMConfig
  ]
})
export class LastFMModule { }
