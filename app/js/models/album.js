System.register([], function(exports_1) {
    var Album;
    return {
        setters:[],
        execute: function() {
            Album = (function () {
                // constructor(artist: any,
                //             image: Array<any>,
                //             mbid: string,
                //             name: string,
                //             playcount: Number = 0,
                //             url: string = '',
                //             listeners:string = '',
                //             tracks: any = {}
                // )
                function Album(album) {
                    this.artist = album.artist;
                    this.image = album.image;
                    this.images = this.image ? this.getImages(this.image) : {};
                    this.mbid = album.mbid;
                    this.name = album.name;
                    this.playcount = album.playcount || 0;
                    this.url = album.url || '';
                    this.listeners = album.listeners || '';
                    this.tracks = album.tracks || {};
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