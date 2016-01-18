import {Pipe} from 'angular2/core';

@Pipe({
    name: 'results'
})
// Filtering out those without an mbid will sadly filter out some weirder correct results too...
// But saves showing mis-named artists - there's a lot!
export class ResultsPipe{
    transform(value, [size]){
        return value.filter((item) => item.mbid && item.images.hasOwnProperty(size));
    }
}