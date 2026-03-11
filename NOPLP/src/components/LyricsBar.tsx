import { useEffect, useState } from "react";
import type { Category, Song, TimedLyrics } from "../types/gameTypes";

interface LyricsBarProps {
  lyrics: TimedLyrics[];
  song: Song;
  nextStep: (songScore: boolean) => void;
}

const LyricsBar = ({ lyrics, song, nextStep }: LyricsBarProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [speed, setSpeed] = useState(1.1);
  const [missingLyricText, setMissingLyricText] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => Math.round(prevTime + (100 * speed)));
    }, 100);

    return () => clearInterval(timer);
  }, [speed]);

  useEffect(() => {
    console.log(currentLyricIndex)
    if (lyrics[currentLyricIndex + 1] && currentTime >= lyrics[currentLyricIndex + 1].time - 500 && missingLyricText == null) {
      setCurrentLyricIndex(prevIndex => prevIndex + 1);
      if (lyrics[currentLyricIndex + 1].missing != undefined) {
        let words = lyrics[currentLyricIndex + 1].lyric.split(/[\s',;:!?.-]+/);
        words = words.slice(0, words.length - lyrics[currentLyricIndex + 1].missing!);
        setMissingLyricText(words.join(" "));
      }
    }
  }, [currentTime]);

  function checkAnswer() {
    const missingWords = lyrics[currentLyricIndex].lyric.split(/[\s',;:!?.-]+/).slice(-lyrics[currentLyricIndex].missing!);
    const splittedAnswer = answer.split(/[\s',;:!?.-]+/);
    const goodAnswer = missingWords.every((word, index) => word.toLowerCase() === splittedAnswer[index]?.toLowerCase());
    alert(goodAnswer ? "Bonne réponse !" : "Mauvaise réponse !");
    nextStep(goodAnswer);
  }

  return (
    <>
      <input type="range" min="0.5" max="2" step="0.01" defaultValue="1.1" className="w-full" onChange={(e) => setSpeed(parseFloat(e.target.value))}/>
      <p>{song.title} - {song.artistName}</p>
      {
        currentLyricIndex != -1 && lyrics[currentLyricIndex].missing != undefined ?
        <>
          <div className="bg-blue-600 p-4 rounded-lg shadow-md border-2 border-white w-full">
            <p>{missingLyricText}</p>
          </div>
          <div className="bg-blue-600 p-4 rounded-lg shadow-md border-2 border-white w-full">
            <p>{"___ ".repeat(lyrics[currentLyricIndex].missing)}</p>
          </div>
          <input type="text" placeholder="Enter missing word..." className="p-2 rounded-lg bg-blue-800 text-white placeholder:text-blue-200 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setAnswer(e.target.value)}/>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={checkAnswer}>Bloquer les paroles</button>
        </> :
        <div className="bg-blue-600 p-4 rounded-lg shadow-md border-2 border-white w-full">
          <p>{currentLyricIndex == -1 || lyrics[currentLyricIndex].lyric.length == 0 ? "..." : lyrics[currentLyricIndex]?.lyric}</p>
        </div>
      }
      <p>{currentTime} ms</p>
    </>
  );
};

export default LyricsBar;
