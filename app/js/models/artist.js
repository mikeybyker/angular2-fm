"use strict";
var Artist = (function () {
    function Artist(artist) {
        this.name = artist.name || '';
        this.mbid = artist.mbid || '';
        this.image = artist.image || [];
        this.url = artist.url || '';
        this.images = this.image.length ? this.getImages(this.image) : {};
        this.bio = artist.bio || {};
        this.ontour = artist.ontour || '0';
        this.similar = artist.similar ? this.createSimilarArtists(artist.similar) : [];
        this.stats = artist.stats || {};
        this.streamable = artist.streamable || '0';
        this.tags = artist.tags || {};
    }
    // Convert last.fm array for easier use
    Artist.prototype.getImages = function (image) {
        // image is the array of images from last fm
        // small, medium, large, extralarge, mega
        // let [small, medium, large, extralarge, mega] = image;
        // return {
        //     small,
        //     medium,
        //     large,
        //     extralarge,
        //     mega,
        // }
        var o = {};
        image
            .filter(function (o) { return o['#text']; })
            .forEach(function (element, index, array) { return o[element.size] = element['#text']; });
        return o;
    };
    Artist.prototype.createSimilarArtists = function (similar) {
        if (!similar || !similar.artist) {
            return [];
        }
        return similar.artist.map(function (artist) {
            return new Artist(artist);
        });
    };
    return Artist;
}());
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map