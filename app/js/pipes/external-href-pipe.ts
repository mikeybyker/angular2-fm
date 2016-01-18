import {Pipe} from 'angular2/core';

@Pipe({
    name: 'externalhref'
})
// Quick hack to get last.fm bio links to open _blank - not too clever.
export class ExternalHrefPipe{
    transform(value){
        let s:string = value.replace(/(<a href="[^"]+")>/ig, "$1 target='_blank'>");
        return s;
    }
}