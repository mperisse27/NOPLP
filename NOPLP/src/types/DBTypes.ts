export type Song = {
  id: string;
  title: string;
  year: number;
  artist: Artist;
  themes?: Theme[];
};

export type Artist = {
  id: string;
  name: string;
  songs?: Song[];
}

export type Theme = {
  id: string;
  name: string;
  songs?: Song[];
}