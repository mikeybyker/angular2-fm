export class Album {

    artist: any;
    image: Array<any>;
    images: any;
    mbid: string;
    name: string;
    playcount: Number;
    url: string;
    listeners: string;
    tracks: any;

    // Convert last.fm array for easier use
    getImages(image:Array<any>): any {
        // image is the array of images from last fm
        // small, medium, large, extralarge, mega
        let o: any = {};
        image
            .filter(o => o['#text'])
            .forEach((element, index, array) => o[element.size] = element['#text']);
        return o;
    }

    constructor(artist: any,
                image: Array<any>,
                mbid: string,
                name: string,
                playcount: Number = 0,
                url: string = '',
                listeners:string = '',
                tracks: any = {}
    )
    {
        this.artist = artist;
        this.image = image;
        this.images = this.getImages(image);
        this.mbid = mbid;
        this.name = name;
        this.playcount = playcount;
        this.url = url;
        this.listeners = listeners;
        this.tracks = tracks;
    }
}