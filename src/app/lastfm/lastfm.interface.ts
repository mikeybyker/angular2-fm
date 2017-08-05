/**
 * This is a little overkill, given most not used
 * let alone needed.
 * But as I was mirroring the LastFM data structure,
 * it was just as easy to put each in as an interface.
 */

export interface LastFMOptions {
  autocorrect?: number;
  lang?: string;
  limit?: number;
  location?: string;
  mbid?: string;
  page?: number;
  album?: string;
  artist?: string;
  method?: string;
  track?: string;
};

export interface LastFMConfig {
  apiKey: string;
  endPoint?: string;
  format?: string;
};

export interface AlbumFM {
  artist: string;
  image: ImageFM[];
  listeners?: string;
  mbid: string;
  name: string;
  playcount: string;
  tags?: TagsFM;
  tracks?: Tracks;
  url: string;
  wiki?: Wiki;
};

interface Artists {
  artist: ArtistFM[]
}

export interface ArtistFM {
  bio?: ArtistBio;
  image?: ImageFM[];
  mbid: string;
  name: string;
  ontour?: string;
  similar?: Artists;
  stats?: Stats;
  streamable?: string;
  tags?: TagsFM;
  url: string;
}

interface ImageFM {
  '#text': string;
  size: string;
}
interface Streamable {
  '#text': string;
  fulltrack: string;
}
interface TagsFM {
  tag: Tag[];
}
interface Tag {
  name: string;
  url: string;
}

interface Tracks {
  track: Track[];
}
export interface Track {
  ["@attr"]: TrackAttr;
  artist?: ArtistFM;
  duration?: string;
  name?: string;
  streamable?: Streamable;
  url?: string
};

interface TrackAttr {
  rank: string;
}
interface Wiki {
  content: string;
  published: string;
  summary: string;
}

interface ArtistBio {
  content: string;
  links: ArtistLinks;
  published: string;
  summary: string;
}
interface ArtistLinks {
  link: ArtistLink;
}
interface ArtistLink {
  '#text': string;
  href: string;
  rel: string;
}

interface Stats {
  listeners: string;
  playcount: string;
}

interface ResponseFM {
  results?: any;
  artist?: any;
  topalbums?: any;
  album?: any;
}
