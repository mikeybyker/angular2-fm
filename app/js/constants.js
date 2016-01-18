System.register([], function(exports_1) {
    var LASTFM;
    return {
        setters:[],
        execute: function() {
            exports_1("LASTFM", LASTFM = {
                baseurl: 'http://ws.audioscrobbler.com/2.0/',
                api_key: '636d81e5364ebc98a99d202c57268f18',
                format: 'json'
            });
        }
    }
});
//# sourceMappingURL=constants.js.map