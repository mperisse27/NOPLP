export interface Song {
    title: string;
    year: number;
    artistName: string;
}

export interface Category {
    points: number;
    name: string;
    songs: Song[];
}

export interface Game {
    memeChanson: Song;
    categories: Category[];
}

export interface TimedLyrics {
    time: number;
    lyric: string;
    missing?: number;
}