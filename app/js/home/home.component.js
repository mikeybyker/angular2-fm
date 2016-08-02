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
var lastfm_service_new_1 = require('../services/lastfm.service.new');
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
        // console.log('this._lastFM.artist.search : ', this._lastFM.artist().search);
        // console.log('this._lastFM.xxx.search : ', this._lastFM.xxx.search);
        var search$ = this._lastFM
            .Artist.search(this.model.artist, { limit: this.maxResults })
            .share(); // so we don't get 2 network requests with the subscription for error handling (below...)
        // Note: not subscribe! Does the async pipe do that for you? "and subscribes to the input automatically," - Yes!            
        this.potentials = search$
            .map(function (artists) {
            return artists
                .filter(function (artist) { return _this._lastFM.checkUsableImage(artist); })
                .map(function (artist) { return new artist_1.Artist(artist); });
        });
        // .do(data => console.log(data));
        /*
        If I type the return of searchArtists...
        then it will complain on data.error below - no such on the Observable<Array<any>>
        Cos - if successful - get an array returned
        If data error - get object
        How to deal with that?!
        Maybe just : :Observable<any>
        Rather than specifying array of anything...
        */
        search$
            .subscribe(function (data) {
            if (!data.length || data.error) {
                _this.error = new error_message_1.ErrorMessage('Error', data.message || 'Nothing found...');
                return;
            }
        }, function (error) {
            // Keeping this for http errors
            _this.error = new error_message_1.ErrorMessage('Error', error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            pipes: [results_pipe_1.ResultsPipe, limit_pipe_1.LimitPipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            templateUrl: 'app/js/home/home.component.html'
        }), 
        __metadata('design:paramtypes', [lastfm_service_new_1.LastFM])
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