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

    // constructor(artist: any,
    //             image: Array<any>,
    //             mbid: string,
    //             name: string,
    //             playcount: Number = 0,
    //             url: string = '',
    //             listeners:string = '',
    //             tracks: any = {}
    // )
    constructor(album: any)
    {
        this.artist = album.artist;
        this.image = album.image;
        this.images = this.image ? this.getImages(this.image) : {};
        this.mbid = album.mbid;
        this.name = album.name;
        this.playcount = album.playcount || 0;
        this.url = album.url || '';
        this.listeners = album.listeners || '';
        this.tracks = album.tracks || {};
    }
}