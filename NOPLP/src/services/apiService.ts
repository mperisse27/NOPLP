import axios from "axios";
import type { Game } from "../types/gameTypes";
import type { LrclibSong } from "../types/LrclibSong";

class ApiService {
  private constructor() { }

  static #instance: ApiService;

  lrclibURL = 'https://lrclib.net/api/get';
  myURL = 'https://localhost:7089';

  public static get instance(): ApiService {
    if (!ApiService.#instance) {
      ApiService.#instance = new ApiService();
    }

    return ApiService.#instance;
  }

  async getLyrics(artist: string, title: string): Promise<LrclibSong> {
    const response = await axios.get(`${this.lrclibURL}?artist_name=${artist}&track_name=${title}`);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  }

  async getNewGame(): Promise<Game> {
    const response = await axios.get(`${this.myURL}/game/newgame`);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  }
}

export default ApiService.instance;
