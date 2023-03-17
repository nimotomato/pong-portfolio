import "./styles/App.css";

import Home from "./pages/Home";
import SingleplayerPage from "./pages/SingleplayerPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MultiplayerMenu from "./pages/MultiplayerMenu";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/single-player-game" element={<SingleplayerPage />} />
          <Route path="/multi-player-menu" element={<MultiplayerMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
