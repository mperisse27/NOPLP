import type { Category } from "../types/gameTypes";

class ApiService {
  private constructor() { }

  static #instance: ApiService;

  lrclibURL = 'https://lrclib.net/api/get';
  myURL = 'http://localhost:8000';

  public static get instance(): ApiService {
    if (!ApiService.#instance) {
      ApiService.#instance = new ApiService();
    }

    return ApiService.#instance;
  }

  async getLyrics(artist: string, title: string) {
    const response = await fetch(`${this.lrclibURL}?artist_name=${artist}&track_name=${title}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.myURL}/randomCategories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

export default ApiService.instance;
