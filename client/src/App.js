import './styles/App.css';


import Home from './pages/Home';
import SingleplayerPage from './pages/SingleplayerPage';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
//TO DO: Implement multi-player-game


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/single-player-game" element = { <SingleplayerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;