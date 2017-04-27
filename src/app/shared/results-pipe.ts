import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'results'
})
// Filtering out those without an mbid will sadly filter out some weirder correct results too...
// But saves showing mis-named artists - there's a lot!
export class ResultsPipe implements PipeTransform {
  transform(value: Array<any>, size: string) {
    return value && value.filter && value.filter((item) => item.mbid && item.image && item.image.hasOwnProperty(size));
  }
}
