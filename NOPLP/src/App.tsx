import './App.css'
import { Link } from 'react-router';

function App() {
  return (
    <div className="w-full">
      <h2 className="mb-10">NOPLP - par Matteo Perisse</h2>
      <h4>Ceci est un site d'entraînement pour le jeu N'oubliez pas les paroles</h4>
      <h5>
        Attention : ce site utilise des paroles issues de la base de données 
        <a href="https://lrclib.net/" target="_blank" rel="noopener noreferrer"> https://lrclib.net/</a>.
        <br/>
        Les paroles peuvent ne pas être exactes ou les mêmes que dans l'émission. Pensez à vérifier si vous avez un doute.
      </h5>
      <Link to="/game"><button>Jouer</button></Link>
    </div>
  )
}

export default App
