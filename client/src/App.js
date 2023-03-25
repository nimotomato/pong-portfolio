import "./styles/App.css";

import Home from "./pages/Home";
import SingleplayerPage from "./pages/SingleplayerPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MultiplayerMenu from "./pages/MultiplayerMenu";
import CreateLobbyPage from "./pages/CreateLobbyPage";
import JoinLobbyPage from "./pages/JoinLobbyPage";
import MultiplayerGame from "./pages/MultiplayerGame";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/single-player-game" element={<SingleplayerPage />} />
          <Route path="/multi-player-menu" element={<MultiplayerMenu />} />
          <Route path="/create-lobby" element={<CreateLobbyPage />} />
          <Route path="/join-lobby" element={<JoinLobbyPage />} />
          <Route path="/multi-player-game" element={<MultiplayerGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
