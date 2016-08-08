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
var lastfm_service_1 = require('../lastfm/lastfm.service');
var artist_1 = require('../artist/artist');
var limit_pipe_1 = require('../pipes/limit-pipe');
var results_pipe_1 = require('../pipes/results-pipe');
var error_message_1 = require('../utils/error-message');
var HomeComponent = (function () {
    function HomeComponent(_lastFM) {
        this._lastFM = _lastFM;
        this.model = { artist: 'The Cure' };
        this.maxResults = 10;
    }
    HomeComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.model.artist);
        this.error = null;
        var search$ = this._lastFM
            .Artist.search(this.model.artist, { limit: this.maxResults })
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)
        this.potentials = search$
            .map(function (artists) {
            return artists
                .filter(function (artist) { return _this._lastFM.checkUsableImage(artist); })
                .map(function (artist) { return new artist_1.Artist(artist); });
        });
        search$
            .subscribe(function (data) {
            if (!data.length || data.error) {
                _this.error = new error_message_1.ErrorMessage('Error', data.message || 'Nothing found...');
                return;
            }
        }, function (error) {
            // http errors
            _this.error = new error_message_1.ErrorMessage('Error', error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            moduleId: module.id,
            pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe],
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_1.LastFM])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
/*
When *not* using the angular async pipe...
onSubmit() {
    console.log(this.model.artist);
    this.error = null;
    this.lastFmService
        .searchArtists(this.model.artist, { limit: this.maxResults })
        .subscribe(data => {
            if (data.error || !data.length) {
                this.error = new ErrorMessage('Error', data.message || 'Nothing found...');
                this.potentials = [];
                return;
            }
            this.potentials = data;
        },
        error => {
            this.error = new ErrorMessage('Error', <any>error);
        });
}
*/ 
//# sourceMappingURL=home.component.js.map