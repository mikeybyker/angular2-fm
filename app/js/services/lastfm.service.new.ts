// https://www.npmjs.com/package/angular2-spotify

import {Http,
        Response,
        Headers,
        URLSearchParams}  from '@angular/http';
import {Injectable, Inject}       from '@angular/core';
import {Observable}       from 'rxjs/Observable';

import {Artist}           from '../artist/artist';
import {Album}            from '../album/album';
// import {LASTFM}           from '../constants';

export interface LastFMConfig {
  api_key: string,
  endPoint?: string,
  format?: string
}
// endPoint : 'http://ws.audioscrobbler.com/2.0/'
// format: 'json'

@Injectable()
export class LastFM {

    constructor(@Inject('LastFMConfig') private config: LastFMConfig, public http: Http) {
        config.endPoint || (config.endPoint =  'http://ws.audioscrobbler.com/2.0/');
        config.format || (config.format =  'json');
    }

    private createParams(settings: any = {}, options: any = {}): URLSearchParams {
        // let params = {...options, method: 'artist.getTopAlbums', artist: artistName }; // not part of es6... :-|
        let params: any = Object.assign({ format: this.config.format, api_key: this.config.api_key }, options, settings),
            search: URLSearchParams = new URLSearchParams();

        // console.log('params ::: ', params);
        // Really?!
        for (let key in params) {
            search.set(key, params[key]);
        }
        return search;
    }
    private handleError(error: Response) {
        console.error('handleError ::: ', error);
        return Observable.throw(error.json().message || 'Server Error');
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

    private _http(settings:any = {}, options:any = {}){
        const params: any = this.createParams(options, settings);
        return this.http.get(this.config.endPoint, { search: params })
    }

    /**
    *    @data : received from lastfm
    *    @path : the path to the required data eg. 'results.artistmatches.artist'
    *    @empty: what to return if there were no results
    */
    private validateData(data:any = {}, path:string = '', empty:any = [])
    {
        if(data && data.error){
            // console.warn('lastfm error');
            return data;
        }
        const value = path.split('.').reduce((a, b) => a[b] || {}, data);
        // console.log('validateData ::: ', value);
        return Object.keys(value).length === 0 ? empty : value;
    }

/*    
How? the this in this._http would point to artist, so would not work...
how to namespace methods??
artist:any = {
        xxx : this.searchArtists
    }
*/

// Artist = {search : this.searchArtists.bind(this)}; // this in this._http correct
// Artist = {search : this.searchArtists}; // this in this._http would point to artist

    Artist = {
        search : this.searchArtists.bind(this),
        getInfo : this.getArtistInfo.bind(this),
        getTopAlbums : this.getTopAlbums.bind(this)

    }; 

    searchArtists(artist: string, options: any = {}):Observable<any> {
        return this._http({ method: 'artist.search', artist: artist }, options)
            .map(res => res.json())
            // .do(data => console.log(data))
            .map(data => this.validateData(data, 'results.artistmatches.artist'))
            .catch(this.handleError);
    }

    getArtistInfo(artistName: string, options: any = {}) {
        return this._http({ method: 'artist.getInfo', artist: artistName}, options)
            .map(res => res.json())
            // .do(data => console.log('getArtistInfo ::: ', data))
            .map(data => this.validateData(data, 'artist', {}))
            .catch(this.handleError);
    }

    getTopAlbums(artistName: string, options: any = {}) {
        return this._http({ method: 'artist.getTopAlbums', artist: artistName}, options)
            .map(res => res.json())
            // .do(data => console.log('getTopAlbums ::: ', data))
            .map(data => this.validateData(data, 'topalbums.album'))
            .catch(this.handleError);
    }

    getAlbumInfo(mbid: string, options:any = {}) {
        return this._http({ method: 'album.getInfo',  mbid: mbid}, options)
                .map(res => res.json())
                // .do(data => console.log(data))         
                .map(data => {
                    return this.validateData(data, 'album', {});
                })
                .catch(this.handleError);
    }


}