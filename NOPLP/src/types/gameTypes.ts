import type { Song } from "./DBTypes";

export type Category = {
  name: string;
  songs: Song[];
  points: number;
}