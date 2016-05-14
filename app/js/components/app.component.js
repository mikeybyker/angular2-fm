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
var router_deprecated_1 = require('@angular/router-deprecated');
var home_component_1 = require('./home.component');
var about_component_1 = require('./about.component');
var artist_component_1 = require('./artist.component');
var album_component_1 = require('./album.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
            { path: '/about', name: 'About', component: about_component_1.AboutComponent },
            { path: '/artist/:name', name: 'Artist', component: artist_component_1.ArtistComponent },
            { path: '/artist/:name/album/:mbid', name: 'Album', component: album_component_1.AlbumComponent }
        ]),
        core_1.Component({
            selector: 'lastfm-app',
            directives: [router_deprecated_1.RouterOutlet, router_deprecated_1.ROUTER_DIRECTIVES],
            template: "\n                <div class=\"top-bar\">\n                    <div class=\"row\">\n                        <div class=\"top-bar-left\">\n                            <ul class=\"dropdown menu\" data-dropdown-menu>\n                                <li class=\"menu-text\">Angular2-FM</li>\n                                <li><a [routerLink]=\"['Home']\">Home</a></li>\n                                <li><a [routerLink]=\"['About']\">About</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n\n                <router-outlet></router-outlet>\n        "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map