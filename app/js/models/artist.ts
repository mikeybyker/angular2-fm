export class Artist {

    bio: any;
    image: Array<any>;
    images: any;
    mbid: string;
    name: string;
    ontour: string;
    similar: any;
    stats: any;
    streamable: string;
    tags: any;
    url: string;

    // Convert last.fm array for easier use
    getImages(image): any {
        // image is the array of images from last fm
        // small, medium, large, extralarge, mega
        // let [small, medium, large, extralarge, mega] = image;
        // return {
        //     small,
        //     medium,
        //     large,
        //     extralarge,
        //     mega,
        // }
        let o: any = {};
        image
            .filter(o => o['#text'])
            .forEach((element, index, array) => o[element.size] = element['#text']);
        return o;
    }

    constructor(name: string = '',
                mbid: string = '',                
                image: Array<any> = [],
                url: string = '',
                bio: any = {},
                ontour: string = '0',
                similar: any = {},
                stats: any = {},
                streamable: string = '0',
                tags: any = {}                
    )
    {
        this.name = name; 
        this.mbid = mbid;
        this.image = image;
        this.url = url;
        this.images = this.getImages(image);        
        this.bio = bio;
        this.ontour = ontour;
        this.similar = similar;
        this.stats = stats;
        this.streamable = streamable;
        this.tags = tags;        
    }
}