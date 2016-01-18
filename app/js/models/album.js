System.register([], function(exports_1) {
    var Album;
    return {
        setters:[],
        execute: function() {
            Album = (function () {
                function Album(artist, image, mbid, name, playcount, url, listeners, tracks) {
                    if (playcount === void 0) { playcount = 0; }
                    if (url === void 0) { url = ''; }
                    if (listeners === void 0) { listeners = ''; }
                    if (tracks === void 0) { tracks = {}; }
                    this.artist = artist;
                    this.image = image;
                    this.images = this.getImages(image);
                    this.mbid = mbid;
                    this.name = name;
                    this.playcount = playcount;
                    this.url = url;
                    this.listeners = listeners;
                    this.tracks = tracks;
                }
                // Convert last.fm array for easier use
                Album.prototype.getImages = function (image) {
                    // image is the array of images from last fm
                    // small, medium, large, extralarge, mega
                    var o = {};
                    image
                        .filter(function (o) { return o['#text']; })
                        .forEach(function (element, index, array) { return o[element.size] = element['#text']; });
                    return o;
                };
                return Album;
            })();
            exports_1("Album", Album);
        }
    }
});
//# sourceMappingURL=album.js.map