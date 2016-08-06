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
var breadcrumbs_component_1 = require('../utils/breadcrumbs.component');
var lastfm_service_1 = require('../services/lastfm.service');
var album_1 = require('./album');
var duration_pipe_1 = require('../pipes/duration-pipe');
var error_message_1 = require('../utils/error-message');
var AlbumComponent = (function () {
    function AlbumComponent(_lastFM, _routeParams) {
        this._lastFM = _lastFM;
        this._routeParams = _routeParams;
        this.links = [];
    }
    AlbumComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.artistName = this._routeParams.get('name');
        var mbid = this._routeParams.get('mbid');
        this.links.push({ title: decodeURI(this.artistName), url: "artist/" + this.artistName });
        if (!this.artistName || !mbid) {
            this.error = new error_message_1.ErrorMessage('Error', 'Did not find an album to look for...');
            return;
        }
        this.error = null;
        var album$ = this._lastFM
            .Album.getInfo(mbid)
            .share();
        // Display album (if any) - async pipe
        this.album = album$
            .filter(function (album) { return !!album.artist; }) // make sure is album data (note before subscribe!)
            .map(function (album) { return new album_1.Album(album); });
        // Update the breadcrumbs with the album name
        this.album
            .subscribe(function (album) {
            _this.links.push({ title: album.name });
        });
        // Display error (if any)
        album$
            .subscribe(function (data) {
            if (data.error) {
                _this.error = new error_message_1.ErrorMessage('Error', data.message || 'Nothing found...');
                return;
            }
        });
    };
    AlbumComponent = __decorate([
        core_1.Component({
            selector: 'album',
            pipes: [duration_pipe_1.TrackDurationPipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent],
            templateUrl: 'app/js/album/album.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_1.LastFM, router_deprecated_1.RouteParams])
    ], AlbumComponent);
    return AlbumComponent;
}());
exports.AlbumComponent = AlbumComponent;
// Alt.
// album$
//     .filter(album => !!album.artist)
//     .map(album => new Album(album))
//     .subscribe(album => {
//          this.album = album;
//     },
//     error => {
//         this.error = new ErrorMessage('Error', <string>error);
//     }); 
//# sourceMappingURL=album.component.js.map