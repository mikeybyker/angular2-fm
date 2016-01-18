import {Pipe} from 'angular2/core';

@Pipe({
    name: 'trackduration'
})

export class TrackDurationPipe{

    getDuration(duration) {
        let mins = ~~(duration / 60),
            secs = duration % 60,
            pretty = '' + mins + ':' + (secs < 10 ? '0' : '');
        pretty += '' + secs;
        return pretty;
    }
    transform(value){
        return this.getDuration(value);
    }
}