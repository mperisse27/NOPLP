import { useEffect, useState } from "react";
import type { Category, Game } from "../types/gameTypes";
import ApiService from "../services/apiService";
import CategoryCard from "../components/CategoryCard";
import type { Song } from "../types/gameTypes";
import parseLrc from "../services/lyricsParser";
import LyricsBar from "../components/LyricsBar";
import { getMissingLyrics, getSameSongLyrics } from "../services/lyricsToFind";

const GamePage = () => {
  const [game, setGame] = useState<Game>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [lyricsSong, setLyricsSong] = useState<Song | null>(null);
  const [timedLyrics, setTimedLyrics] = useState<{ time: number; lyric: string }[]>([]);
  const [doneCategories, setDoneCategories] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const apiService = ApiService;
      const data = await apiService.getNewGame();
      setGame(data);
    };
    fetchData();
  }, []);

  async function getLyrics(song: Song, sameSong: boolean = false) {
    const lrclibSong = await ApiService.getLyrics(song.artistName, song.title);
    setLyricsSong(song);
    setTimedLyrics(
      sameSong ?
      getMissingLyrics(parseLrc(lrclibSong.syncedLyrics), selectedCategory!.points) :
      getSameSongLyrics(parseLrc(lrclibSong.syncedLyrics))
    );
  }

  function nextStep(win: boolean) {
    if (win) setScore(prev => prev + selectedCategory!.points);
    setDoneCategories(prev => [...prev, selectedCategory!.points]);
    setLyricsSong(null);
    setSelectedCategory(null);
  }

  function setSameSong() {
    if (game && doneCategories.length >= 0) {
      setSelectedCategory({ points: 0, name: "Même chanson", songs: [game.memeChanson] })
    }
  }

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full h-full bg-blue-400">
    {
      selectedCategory == null ?
      (
        <div id="selection" className="flex flex-col items-center justify-center space-y-4 w-[50%] h-full">
          <div
            className={`bg-blue-700 p-4 rounded-lg shadow-md border-2 border-white w-full
              ${doneCategories.length >= 2 ? 'cursor-pointer' : ''}
            `}
            onClick={setSameSong}
          >
            <p>Même chanson</p>
          </div>
          {game.categories.sort((a, b) => b.points - a.points).map((category, idx) => (
            <CategoryCard key={idx} category={category} selected={doneCategories.includes(category.points)} onClick={() => setSelectedCategory(category)}/>
          ))}
          <p>Score : {score}</p>
        </div>
      ) : 
      lyricsSong == null ? (
        <div id="selection" className="flex flex-col space-y-4 w-[80%]">
          {
            selectedCategory.songs.map(song =>
              <div className="bg-blue-700 p-4 rounded-lg shadow-md border-2 border-white w-full cursor-pointer" onClick={() => getLyrics(song)}>
                <p>{song.title}</p>
                <p>{song.artistName} - {song.year}</p>
              </div>
            )
          }
        </div>
      ) : (
        <div id="selection" className="flex flex-col space-y-4 w-[80%]">
          <LyricsBar lyrics={timedLyrics} song={lyricsSong} nextStep={nextStep}/>
        </div>
      )
    }
    </div>

  );
};

export default GamePage;