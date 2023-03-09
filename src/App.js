import './styles/App.css';

import Home from './pages/Home';
import Multiplayerpage from './pages/Multiplayerpage';
import Singleplayerpage from './pages/Singleplayerpage';
import StartLobby from './pages/StartLobby';
import FindLobby from './pages/FindLobby';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


//TO DO: Implement multi-player-game

function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route index element = {<Home />} />
        <Route path="/single-player-game" element = { <Singleplayerpage />} />
        <Route path="/multi-player" element = { <Multiplayerpage />} />
        <Route path="/start-lobby" element = { <StartLobby />} />
        <Route path="/find-lobby" element = { <FindLobby />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}


export default App;