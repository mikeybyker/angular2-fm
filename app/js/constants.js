System.register([], function(exports_1) {
    var LASTFM;
    return {
        setters:[],
        execute: function() {
            exports_1("LASTFM", LASTFM = {
                apiEndpoint: 'http://ws.audioscrobbler.com/2.0/',
                api_key: 'YOUR_API_KEY',
                format: 'json'
            });
        }
    }
});
//# sourceMappingURL=constants.js.map