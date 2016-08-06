"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var artist_component_1 = require('./artist/artist.component');
var album_component_1 = require('./album/album.component');
var explore_component_1 = require('./explore/explore.component');
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'explore', component: explore_component_1.ExploreComponent },
    { path: 'artist/:name', component: artist_component_1.ArtistComponent },
    { path: 'artist/:name/:mbid', component: album_component_1.AlbumComponent }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map