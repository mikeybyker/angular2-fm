// https://www.npmjs.com/package/angular2-spotify
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
// endPoint : 'http://ws.audioscrobbler.com/2.0/'
// format: 'json'
var LastFM = (function () {
    function LastFM(config, http) {
        this.config = config;
        this.http = http;
        config.endPoint || (config.endPoint = 'http://ws.audioscrobbler.com/2.0/');
        config.format || (config.format = 'json');
    }
    LastFM.prototype.createParams = function (settings, options) {
        if (settings === void 0) { settings = {}; }
        if (options === void 0) { options = {}; }
        // let params = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
        var params = Object.assign({ format: this.config.format, api_key: this.config.api_key }, options, settings), search = new http_1.URLSearchParams();
        // console.log('params ::: ', params);
        // Really?!
        for (var key in params) {
            search.set(key, params[key]);
        }
        return search;
    };
    LastFM.prototype.handleError = function (error) {
        console.error('handleError ::: ', error);
        return Observable_1.Observable.throw(error.json().message || 'Server Error');
    };
    LastFM.prototype.checkCanShow = function (results) {
        if (!results || !results.artistmatches) {
            return false;
        }
        // Having at least one potential to show from the results is nice...
        function hasImage(element, index, array) {
            return !!element['#text'];
        }
        return results.artistmatches.artist.some(function (element, index, array) { return element.mbid && element.image.some(hasImage); });
    };
    /*
        Check there's a mbid and at least an extralarge image source
    */
    LastFM.prototype.checkUsableImage = function (result) {
        if (result.mbid && result.image && result.image[3] && result.image[3]['#text'] !== '') {
            return true;
        }
        return false;
    };
    LastFM.prototype._http = function (settings, options) {
        if (settings === void 0) { settings = {}; }
        if (options === void 0) { options = {}; }
        var params = this.createParams(options, settings);
        return this.http.get(this.config.endPoint, { search: params });
    };
    /**
    *    @data : received from lastfm
    *    @path : the path to the required data eg. 'results.artistmatches.artist'
    *    @empty: what to return if there were no results
    */
    LastFM.prototype.validateData = function (data, path, empty) {
        if (data === void 0) { data = {}; }
        if (path === void 0) { path = ''; }
        if (empty === void 0) { empty = []; }
        if (data && data.error) {
            // console.warn('lastfm error');
            return data;
        }
        var value = path.split('.').reduce(function (a, b) { return a[b] || {}; }, data);
        // console.log('validateData ::: ', value);
        return Object.keys(value).length === 0 ? empty : value;
    }; // @todo - what about error! lastfm data error....
    LastFM.prototype.searchArtists = function (artist, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this._http({ method: 'artist.search', artist: artist }, options)
            .map(function (res) { return res.json(); })
            .map(function (data) { return _this.validateData(data, 'results.artistmatches.artist'); })
            .catch(this.handleError);
    };
    LastFM.prototype.getArtistInfo = function (artistName, options) {
        var _this = this;
        if (artistName === void 0) { artistName = 'The Cure'; }
        if (options === void 0) { options = {}; }
        return this._http({ method: 'artist.getInfo', artist: artistName }, options)
            .map(function (res) { return res.json(); })
            .map(function (data) { return _this.validateData(data, 'artist', { error: true, message: 'Data error' }); })
            .catch(this.handleError);
    };
    LastFM.prototype.getTopAlbums = function (artistName, options) {
        var _this = this;
        if (artistName === void 0) { artistName = 'The Cure'; }
        if (options === void 0) { options = {}; }
        return this._http({ method: 'artist.getTopAlbums', artist: artistName }, options)
            .map(function (res) { return res.json(); })
            .map(function (data) { return _this.validateData(data, 'topalbums.album'); })
            .catch(this.handleError);
    };
    LastFM = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('LastFMConfig')), 
        __metadata('design:paramtypes', [Object, http_1.Http])
    ], LastFM);
    return LastFM;
}());
exports.LastFM = LastFM;
//# sourceMappingURL=lastfm.service.new.js.map