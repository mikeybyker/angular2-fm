import {Http,
        Response,
        Headers,
        URLSearchParams}  from '@angular/http';
import {Injectable}       from '@angular/core';
import {Observable}       from 'rxjs/Observable';

import {Artist}           from '../artist/artist';
import {Album}            from '../album/album';
import {LASTFM}           from '../constants';

@Injectable()
export class LastFmService {

    constructor(public http: Http) {
        
    }
    /**
    * (Hopefully) URLSearchParams will change in next beta etc. to allow passing in object
    * Currently setAll will not accept this, and all it does is the same thing - loop over.
    * !! Watch out for Object.assign
    */
    private createParams(options: any = {}, requestParams: any = {}): URLSearchParams {
        // let combined = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
        let combined: any = Object.assign({ format: LASTFM.format, api_key: LASTFM.api_key }, options, requestParams),
            params: URLSearchParams = new URLSearchParams();
        for (let key in combined) {
            params.set(key, combined[key]);
        }
        return params;
    }
    private handleError(error: Response) {
        console.error('handleError ::: ', error);
        return Observable.throw(error.json().message || 'Server Error');
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
        let params: any = this.createParams(options, { method: 'artist.getInfo', artist: artistName });
        return this.http.get(LASTFM.apiEndpoint, { search: params })
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
        let params: any = this.createParams(options, { method: 'artist.getTopAlbums', artist: artistName });
        return this.http.get(LASTFM.apiEndpoint, { search: params })
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

    getAlbumInfo(mbid: String, options:any = {}) {
        let params: any = this.createParams(options, { method: 'album.getInfo', mbid: mbid });
        return this.http.get(LASTFM.apiEndpoint, { search: params })
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
    /*
        Check there's a mbid and at least an extralarge image source
    */
    checkUsableImage(result:any){

        if (result.mbid && result.image && result.image[3] && result.image[3]['#text'] !== '') {
            return true;
        }
        return false;
    }

    searchArtists(artist:string, options:any = {}){
        let params: any = this.createParams(options, { method: 'artist.search', artist: artist });
        return this.http.get(LASTFM.apiEndpoint, { search: params })
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

    searchArtistsAsync(artist: string, options: any = {}): Observable<Array<Artist>> {
        let params: any = this.createParams(options, { method: 'artist.search', artist: artist });
        return this.http.get(LASTFM.apiEndpoint, { search: params })
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
                        // Rather than using results-pipe, don't push unusable results in the first place...
                        if (this.checkUsableImage(artist)) {
                            results.push(new Artist(artist));
                        }                      
                    });
                }
                return results; // hmm, could push an empty non-found if length here === 0...
            })
            .catch(this.handleError);
    }
}