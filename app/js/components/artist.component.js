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
var breadcrumbs_component_1 = require('./breadcrumbs.component');
var lastfm_service_1 = require('../services/lastfm.service');
var results_pipe_1 = require('../pipes/results-pipe');
var limit_pipe_1 = require('../pipes/limit-pipe');
var external_href_pipe_1 = require('../pipes/external-href-pipe');
var error_message_1 = require('../utils/error-message');
var ArtistComponent = (function () {
    function ArtistComponent(lastFmService, _routeParams) {
        this.lastFmService = lastFmService;
        this._routeParams = _routeParams;
        this.albums = [];
        this.links = [];
        this.maxAlbums = 12;
    }
    ArtistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.artistName = decodeURI(this._routeParams.get('name')); // necc?
        if (!this.artistName) {
            this.error = new error_message_1.ErrorMessage('Error', 'Artist not specified');
            return;
        }
        this.error = null;
        this.links.push({ title: this.artistName, url: "artist/" + this.artistName });
        this.lastFmService
            .getAllArtist(this.artistName, {}, { limit: this.maxAlbums })
            .subscribe(function (data) {
            var artist = data[0], albums = data[1];
            if (artist.error || albums.error) {
                _this.error = new error_message_1.ErrorMessage('Error', artist.error ? artist.message : albums.message);
                return;
            }
            _this.artist = artist;
            console.log(albums);
            _this.albums = albums;
        }, function (error) {
            _this.error = new error_message_1.ErrorMessage('Error', error);
        });
    };
    ArtistComponent = __decorate([
        core_1.Component({
            selector: 'artist',
            providers: [lastfm_service_1.LastFmService],
            pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe, external_href_pipe_1.ExternalHrefPipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent],
            // styles: [`
            //   .foo {
            //     background-image: {{artist.images.extralarge}}; // this would be nice!
            //   }`],
            templateUrl: './app/views/artist.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_1.LastFmService, router_deprecated_1.RouteParams])
    ], ArtistComponent);
    return ArtistComponent;
}());
exports.ArtistComponent = ArtistComponent;
//# sourceMappingURL=artist.component.js.map