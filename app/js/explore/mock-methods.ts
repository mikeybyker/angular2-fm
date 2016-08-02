
export const METHODS:any[] = [
            // Album

            {
                id: 1, fn: 'Album.getInfo', name: 'Get Info', group:'Album',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name Or mbid', required: true, default:'91fa2331-d8b4-4d1f-aa4d-53b1c54853e5'},
                            {id: 'albumName', label:'Album Name', required: true}
                            ]
            },
            {
                id: 2, fn: 'Album._getInfo', name: 'Get Info - Full', group:'Album',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name Or mbid', required: true},
                            {id: 'albumName', label:'Album Name', required: true}
                            ]
            },
            {
                id: 4, fn: 'Album.getTopTags', name: 'Get Top Tags', group:'Album',
                    params:[
                            // {id: 'artistOrMbid', label:'Artist Name Or mbid', required: true, default:'91fa2331-d8b4-4d1f-aa4d-53b1c54853e5'},
                            {id: 'artistName', label:'Artist Name', required: true, default:'The Cure'},
                            {id: 'albumName', label:'Album Name', required: true}
                            ]  // tags do not work with mbid despite what lastfm docs say
            },
            {
                id: 5, fn: 'Album._getTopTags', name: 'Get Top Tags - Full', group:'Album',
                    params:[
                            {id: 'artistName', label:'Artist Name', required: true, default:'The Cure'},
                            {id: 'albumName', label:'Album Name', required: true, default:'Faith'}
                            ]  // tags do not work with mbid despite what lastfm docs say
            },
            {
                id: 7, fn: 'Album.search', name: 'Search by Album', group:'Album',
                    params:[
                            {id: 'albumName', label:'Album Name', required: true}
                            ]
            },
            {
                id: 8, fn: 'Album._search', name: 'Search by Album - Full', group:'Album',
                    params:[
                            {id: 'albumName', label:'Album Name', required: true}
                            ]
            },


            // Artist
            {
                id: 20, fn: 'Artist.getInfo', name: 'Get Artist Info', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 21, fn: 'Artist._getInfo', name: 'Get Artist Info - Full', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 23, fn: 'Artist.getSimilar', name: 'Get Similar', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 24, fn: 'Artist._getSimilar', name: 'Get Similar - Full', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 26, fn: 'Artist.getTopAlbums', name: 'Get Top Albums', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 27, fn: 'Artist._getTopAlbums', name: 'Get Top Albums - Full', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 29, fn: 'Artist.getTopTags', name: 'Get Top Tags', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 30, fn: 'Artist._getTopTags', name: 'Get Top Tags - Full', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 32, fn : 'Artist.getTopTracks', name: 'Get Top Tracks', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 33, fn : 'Artist._getTopTracks', name: 'Get Top Tracks - Full', group:'Artist',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'69ee3720-a7cb-4402-b48d-a02c366f2bcf'}
                            ]
            },
            {
                id: 35, fn : 'Artist.search', name: 'Search by Artist', group:'Artist',
                    params:[
                            {id: 'artistName', label:'Artist Name', required: true}
                            ]
            },
            {
                id: 36, fn : 'Artist._search', name: 'Search by Artist - Full', group:'Artist',
                    params:[
                            {id: 'artistName', label:'Artist Name', required: true}
                            ]
            },

            // Charts
            {
                id: 40, fn : 'Charts.getTopArtists', name: 'Get Top Artists', group:'Charts',
                    params:[]
            },
            {
                id: 41, fn : 'Charts._getTopArtists', name: 'Get Top Artists - Full', group:'Charts',
                    params:[]
            },
            {
                id: 43, fn : 'Charts.getTopTags', name: 'Get Top Tags', group:'Charts',
                    params:[]
            },
            {
                id: 44, fn : 'Charts._getTopTags', name: 'Get Top Tags - Full', group:'Charts',
                    params:[]
            },
            {
                id: 46, fn : 'Charts.getTopTracks', name: 'Get Top Tracks', group:'Charts',
                    params:[]
            },
            {
                id: 47, fn : 'Charts._getTopTracks', name: 'Get Top Tracks Full', group:'Charts',
                    params:[]
            },

            // Geo
            {
                id: 60, fn : 'Geo.getTopArtists', name: 'Get Top Artists', group:'Geo',
                    params:[
                            {id: 'country', label:'Country (United Kingdom, Iceland etc.)', required: true}
                            ]
            },
            {
                id: 61, fn : 'Geo._getTopArtists', name: 'Get Top Artists - Full', group:'Geo',
                    params:[
                            {id: 'country', label:'Country (United Kingdom, Iceland etc.)', required: true}
                            ]
            },
            {
                id: 63, fn : 'Geo.getTopTracks', name: 'Get Top Tracks', group:'Geo',
                    params:[
                            {id: 'country', label:'Country (United Kingdom, Iceland)', required: true}
                            ]
            },
            {
                id: 64, fn : 'Geo._getTopTracks', name: 'Get Top Tracks - Full', group:'Geo',
                    params:[
                            {id: 'country', label:'Country (United Kingdom, Iceland)', required: true}
                            ]
            },

            // Track
            {
                id: 80, fn : 'Track.getInfo', name: 'Get Info', group:'Track',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'e7da35ed-ad25-4721-a3b2-43784fa4f856'},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            },
            {
                id: 81, fn : 'Track._getInfo', name: 'Get Info - Full', group:'Track',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'e7da35ed-ad25-4721-a3b2-43784fa4f856'},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            },
            {
                id: 83, fn : 'Track.getSimilar', name: 'Get Similar', group:'Track',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'e7da35ed-ad25-4721-a3b2-43784fa4f856'},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            },
            {
                id: 84, fn : 'Track._getSimilar', name: 'Get Similar - Full', group:'Track',
                    params:[
                            {id: 'artistOrMbid', label:'Artist Name or mbid', required: true, default:'e7da35ed-ad25-4721-a3b2-43784fa4f856'},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            },
            {
                id: 86, fn : 'Track.getTopTags', name: 'Get Top Tags', group:'Track',
                    params:[
                            {id: 'artistName', label:'Artist Name', required: true},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]  // tags do not work with mbid despite what lastfm docs say
            },
            {
                id: 87, fn : 'Track._getTopTags', name: 'Get Top Tags - Full', group:'Track',
                    params:[
                            {id: 'artistName', label:'Artist Name', required: true},
                            {id: 'trackName', label:'Track Name', required: true}
                            ]  // tags do not work with mbid despite what lastfm docs say
            },
            {
                id: 89, fn : 'Track.search', name: 'Search', group:'Track',
                    params:[
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            },
            {
                id: 90, fn : 'Track._search', name: 'Search - Full', group:'Track',
                    params:[
                            {id: 'trackName', label:'Track Name', required: true}
                            ]
            }
        ];