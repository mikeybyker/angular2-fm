import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'limit'
})

export class LimitPipe implements PipeTransform {
    transform(value:Array<any>, count:number) {
        return value && value.slice(0, count);
    }
}