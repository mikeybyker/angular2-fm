System.register(['angular2/http', 'angular2/core', 'rxjs/Observable', '../models/artist', '../models/album', '../constants'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, Observable_1, artist_1, album_1, constants_1;
    var LastFmService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (artist_1_1) {
                artist_1 = artist_1_1;
            },
            function (album_1_1) {
                album_1 = album_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            LastFmService = (function () {
                function LastFmService(http) {
                    this.http = http;
                }
                /**
                * (Hopefully) URLSearchParams will change in next beta etc. to allow passing in object
                * Currently setAll will not accept this, and all it does is the same thing - loop over.
                * !! Watch out for Object.assign
                */
                LastFmService.prototype.createParams = function (options, requestParams) {
                    if (options === void 0) { options = {}; }
                    if (requestParams === void 0) { requestParams = {}; }
                    // let combined = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
                    var combined = Object.assign({ format: constants_1.LASTFM.format, api_key: constants_1.LASTFM.api_key }, options, requestParams), params = new http_1.URLSearchParams();
                    for (var key in combined) {
                        params.set(key, combined[key]);
                    }
                    return params;
                };
                LastFmService.prototype.handleError = function (error) {
                    console.error('handleError ::: ', error);
                    return Observable_1.Observable.throw(error.json().message || 'Server Error');
                };
                /**
                * Observable.forkJoin : along the lines of $q.all... Remember to import it!
                */
                LastFmService.prototype.getAllArtist = function (artist, options, optionsAlbums) {
                    if (artist === void 0) { artist = 'The Cure'; }
                    if (options === void 0) { options = {}; }
                    if (optionsAlbums === void 0) { optionsAlbums = {}; }
                    return Observable_1.Observable.forkJoin(this.getArtistInfo(artist, options), this.getTopAlbums(artist, optionsAlbums));
                };
                LastFmService.prototype.getArtistInfo = function (artistName, options) {
                    if (artistName === void 0) { artistName = 'The Cure'; }
                    if (options === void 0) { options = {}; }
                    var params = this.createParams(options, { method: 'artist.getInfo', artist: artistName });
                    return this.http.get(constants_1.LASTFM.apiEndpoint, { search: params })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log('getArtistInfo ::: ', data); })
                        .map(function (data) {
                        if (!data.artist) {
                            return data;
                        }
                        return new artist_1.Artist(data.artist);
                    })
                        .catch(this.handleError);
                };
                LastFmService.prototype.getTopAlbums = function (artistName, options) {
                    if (artistName === void 0) { artistName = 'The Cure'; }
                    if (options === void 0) { options = {}; }
                    var params = this.createParams(options, { method: 'artist.getTopAlbums', artist: artistName });
                    return this.http.get(constants_1.LASTFM.apiEndpoint, { search: params })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log('getTopAlbums ::: ', data); })
                        .map(function (data) {
                        if (!data.topalbums || !data.topalbums.album) {
                            return data;
                        }
                        var albums = [];
                        data.topalbums.album.forEach(function (album) {
                            albums.push(new album_1.Album(album));
                        });
                        return albums;
                    })
                        .catch(this.handleError);
                };
                LastFmService.prototype.getAlbumInfo = function (mbid, options) {
                    if (options === void 0) { options = {}; }
                    var params = this.createParams(options, { method: 'album.getInfo', mbid: mbid });
                    return this.http.get(constants_1.LASTFM.apiEndpoint, { search: params })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .map(function (data) {
                        if (!data.album) {
                            return data;
                        }
                        return new album_1.Album(data.album);
                    })
                        .catch(this.handleError);
                };
                LastFmService.prototype.checkCanShow = function (results) {
                    if (!results || !results.artistmatches) {
                        return false;
                    }
                    // Having at least one potential to show from the results is nice...
                    function hasImage(element, index, array) {
                        return !!element['#text'];
                    }
                    return results.artistmatches.artist.some(function (element, index, array) { return element.mbid && element.image.some(hasImage); });
                };
                LastFmService.prototype.searchArtists = function (artist, options) {
                    var _this = this;
                    if (options === void 0) { options = {}; }
                    var params = this.createParams(options, { method: 'artist.search', artist: artist });
                    return this.http.get(constants_1.LASTFM.apiEndpoint, { search: params })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .map(function (data) {
                        if (!data.results) {
                            return data;
                        }
                        var results = [];
                        if (_this.checkCanShow(data.results)) {
                            var artists = data.results.artistmatches.artist;
                            artists.forEach(function (artist) {
                                results.push(new artist_1.Artist(artist));
                            });
                        }
                        return results;
                    })
                        .catch(this.handleError);
                };
                LastFmService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LastFmService);
                return LastFmService;
            })();
            exports_1("LastFmService", LastFmService);
        }
    }
});
//# sourceMappingURL=lastfm.service.js.map