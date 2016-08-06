"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var artist_component_1 = require('./artist/artist.component');
var album_component_1 = require('./album/album.component');
var explore_component_1 = require('./explore/explore.component');
var lastfm_service_1 = require('./lastfm/lastfm.service');
var lastfm_config_1 = require('./lastfm.config');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'LastFM - Angular 2';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'lastfm-app',
            directives: [router_1.ROUTER_DIRECTIVES],
            precompile: [home_component_1.HomeComponent, about_component_1.AboutComponent, artist_component_1.ArtistComponent, album_component_1.AlbumComponent, explore_component_1.ExploreComponent],
            providers: [lastfm_service_1.LastFM, lastfm_config_1.LastFMConfig],
            template: "\n        <div class=\"top-bar\">\n            <div class=\"top-bar-left\">\n                <ul class=\"menu\">\n                    <li class=\"menu-text\">{{title}}</li>\n                    <li><a [routerLink]=\"['']\">Home</a></li>\n                    <li><a [routerLink]=\"['/about']\">About</a></li>\n                </ul>\n            </div>\n            <div class=\"top-bar-right\">\n                <ul class=\"menu\">\n                    <li><a [routerLink]=\"['/explore']\">Explore API</a></li>\n                </ul>\n            </div>\n        </div>\n        <router-outlet></router-outlet>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
Or...
    provide('LastFMConfig', {
        useValue: {
            api_key: 'YOUR_API_KEY'
        }
    })
*/ 
//# sourceMappingURL=app.component.js.map