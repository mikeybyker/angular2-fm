import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppComponent }         from './app.component';
import { ExploreModule }        from './explore/explore.module';
import { LastFM }               from './lastfm/lastfm.service';
import { routing }              from './app.routing';

import { HomeComponent }        from './home/home.component';
import { AboutComponent }       from './about/about.component';
import { ArtistComponent }      from './artist/artist.component';
import { AlbumComponent }       from './album/album.component';
import { BreadcrumbsComponent } from './utils/breadcrumbs.component';
import { LastFMConfig }         from './lastfm.config';

import { TrackDurationPipe }    from './pipes/duration-pipe';
import { ResultsPipe }          from './pipes/results-pipe';
import { LimitPipe }            from './pipes/limit-pipe';
import { ExternalHrefPipe }     from './pipes/external-href-pipe';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ArtistComponent,
        AlbumComponent,
        BreadcrumbsComponent,
        TrackDurationPipe,
        ResultsPipe,
        LimitPipe,
        ExternalHrefPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ExploreModule,
        routing, 
        HttpModule
    ],
    providers: [
        LastFM,
        LastFMConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
