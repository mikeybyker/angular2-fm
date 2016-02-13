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
            .do(data => console.log('getArtistInfo ::: ', data))
            .map(data => {
                if (!data.artist) {
                    return data;
                }
                return new Artist(data.artist);
            })
            .catch(this.handleError);
    }

    getTopAlbums(artistName: string = 'The Cure', options: any = {}) {
        // let params = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
        let params: any = Object.assign({}, options, { method: 'artist.getTopAlbums', artist: artistName }),
            req: string = this.createUrl(params);
        return this.http.get(req)
            .map(res => res.json())
            .do(data => console.log('getTopAlbums ::: ', data))
            .map(data => {
                if (!data.topalbums || !data.topalbums.album) {
                    return data;
                }
                let albums: Array<Album> = [];
                data.topalbums.album.forEach(album => {
                    albums.push(new Album(album));
                });
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
                .map(data => {
                    if (!data.album) {
                        return data;
                    }
                    return new Album(data.album);
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
            .map(data => {                
                if (!data.results) {
                    return data;
                }
                let results: Array<Artist> = [];
                if (this.checkCanShow(data.results)) {
                    let artists: Array<any> = data.results.artistmatches.artist;
                    artists.forEach((artist) => {
                        results.push(new Artist(artist));
                    });
                }
                return results;
            })
            .catch(this.handleError);
    }
}