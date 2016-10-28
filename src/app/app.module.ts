import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LastFMModule } from './lastfm/lastfm.module';
import { ExploreModule } from './explore/explore.module';
import { AboutComponent } from './about/about.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ExploreModule,
    routing,
    LastFMModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
