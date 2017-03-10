import { NgModule, ValueProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LastFMComponent } from './lastfm.component';
import { ArtistComponent } from './artist.component';
import { AlbumComponent } from './album.component';
import { HomeComponent } from './home.component';
import { TrackList } from './track-list.component';
import { AlbumList } from './album-list.component';
import { SimilarList } from './similar-list.component';
import { Potentials } from './potentials.component';

import { LastFM } from './lastfm.service';
import { LastFMConfig } from '../lastfm.config';
import { pipes, SimpleBreadcrumbsComponent } from '../shared/';
import { lastfmRouting } from './lastfm.routing';

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
    lastfmRouting
  ],
  declarations: [
    ArtistComponent,
    AlbumComponent,
    HomeComponent,
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
