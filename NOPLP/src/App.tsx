import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiService from './services/apiService.ts'
import type { LrclibSong } from './types/LrclibSong.ts'

function App() {
  const [count, setCount] = useState(0);
  const [song, setSong] = useState<LrclibSong>();

  const apiService = ApiService;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getLyrics('Louane', 'Avenir');
        setSong(data);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {
          song ? song!.syncedLyrics : "Attends stp"
        }
      </div>
    </>
  )
}

export default App
