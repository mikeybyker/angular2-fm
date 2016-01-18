import {Pipe} from 'angular2/core';

@Pipe({
    name: 'limit'
})

export class LimitPipe{
    transform(value, [count]){
        return value.slice(0, count);
    }
}