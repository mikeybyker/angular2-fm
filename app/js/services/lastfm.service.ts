import {Http, Response, Headers} from 'angular2/http';
import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {LASTFM} from '../constants';

@Injectable()
export class LastFmService {

    constructor(public http: Http) {
        
    }

    createUrl(options:any = {}) :string {
        let url: string = `${LASTFM.apiEndpoint}?format=${LASTFM.format}&api_key=${LASTFM.api_key}`;
        // yuk
        // url += '&' + Object.keys(options).reduce(function(a, k) { a.push(k + '=' + encodeURIComponent(options[k])); return a }, []).join('&');
        url += '&' + Object.keys(options).reduce(function(a, k) { a.push(k + '=' + (options[k])); return a }, []).join('&');
        return url;
    }

    createSimilarArtists(similar): Array<Artist>{
        if (!similar || !similar.artist) {
            return [];
        }
        return similar.artist.map((artist: any) =>{
            return new Artist(artist.name,
                '',
                artist.image,
                artist.url                
            );
        });
    }

    /**
    * Observable.forkJoin : along the lines of $q.all... Remember to import it!
    */
    getAllArtist(artist: string = 'The Cure', options: any = {}, optionsAlbums: any = {}) {
        return Observable.forkJoin(
            this.getArtistInfo(artist, options),
            this.getTopAlbums(artist, optionsAlbums)
        );
    }
    getArtistInfo(artistName: string = 'The Cure', options: any = {}) {
        let params: any = Object.assign({}, options, { method: 'artist.getInfo', artist: artistName }),
            req: string = this.createUrl(params);
        return this.http.get(req)
            .map(res => res.json())
            .do(data => console.log(data))
            .map((data: any) => {
                if (data.error) {
                    return Observable.throw(data.message || 'Last.fm data error');
                }
                if (data.artist) {
                    let artist: any = data.artist,
                        similar: Array<Artist> = this.createSimilarArtists(artist.similar);

                    return new Artist(artist.name,
                        artist.mbid,
                        artist.image,
                        artist.url,
                        artist.bio,
                        artist.ontour,
                        similar,
                        artist.stats,
                        artist.streamable,
                        artist.tags
                    );
                }
                return Observable.throw('No artists found');
            })
            .catch(this.handleError);
    }
    getTopAlbums(artistName: string = 'The Cure', options: any = {}) {

        // let params = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
        let params: any = Object.assign({}, options, { method: 'artist.getTopAlbums', artist: artistName }),
            req: string = this.createUrl(params);
        return this.http.get(req)
            .map(res => res.json())
            .do(data => console.log(data))
            .map((data: any) => {
                let albums: Array<Album> = [];
                if (data.error) {
                    return Observable.throw(data.message || 'Last.fm data error');
                }
                if (data.topalbums) {
                    data.topalbums.album.forEach((album: any) => {
                        albums.push(
                            new Album(album.artist,
                                album.image,
                                album.mbid,
                                album.name,
                                album.playcount,
                                album.url
                            ));
                    });
                }
                return albums;
            })
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error('handleError ::: ', error);
        return Observable.throw(error.json().message || 'Server Error');
    }

    getAlbumInfo(mbid: String, options:any = {}) {
        let params:any = Object.assign({}, options, { method: 'album.getInfo', mbid: mbid }),
            req: string = this.createUrl(params);
        return this.http.get(req)
            .map(res => res.json())
            .do(data => console.log(data))
            .map((data:any) => {
                if (data.error) {
                    return Observable.throw(data.message || 'Last.fm data error');
                }
                let album = data.album;
                return new Album(album.artist,
                    album.image,
                    album.mbid,
                    album.name,
                    album.playcount,
                    album.url,
                    album.listeners,
                    album.tracks
                );
                return Observable.throw('Album not found');
            })
            .catch(this.handleError);
    }

    checkCanShow(results:any):boolean {
        if (!results || !results.artistmatches) {
            return false;
        }
        // Having at least one potential to show from the results is nice...
        function hasImage(element, index, array):boolean {
            return !!element['#text'];
        }
        return results.artistmatches.artist.some((element, index, array) => element.mbid && element.image.some(hasImage));
    }

    searchArtists(artist:string, options:any = {}){
        let params:any = Object.assign({}, options, { method: 'artist.search', artist: artist }),
            req: string = this.createUrl(params);
        return this.http.get(req)
            .map(res => res.json())
            .do(data => console.log(data))
            .map((data:any) => {
                let results: Array<Artist> = [];
                if (data.error) {
                    return Observable.throw(data.message || 'Last.fm data error');
                }
                if (data.results && this.checkCanShow(data.results)) {
                    let artists: Array<any> = data.results.artistmatches.artist; 

                    artists.forEach((artist) => {
                        results.push(
                                new Artist(artist.name,
                                    artist.mbid,
                                    artist.image,
                                    artist.url
                                )
                            );
                    });
                }
                return results;
            })
            .catch(this.handleError);
    }
}