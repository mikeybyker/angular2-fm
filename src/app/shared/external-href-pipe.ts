import { Pipe } from '@angular/core';

@Pipe({
  name: 'externalhref'
})
// Quick hack to get last.fm bio links to open _blank - not too clever.
export class ExternalHrefPipe {
  transform(value: string) {
    let s: string = value && value.replace(/(<a href="[^"]+")>/ig, "$1 target='_blank'>");
    return s;
  }
}
