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
var lastfm_service_new_1 = require('../services/lastfm.service.new');
var album_1 = require('./album');
var duration_pipe_1 = require('../pipes/duration-pipe');
var error_message_1 = require('../utils/error-message');
var AlbumComponent = (function () {
    // album:Observable<Album>; // why not? Why can't I have
    // this.album = this._lastFM.getAlbumInfo(this.mbid, {}) etc. like in home/search?
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
            .getAlbumInfo(mbid, {})
            .share();
        // console.log('pre album$  : ', album$, typeof album$);
        // Display album (if any)
        album$
            .filter(function (album) { return !!album.artist; }) // make sure is album data (note before subscribe!)
            .map(function (album) { return new album_1.Album(album); })
            .subscribe(function (album) {
            _this.album = album;
            console.log('album$ ::: ', album$);
        }, function (error) {
            _this.error = new error_message_1.ErrorMessage('Error', error);
        });
        // Display error (if any)
        album$
            .subscribe(function (data) {
            if (data.error) {
                _this.error = new error_message_1.ErrorMessage('Error', data.message || 'Nothing found...');
                return;
            }
        });
        // this.album = 
        /*this._lastFM
            .getAlbumInfo(this.mbid, {})
            // .subscribe(album => new Album(album));
            .subscribe(album => {

                 this.album = album.artist ? new Album(album) : null; // or would we want error?
                 // this.artist =  artist.name ? new Artist(artist) : null;
            },
            error => {
                console.log('HMMMM');
                this.error = new ErrorMessage('Error', <string>error);
            });*/
        /*if(!album.artist){
           // throw error??
           console.log('HERE! THROW'); // nope, is not caught
           throw new Error('This request has failed '); // Or do you handle errors in the service??
           // What if you want to do something else though - like not all users of the service want to
           // repond same way...
        }*/
        // Or have another sub that shows errors? like home...sort of
    };
    AlbumComponent = __decorate([
        core_1.Component({
            selector: 'album',
            pipes: [duration_pipe_1.TrackDurationPipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, breadcrumbs_component_1.BreadcrumbsComponent],
            templateUrl: 'app/js/album/album.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_new_1.LastFM, router_deprecated_1.RouteParams])
    ], AlbumComponent);
    return AlbumComponent;
}());
exports.AlbumComponent = AlbumComponent;
//# sourceMappingURL=album.component.js.map