System.register([], function(exports_1) {
    var Artist;
    return {
        setters:[],
        execute: function() {
            Artist = (function () {
                function Artist(name, mbid, image, url, bio, ontour, similar, stats, streamable, tags) {
                    if (name === void 0) { name = ''; }
                    if (mbid === void 0) { mbid = ''; }
                    if (image === void 0) { image = []; }
                    if (url === void 0) { url = ''; }
                    if (bio === void 0) { bio = {}; }
                    if (ontour === void 0) { ontour = '0'; }
                    if (similar === void 0) { similar = {}; }
                    if (stats === void 0) { stats = {}; }
                    if (streamable === void 0) { streamable = '0'; }
                    if (tags === void 0) { tags = {}; }
                    this.name = name;
                    this.mbid = mbid;
                    this.image = image;
                    this.url = url;
                    this.images = this.getImages(image);
                    this.bio = bio;
                    this.ontour = ontour;
                    this.similar = similar;
                    this.stats = stats;
                    this.streamable = streamable;
                    this.tags = tags;
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
                return Artist;
            })();
            exports_1("Artist", Artist);
        }
    }
});
//# sourceMappingURL=artist.js.map